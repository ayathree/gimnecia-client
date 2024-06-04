import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading]=useAdmin()

    const{user, loading}=useAuth();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <progress className="progress progress-info w-56" value="100" max="100"></progress>
        
    }
    if (user && isAdmin) {
        return children
        
    }
    return <Navigate to='/' state={{from:location}} replace ></Navigate>
};

export default AdminRoute;