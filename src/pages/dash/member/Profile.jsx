import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";


const Profile = () => {
    const {user,setReload}=useAuth()
   
    const [update, setUpdate]=useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        const unSubscribe =onAuthStateChanged(auth, currentUser=>{
            setUpdate(currentUser)
            
            console.log(currentUser)
        });
        return()=>{
            unSubscribe();
        }
    },[])
    const handleUpdate=e=>{
        e.preventDefault();
        const form=e.target;
        const name =form.name.value;
        const photo =form.photoUrl.value
        console.log(name, photo)
        console.log(update)
        updateProfile(update, {
            displayName:name,
            photoURL:photo
            
            

          })
          .then(()=>{
            setReload(true)
            e.target.reset();
            
            navigate('/dashboard/profile');
            console.log("updated")
           
            
            
          })
          .catch((error)=>console.log(error))
    }
    return (
        <div>
             <Helmet>
                <title>GYMNECIA | User profile</title>
            </Helmet>
            <div  >
           
            
                <div className="hero  min-h-scree">
  <div className="hero-content flex-col lg:flex-row lg:gap-44">
    <img src={user.photoURL} className="max-w-lg rounded-lg shadow-2xl h-[100px] w-[100px] lg:h-[300px] lg:w-[300px]  " />
   <form onSubmit={handleUpdate}>
   <div className="flex-1">
        <h1 className="lg:text-2xl font-bold mb-3 text-black"> <span className="underline underline-offset-4">Name:</span> <span className=" lg:text-lg font-normal text-black" >{user?.displayName}</span> </h1>
      
      <h1 className="lg:text-2xl font-bold mb-3 text-black underline underline-offset-4">Update Name:</h1>

      <input type="text" placeholder="new name" name="name" className="input input-bordered lg:w-[350px] rounded-3xl mb-6" required  />
      <h1 className="lg:text-2xl font-bold mb-3 text-black"> <span className="underline underline-offset-4">Email:</span> <span className=" lg:text-lg font-normal text-black" >{user?.email}</span> </h1>
      <h1 className="lg:text-2xl font-bold mb-3 text-black"> <span className="underline underline-offset-4">Last Login Time:</span> <span className=" lg:text-lg font-normal text-black" >{user?.metadata?.lastSignInTime}</span> </h1>
      
      { <h1 className="lg:text-2xl font-bold mb-3 text-black underline underline-offset-4">Update PhotoUrl:</h1> }

<input type="text" placeholder="new url" name="photoUrl" className="input input-bordered lg:w-[350px] rounded-3xl mb-6" required  />
<br />

      
      <button  className="p-4 bg-gray-400 font-semibold lg:text-xl">Update</button>
    </div>
   </form>
  </div>
</div>
               
                
        </div> 
        {/* <p>{user.displayName}</p> */}
        </div>
    );
};

export default Profile;