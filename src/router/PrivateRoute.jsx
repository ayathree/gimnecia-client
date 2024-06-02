import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const{user, loading}=useAuth();

    const location = useLocation();
    if (loading) {
        return <progress className="progress progress-info w-56" value="100" max="100"></progress>
        
    }
    if (user) {
        return children
        
    }
    return <Navigate state={location.pathname} to={'/login'} ></Navigate>
};


export default PrivateRoute;