import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Ellipses } from "./../components/functions"
import { loaderCircleSvg } from "./../components/svgPack"

const NotFound = () => {
  const goTo = useNavigate()
  const [ number , setNumber ] = useState('5')
  const [ redirecting , setRedirecting ] = useState(false)

  useEffect(()=> {
    let num: number = 5
    let interval: NodeJS.Timeout | undefined | number
    const int = setTimeout(()=>{
      setRedirecting(true)
      interval = setInterval(()=>{
        num--
        setNumber( num === 0 ? 'now' : `${num}`)
        if ( num <= 1 ) {
          goTo('/nodes')
          clearInterval(interval);
        }
      }, 1000 )
    }, 10000 )
    return () => {
      clearTimeout(int)
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <main style={{ paddingTop: '75px'}}>
      <div className="bg-set">
        <h2> The page you are looking for could not be found. </h2>
        <p> { number === '0' && loaderCircleSvg() } { !redirecting ? 'You seem to be lost. Kindly follow any of our navigation links and buttons.' : `Redirecting you to nodes list ${ number !== '0' ? 'in' : '' } ${number} seconds`}{ redirecting && <Ellipses />}</p>
        <div> <img src='/lost.png' alt='loading'></img></div>
      </div>
    </main>
  )
}

export default NotFound
