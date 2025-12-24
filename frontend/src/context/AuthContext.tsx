import { User } from "../types"
import { SetStateAction } from 'react';
import { useGoogleLogin } from '@react-oauth/google'
import { createContext, useContext, useEffect, useState } from "react"
import { classAdd, classRemove, clearCachedUser, loadCachedUser } from "../components/functions"

interface Auth {
	error: string
	token: string
	loading: boolean
	user: User | null
	logout: () => void
	toggle: () => void
	googleLogin: () => void
	twitterLogin: () => void
	login: (token: string) => void
	setError: React.Dispatch<SetStateAction<string>>
	setToken: React.Dispatch<SetStateAction<string>>
	setLoading: React.Dispatch<SetStateAction<boolean>>
	setUser: React.Dispatch<SetStateAction< User | null >>
}

const AuthContext = createContext< Auth | undefined>( undefined )

export const AuthProvider = ({children}: { children: React.ReactNode}) => {
	const [ mode ,  setMode ] = useState('')
	const [ error ,  setError ] = useState('')
	const [ token ,  setToken ] = useState('')
	const [ loading ,  setLoading ] = useState(false)
	const [ user ,  setUser ] = useState< User | null >(null)

	const login = (token: string) => {
		setError('')
    try {
      const decoded = JSON.parse( atob(token.split('.')[1]) );
			const oldUserSettings = loadCachedUser()
      localStorage.setItem("token", token);
      setUser( oldUserSettings || decoded)
			setLoading(false)
			setToken(token)
    } catch (err) {
			setUser(null)
			setLoading(false)
			localStorage.removeItem('token')
			setError("Could not validate user. Please sign in")
    }
  };

  const logout = () => {
		setError('')
		setToken('')
    setUser(null);
		clearCachedUser()
    localStorage.removeItem("token");
    localStorage.removeItem("watchlist");
  };

  const toggle = () => {
		const now = mode === 'light' ? 'dark' : 'light'
		classRemove('body', mode)
		classAdd('body', now)
		setMode( now )
    localStorage.setItem("mode", now );
  };


const googleLogin = useGoogleLogin({
  onSuccess: async (response) => {
	
       const { access_token } = response;
    
    if (!access_token) {
      console.error("No access_token received:", response);
      setError("Google login failed - no access token");
      return;
    }

		try {
			 const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then(res => res.json());
      
      console.log("Google user info:", userInfo);
      
      await GoogleSignInWithAccessToken(access_token, userInfo);
      
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setError("Failed to get user information from Google");
    }
  },
  onError: () => {
    setError("Google login failed");
  },
	 scope: 'profile email openid',
});

	const twitterLogin = async () => {
		setLoading(true)
		setError('')
		
		window.location.href = `${process.env.REACT_APP_API || 'http://localhost:4000'}/auth/twitter`
	}

	const GoogleSignInWithAccessToken = async (access_token: string, userInfo: any) => {
  if (loading) return;
  
  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/auth/google`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        access_token,
        user_info: userInfo 
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      const errorMessage = json.error || json.message || "Google login failed";
      return setError(errorMessage);
    }

    if (!json.token) {
      setLoading(false);
      return setError("No authentication token received");
    }

    login(json.token);
    setLoading(false);
    
  } catch (error: any) {
    setLoading(false);
    console.error("Google login error:", error);
    setError(error.message || 'Failed to authorize login. Try again later.');
  }
};
	useEffect(() => {
		setLoading(true)
		classAdd('header h2', 'spin')
		const prevMode = localStorage.getItem('mode')
		const token = localStorage.getItem('token')

		classAdd('body', prevMode || 'light')
		if ( !prevMode ) setMode('light')
		else setMode( prevMode )

		if (!token) {
			setUser(null)
			setLoading(false)
			return
		}

		login(token)
	}, [])

	return (
		<AuthContext.Provider value={{ loading, token , setToken , googleLogin, twitterLogin , setUser , login , logout , toggle , user , error , setError , setLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth must be used within a AuthProvider")
	return context
}