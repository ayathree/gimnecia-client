import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useTrainer from "../hook/useTrainer";


const TrainerRouter = ({children}) => {
    const [isTrainer, isTrainerLoading]=useTrainer()

    const{user, loading}=useAuth();
    const location = useLocation();
    if (loading || isTrainerLoading) {
        return <progress className="progress progress-info w-56" value="100" max="100"></progress>
        
    }
    if (user && isTrainer) {
        return children
        
    }
    return <Navigate to='/' state={{from:location}} replace ></Navigate>
};

export default TrainerRouter;