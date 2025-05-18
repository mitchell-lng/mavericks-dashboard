import './oops.css'

import { NavLink } from "react-router-dom"

const Oops = () => {
  return (
    <div className='oops'>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>Let's <NavLink className="embeded-link" to="/dashboard">go back home</NavLink></p>
    </div>
  )
}

export default Oops