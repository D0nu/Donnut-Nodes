import './../settings.css'
import { User } from '../types';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { InputsPack } from './../components/pageParts';
import { useNotifiers } from "../context/NotifierContext";
import { formatSmartDate, RemoveFromWatchList, saveCachedUser } from '../components/functions';
import { DeleteSvg, Eyesvg, GlobeSvg, GoogleG, HistorySvg, loaderCircleSvg, Padlocksvg, SettingSvg, UnlockSvg, Xsvg } from "../components/svgPack";

export const Settings = () => {
  
  const goTo = useNavigate()
  const { setUReason } = useNotifiers()
  const [ err , setErr ] = useState('')
  const [ name , setName ] = useState('')
  const [ pass , setPass ] = useState('')
  const [ check , setCheck ] = useState('')
  const [ error , setError ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ password , setPassword ] = useState('')
  const [ type , setType ] = useState('password')
  const [ loading , setLoading ] = useState(false)
  const [ types , setTypes ] = useState('password')
  const [ typez , setTypez ] = useState('password')
  const [ isLoading , setIsLoading ] = useState(false)
  const { user , setUser , token , setError: setErrs , error: errs , loading: loads , setLoading: setLoads , logout } = useAuth()
  const [ date , setDate ] = useState(formatSmartDate( user?.updatedAt ))
  const icon = user?.provider === 'google' ? GoogleG() :
               user?.provider === 'twitter' ? Xsvg('ISBIG') : GlobeSvg()

  const clear = () => {
    setError('')
    if (!user) {
      goTo('/signin')
      setError('Log in to change password')
      return false
    }
    if ( !pass) {
      setError('Current password is required to make changes')
      return false
    }
    if ( pass.length < 6 ) {
      setError('Incorrect password')
      return false
    } return true
  }

  const handlePassword = async () => {
    if (!clear()) return
    if ( !password || password.length < 6 ) return setError('Password must be at least 6 characters long')
    try {
      const res = await fetch (`${process.env.REACT_APP_API}/auth/settings`, {
        method: 'POST',
        body: JSON.stringify({ pass , password }),
        headers: {
          'Content-type': 'application/json',
          'authorization':  `Bearer ${ token }`
        },
      })
      const error = await res.json()
      if ( res.ok ) return setUReason((prev: string[] )=> [ ...prev ,  'Password changed.'] )
      else {
        setError( error.error )
        setUReason((prev: string[] )=> [ ...prev , error.error || 'Failed to change password. Try again later'] )
      }
    } catch {
      setError( 'Failed to change password. Try again later' )
      setUReason((prev: string[] )=> [ ...prev ,  'Failed to change password. Try again later'] )
    }
    setPass('')
    setPassword('')
    setLoading(false)
  }

  const handleName = async () => {
    if (!clear()) return
    if ( user?.provider !== 'custom' ) return setError('Your account is linked with ' + user?.provider + '. Name change is not available.')
    if ( !name || name.length < 3 ) return setError('Name must be at least 3 characters long')
    try {
      const res = await fetch (`${process.env.REACT_APP_API}/auth/settings`, {
        method: 'POST',
        body: JSON.stringify({ pass , name }),
        headers: {
          'Content-type': 'application/json',
          'authorization':  `Bearer ${ token }`
        },
      })
      const error = await res.json()
      if ( res.ok ) {
        saveCachedUser( { ...user , name } )
        setUser(( prev: User |  null ) => { return { ...prev! , name }})
        setUReason((prev: string[] )=> [ ...prev ,  'Username changed.'] )
      } else {
        setError( error.error )
        setUReason((prev: string[] )=> [ ...prev , error.error || 'Failed to change username. Try again later'] )
      }
    } catch {
      setError( 'Failed to change name. Try again later' )
      setUReason((prev: string[] )=> [ ...prev ,  'Failed to change username. Try again later'] )
    }
    setPass('')
    setName('')
    setLoading(false)
  }

  const handleEmail = async () => {
    if (!clear()) return
    if ( user?.provider === 'google' ) return setError('Your account is linked with ' + user?.provider + '. Email change is not available.')
    if ( !validator.isEmail(email)) return setError('Enter a valid email address')
    try {
      const res = await fetch (`${process.env.REACT_APP_API}/auth/settings`, {
        method: 'POST',
        body: JSON.stringify({ pass , email }),
        headers: {
          'Content-type': 'application/json',
          'authorization':  `Bearer ${ token }`
        },
      })
      const error = await res.json()
      if ( res.ok ) {
        saveCachedUser( { ...user! , email } )
        setUser(( prev: User | null ) => { return { ...prev! , email }})
        setUReason((prev: string[] )=> [ ...prev ,  'Email changed.'] )
      }
      else {
        setError( error.error )
        setUReason((prev: string[] )=> [ ...prev , error.error || 'Failed to change email. Try again later'] )
      }
    } catch (error) {
        setError( 'Failed to change email. Try again later' )
        setUReason((prev: string[] )=> [ ...prev ,  'Failed to change email. Try again later'] )
    }
    setPass('')
    setEmail('')
    setLoading(false)
  }

  const handleClear = async () => {
    if (!user) return setErr('Log in to clear watchlist')
    if ( user.watchlist.length < 1 ) return setErr('You have no watchlist')
    RemoveFromWatchList( token , user , 'all' , setErr , setIsLoading , setUser , setUReason)
  }

  const handleDelete = async () => {
    if (!user) return goTo('/signin')
    try {
      setErrs('')
      setLoads(true)
      const res = await fetch (`${process.env.REACT_APP_API}/auth/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ pass: check }),
        headers: {
          'Content-type': 'application/json',
          'authorization':  `Bearer ${ token }`
        },
      })

      const error = await res.json()
      if ( res.ok ) {
        logout()
        setUReason((prev: string[] )=> [ ...prev ,  'User deleted.'] )
      }
      else {
        setErrs( error.error )
        setUReason((prev: string[] )=> [ ...prev , error.error || 'Failed to delete account.'] )
      }
    } catch (error) {
      setErrs('Unable to delete account at the moment')
      setUReason((prev: string[] )=> [ ...prev ,  'Failed to delete account.'] )
    }
    setLoads(false)
  }

  useEffect(()=>{
    const interval = setInterval(()=> setDate(formatSmartDate( user?.updatedAt )) , 1000)
    return () => clearInterval( interval )
  }, [ user ])
    
  return (
    <main>
      <section className="settings">
        <h2> {SettingSvg()} Settings</h2>
        <section>
          <h3>User Information</h3>
          <p>{user?.name || 'Guest'}</p>
          <p>{ user ? user.email || 'Not set' : 'Sign up to add email'}</p>
          <p> { icon } {user ? user.provider[0].toUpperCase() + user.provider.slice(1) : 'Custom'} account</p>
          { user && <p> { HistorySvg()} <span>Last updated at <span>{ date }</span>.</span></p>}
        </section>

        <section>
          <h3>Account Settings {SettingSvg()}</h3>
          <div className="set">
            <InputsPack
            type={type}
            classes="right"
            value={password}
            placeholder="New Password"
            svg={ type === "password" ? UnlockSvg() : Padlocksvg()}
            onClick={()=>{ setType((prev) => prev === "password" ? "text" : "password") }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
            <button disabled={loading} onClick={handlePassword}>Change Password</button>
          </div>
          <div className="set">
            <InputsPack
            name="name"
            value={name}
            show={false}
            placeholder="Donnutman"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
            <button disabled={loading} onClick={handleName}>Change name</button>
          </div>
          <div className="set">
            <InputsPack
            type="email"
            show={false}
            value={email}
            placeholder="new@example.com"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
            <button disabled={loading} onClick={handleEmail}>Change email</button>
          </div>
          <p className="error" style={{ justifyContent: "end" }}> { error } </p>
          <div className="set password">
            <p>Confirm with password</p>
            <InputsPack
            type={types}
            value={pass}
            classes="right"
            placeholder="Enter current password"
            svg={ types === "password" ? UnlockSvg() : Padlocksvg()}
            onClick={()=>{ setTypes((prev) => prev === "password" ? "text" : "password") }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
          />
          </div>
        </section>

        <section>
          <h3>Watchlist {Eyesvg()} <p>{user?.watchlist.length || 0} </p></h3>
          <p className='error'> { err } </p>
          <button disabled={isLoading} onClick={handleClear}> { isLoading && loaderCircleSvg() } { !isLoading ? 'Clear Watchlist' : 'Clearing Watchlist...' }</button>
        </section>

        { user && <div className="clear">
          <h3>Delete Account {DeleteSvg()}</h3>
          <p>Deleting your account is irreversible. All your data will be permanently removed.</p>
          <InputsPack
            type={typez}
            value={check}
            classes="right"
            placeholder="Enter password to confirm"
            svg={ typez === 'password' ? UnlockSvg() : Padlocksvg() }
            onClick={()=>{ setTypez(( prev: string ) => prev === "password" ? "text" : "password") }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheck(e.target.value)}
          />
          <p className="error"> { errs } </p>
          <button disabled={loads} className="delete-account" onClick={handleDelete}>Delete Account</button>
        </div>}
      </section>
    </main>
  )
}

export default Settings
