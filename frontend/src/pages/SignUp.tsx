import './../auth.css'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { InputsPack } from '../components/pageParts'
import { GoogleG, loaderCircleSvg, LogInSvg, Mailsvg, Padlocksvg, UnlockSvg, Xsvg } from '../components/svgPack'

const SignUp = () => {
  const [ name , setName ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ type , setType ] = useState('password')
  const [ password , setPassword ] = useState('')
  const { login , twitterLogin , googleLogin  , error , setError , setLoading , loading } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if ( loading ) return
    if (!validator.isEmail(email)) return setError('Invalid email')
    if (!name.trim()) return setError('Please put in a username')
    if ( password.trim().length < 6 ) return setError('Password is too short')
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/auth/signup`, {
        method: 'POST',
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({ name , email , password })
      })

      const json = await res.json()
      if (!res.ok) {
        setLoading(false)
        return setError(json.error)
      }
      login(json.token)
    } catch {
      setError('Failed to sign up, please try again later')
    }
    setLoading(false)
  }

  const GoogleLogIn = (e: React.FormEvent) => {
    e.preventDefault()
    googleLogin()
  }

  const TwitterLogIn = (e: React.FormEvent) => {
    twitterLogin()
    if ( loading ) return
    e.preventDefault()
  }
  
  useEffect(()=>{
    const clearExisting = () => { setError(''); setLoading(false) }
    clearExisting()
    return clearExisting
  }, [ ])

  return (
    <main>
      <form className='auth'>
        <h2>Sign up</h2>
        <InputsPack
          name='name'
          value={name}
          placeholder='Donnutman'
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value.trim())}}
        />
        <InputsPack
          type="email"
          value={email}
          classes="right"
          svg={Mailsvg()}
          placeholder='you@example.com'
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value.trim())}}
        />
        <InputsPack
          type={type}
          classes="right"
          value={password}
          placeholder='Enter password'
          svg={ type === 'password' ? UnlockSvg() : Padlocksvg()}
          onClick={()=>{ setType((prev: string) => prev === 'password' ? 'text' : 'password' )}}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value.trim())}}
        />
        <div className='side'>
          <p className='error'>{ error }</p>
          <button disabled={loading} onClick={handleSignUp}> { loading ? loaderCircleSvg() : LogInSvg() }  { !loading ? 'Sign up' : 'Signing up...'} </button>
        </div>
        <p className="or"> <span>Or</span> </p>
        <div>
          <button disabled={loading} onClick={GoogleLogIn}> {GoogleG()} Sign up <span>with Google</span></button>
          <button disabled={loading} onClick={TwitterLogIn}> {Xsvg('BIG')} Sign up <span>with Twitter</span></button>
        </div>
        <p className='side'> Have an account? <Link to='/signin'> Sign in </Link> </p>
      </form>
    </main>
  )
}

export default SignUp
