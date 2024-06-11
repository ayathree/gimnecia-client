import { Link, useLocation, useNavigate } from "react-router-dom";
import gym from '../assets/gymdesign.webp'
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAuth from "../hook/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const Register = () => {
    const axiosPublic = useAxiosPublic()
    const {createUser,updateUser}=useAuth()
    const navigate= useNavigate()
    const location =useLocation();
    const {
        register,
        handleSubmit,
        reset,
       
        formState: { errors },
      } = useForm()
      const onSubmit = (data) =>{
        console.log(data)
        createUser(data.email, data.password)
        .then(result=>{
          const loggedUser = result.user;
          console.log(loggedUser)
          updateUser(data.name, data.photo)
          .then(()=>{
            console.log('updated')
            const userInfo= {
              name: data.name,
              email: data.email,
              // role:'member',
            }
            console.log(userInfo)
            axiosPublic.post('/users', userInfo)
           .then(res=>{
            if (res.data.insertedId) {
              console.log('user added at database')
              reset
              navigate(location?.state? location.state:'/')
              
            }
           })
            
          })
          .catch(error=>{
            console.log(error.message)
          })
          Swal.fire("Success", "Successfully registered.", "success");
        })
        .catch(error=>{
          console.log(error.message)
          Swal.fire("error", "An error ocurred", "error");
        })
      }
    return (
        <div>
           <Helmet>
                <title>GYMNECIA | Register</title>
            </Helmet>
             <div className="flex w-full mt-24 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    <div className="hidden bg-cover lg:block lg:w-1/2" style={{
        backgroundImage: `url(${gym})`
    }}></div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
       

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome !
        </p>

       <form onSubmit={handleSubmit(onSubmit)} >
       <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Name</label>
            <input id="LoggingName" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" {...register("name")} name="name" required />
        </div>

      

        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" {...register("email")} name="email" required />
        </div>
        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Photo URL</label>
            <input id="LoggingPhoto" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" {...register("photo")} name="photo" required />
        </div>

        <div className="mt-4">
            <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
               
            </div>

            <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name="password" {...register("password",{
             minLength:6, 
          })} required />
          {errors.password?.type==="minLength" && <p className="text-red-600">Password must 6 characters</p> }
        </div>

        <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transhtmlForm bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Register
            </button>
        </div>

       </form>
        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link to={'/login'}><a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or log in</a></Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
    </div>
</div>
        </div>
    );
};

export default Register;