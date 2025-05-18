import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/Auth"


const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute