import './../auth.css'
import validator from 'validator'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { GoogleG } from './../components/svgPack';
import { InputsPack } from '../components/pageParts'
import { loaderCircleSvg, LogInSvg, Mailsvg, Padlocksvg, UnlockSvg, Xsvg } from '../components/svgPack'
import { Link , useSearchParams, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const goTo = useNavigate();
  const [params] = useSearchParams();
  const [ email , setEmail ] = useState('')
  const [ type , setType ] = useState('password')
  const [ password , setPassword ] = useState('')
  const { login , twitterLogin , googleLogin , error , setError , setLoading , loading } = useAuth()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if ( loading ) return
    if (!validator.isEmail(email)) return setError('Incorrect email')
    if ( password.trim().length < 6) return setError('Incorrect password')
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/auth/signin`, {
        method: 'POST',
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email , password })
      })

      const json = await res.json()
      if (!res.ok) {
        setLoading(false)
        return setError(json.error)
      }
      login(json.token)
    } catch {
      setError('Failed to sign in, please try again later.')
    }
    setLoading(false)
  }
  
  const GoogleLogIn = (e: React.FormEvent) => {
    e.preventDefault()
    googleLogin()
  }

  const TwitterLogIn = (e: React.FormEvent) => {
    e.preventDefault()
    if ( loading ) return
    twitterLogin()
  }
  
  useEffect(() => {
    const token = params.get("token");

    const clearExisting = () => { setError(''); setLoading(false) }

    if (!token) return clearExisting();

    const validate = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API}/auth/validate/twitter`, {
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-type": "application/json",
          },
        })
        
        if (res.ok) {
          login(token)
          return goTo("/nodes", { replace: true });
        }
        goTo("/signin", { replace: true });
        return setError("Invalid token")
      } catch (error) {
        setError("Session invalid. Please sign in again.");
        goTo("/signin", { replace: true });
      }
    }
    validate()
  }, []);

  return (
    <main>
      <form className='auth'>
        <h2>Sign in</h2>
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
          <button disabled={loading} onClick={handleSignIn}> { loading ? loaderCircleSvg() : LogInSvg() } { !loading ? 'Sign in' : 'Signing in...'} </button>
        </div>
        <p className="or"> <span>Or</span> </p>
        <div>
          <button disabled={loading} onClick={GoogleLogIn}> {GoogleG()} Sign in <span>with Google</span></button>
          <button disabled={loading} onClick={TwitterLogIn}> {Xsvg('BIG')} Sign in <span>with Twitter</span></button>
        </div>
        <p className='side'> New to Donnut-nodes? <Link to='/signup'> Sign up </Link> </p>
      </form>
    </main>
  )
}

export default SignIn
