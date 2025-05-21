import './oops.css'

import { useNavigate } from "react-router-dom"

import FourOFour from "../../assets/images/Mavericks 404 Slam Dunk.jpg"

const Oops = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }
  return (
    <div className='oops'>
      <img src={FourOFour} alt="404 Not Found" />
      <div>
        <h1>Oops!</h1>
        <p>Something went wrong.</p>
        <p>Let's <span className="embeded-link" onClick={handleClick}>go back</span></p>
      </div>
    </div>
  )
}

export default Oops