import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import Swal from "sweetalert2";


const GoogleLogin = () => {
    const{ googleSignIn}=useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location =useLocation();


    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data)
                navigate(location?.state? location.state:'/')
            })
            Swal.fire("Success", "Successfully login.", "success");
            
        })
        .catch(error=>{
            console.log(error.message)
            Swal.fire("error", "An error ocurred.", "error");
          })
          

    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn">
            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;