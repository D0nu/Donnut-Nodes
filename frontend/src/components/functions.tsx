import { List, PNodes, User } from "../types"
import React, { SetStateAction, useEffect, useState } from "react"
import { format, isYesterday, differenceInMinutes, differenceInHours, } from 'date-fns'

export const online = (node: PNodes , updated: number ) => {
  const lastseen = node.last_seen_timestamp * 1000 || node.last_seen;
  return updated - lastseen <= 90000;
}

export const used = (node: PNodes) => {
  if (!node.storage_committed || node.storage_committed === 0) return 0;
  return (node.storage_used / node.storage_committed) * 100;
};

export const efficiency = (node: PNodes) => {
  if (!node.storage_committed || !node.storage_used || !node.uptime) return 0;

  const usage = node.storage_used / node.storage_committed;
  const rate = node.storage_used / node.uptime;

  const rateScore = Math.min( rate / 1000000, 1);

  return ( usage * 0.6 + rateScore * 0.4) * 100;
};

export async function AddToWatchList (
  node: PNodes,
  token: string,
  user: User | null,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setUser: React.Dispatch<SetStateAction<User | null>>,
  setUReason: React.Dispatch<SetStateAction<string[] | never[]>>,
) {
  if (!user) return

  if (!node.name) return setUReason((prev: string[] | never[] )=>[...prev , 'Please select an identified pnode'])

  const exists = user.watchlist.find(( set: List ) => set.pnodeId === node.name )

  if ( exists ) setUReason((prev: string[] | never[] )=>[...prev , ' User already has pnode in watchlist. '])

  try {
    setLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/watchlist`,{
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ itemId: node.name })
    })
    const data = await res.json()
    if (!res.ok){
      setUReason((prev: string[] | never[]) => [...prev , data.error ||  'Failed to add node to watchlist'])
    } else {
      setUReason((prev: string[] | never[]) => [...prev , `${node.name} added to watchlist`])
      setUser((prev: User | null ) => { return { ...prev! , watchlist: [ ...prev!.watchlist , { pnodeId: node.name}]}})
      saveCachedUser({ ...user , watchlist: [ ...user.watchlist, {pnodeId: node.name}] })
    } setLoading(false)

  } catch (error) {
    if (error instanceof Error){
      setLoading(false)
      setUReason((prev: string[]) => [ ...prev ,  "Failed to add to watchlist" ])
    }
  }
}

export async function RemoveFromWatchList (
  token: string,
  user: User | null,
  node: PNodes | "all",
  setError: React.Dispatch<SetStateAction<string>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setUser: React.Dispatch<SetStateAction<User | null>>,
  setUReason: React.Dispatch<SetStateAction<string[] | never[]>>,
) {

  if ( node !== 'all' && !node.name ) return setError('Please select an identified pnode')

  if ( !user?.watchlist ) return setError('User has no watchlist pnode')

  const exists = node === 'all' || user?.watchlist.find(( set: List ) => set.pnodeId === node.name )

  if( !exists) return setError(' User does not have pnode in watchlist. ')

  try {
    setLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/watchlist`,{
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ itemId: node === 'all' ? 'all' : node.name })
    })

    const data = await res.json()
    if (!res.ok){
      setError(data.error)
      setUReason((prev: string[] | never[]) => [...prev , 'Failed to remove node from watchlist'])
    } else {
      setUReason((prev: string[] | never[]) => [...prev , node !== 'all' ? `${node.name} removed from watchlist` : 'Watchlist cleared'])
      const watchlist = node === 'all' ? [] : user?.watchlist.filter(( set: List ) => set.pnodeId !== node.name ) || []
      setUser((prev: User | null ) => { return { ...prev!, watchlist }})
      saveCachedUser({ ...user!, watchlist })
    } setLoading(false)
  } catch (error) {
    if (error instanceof Error){
      setLoading(false)
      setError( error.message )
    }
  }
}

export const Ellipses = () => {
  const [ ellipse , setEllipse ] = useState('.')
  useEffect(() => {
    const interval = setInterval(() => setEllipse( prev => prev.length < 3 ? prev + '.' : '.' ), 500);
    return () => clearInterval(interval);
  });
  return <>{ellipse}</>
}

export function getNodeAge(nodes: PNodes, time: string, now = Date.now()) {
  const age = now - ( nodes.first_seen || ((nodes.last_seen_timestamp * 1000 || nodes.last_seen ) - nodes.uptime * 1000));
  const HOUR  = 60 * 60 * 1000;
  const DAY   = 24 * HOUR;
  const WEEK  = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR  = 365 * DAY;

  switch (time) {
    case 'Hours old':
      return age >= HOUR && age < DAY;

    case 'Days old':
      return age >= DAY && age < WEEK;

    case 'Weeks old':
      return age >= WEEK && age < MONTH;

    case 'Months old':
      return age >= MONTH && age < YEAR;

    case 'Years old':
      return age >= YEAR;

    default:
      return false;
  }
}

export function formatSmartDate( dateInput?: string | number | Date ) {
  if (!dateInput) return ''

  const now = new Date()
  const date = new Date(dateInput)

  const hours = differenceInHours(now, date)
  const minutes = differenceInMinutes(now, date)

  if ( minutes < 1 ) return 'Just now'

  if ( minutes < 60 ) return `${minutes} minute${minutes !== 1 ? 's' : '' } ago`

  if ( hours < 24 ) return `${hours} hour${hours !== 1 ? 's' : ''} ago today, ${format(date, 'h:mm b')}`

  if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm b')}`

  // Older than yesterday
  return format(date, 'dd MMM, yyyy')
}

export function loadCachedUser(): User | null {
  try {
    const raw = localStorage.getItem("auth:user");
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function saveCachedUser( user: User | null ) {
  localStorage.setItem("auth:user", JSON.stringify(user));
}

export function clearCachedUser() {
  localStorage.removeItem("auth:user");
}

export function CheckIncludes(e: MouseEvent | PointerEvent , focus: string) {
  const target = e.target as Node
  return target === pick(focus) || pick(focus)?.contains(target) ? true : false
}

export const Trim = (focus: string) => {return focus?.trim().toLocaleLowerCase() || ''}

export const pick = (focus: string) => document.querySelector(focus) || null

export const pickAll = (focus: string) => {return document.querySelectorAll(focus) || []}

export const classAdd = ( focus: string , targetClass: string ) => {
  pick(focus)?.classList.add(targetClass)
}

export const classRemove = ( focus: string , targetClass: string ) => {
  pick(focus)?.classList.remove(targetClass)
}

export const classToggle = ( focus: string , targetClass: string ) => {
  pick(focus)?.classList.toggle(targetClass)
}

export const RemoveOtherClass = ( focus: string , protect: string , focusClass: string )  => {
  pickAll(focus).forEach((div)=> pick(protect) !== div && div.classList.remove(focusClass))
}
