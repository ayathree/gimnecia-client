import trainer from '../../assets/trainer2.jpg'
import useAuth from '../../hook/useAuth';

import Select from 'react-select'
import useAxiosPublic from '../../hook/useAxiosPublic';
import Swal from 'sweetalert2';
// import useUsers from '../../hook/useUsers';



const BeATrainer = () => {
    const{user}=useAuth()
    const axiosPublic = useAxiosPublic()
    // const[user]=useUsers()
    const options = [
        { value: 'sat', label: 'Sat' },
        { value: 'sun', label: 'Sun' },
        { value: 'mon', label: 'Mon' },
        { value: 'tue', label: 'Tue' },
        { value: 'wed', label: 'Wed' },
        { value: 'thu', label: 'Thu' },
        { value: 'fry', label: 'Fry' }
      ]
    
      const handleApply=e=>{
        e.preventDefault()
        const form= e.target;
        const name=form.name.value;
        const age=form.age.value;
        const socialIcon=form.socialIcon.value;
        const experience=form.experience.value;
        const availableTime=form.availableTime.value;
        const skillElements = form.querySelectorAll('input[name="skills[]"]:checked');
        const skills = Array.from(skillElements).map(element => element.value);
        const email=form.email.value;
        const image=user?.photoURL;
        const status='pending';
        const availableDays=form.availableDays.value;
        const applyTrainer={name,age,socialIcon,experience,availableTime,skills,status,email,image,availableDays}
        console.log(applyTrainer)

        axiosPublic.post('/trainers', applyTrainer)
        .then(res=>{
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your request has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  form.reset()

                
            }
        })
        .catch(error=>{
            console.log(error.message)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred",
                showConfirmButton: false,
                timer: 1500
              });
        })
    
      }
    
    return (
        <div>
            <h1>be a trainer</h1>
            <div className="flex w-full mt-24  mx-auto  bg-white  dark:bg-gray-800 ">
    <div className="hidden bg-cover lg:block lg:w-1/2" style={{
        backgroundImage: `url(${trainer})`
    }}></div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
     
<form onSubmit={handleApply}>
<div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
        <input type="text" name='name' id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  required />
    </div>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
     
        <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
            <input type="text" name='age' id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>  
        <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social Icon</label>
            <input type="link" name='socialIcon' id="icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  required />
        </div>
        <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of Experience</label>
            <input type="text" name='experience' id="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available Time in a Day</label>
            <input type="time" name='availableTime' id="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
    </div>
    
<h3 className="mb-4 font-medium  text-gray-900 dark:text-white">Skills</h3>
<ul  className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="vue-checkbox" type="checkbox" name='skills[]' value="Empathy" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label htmlFor="vue-checkbox" className="w-full py-3 ms-2 text-sm  text-gray-900 dark:text-gray-300">Empathy</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="react-checkbox" type="checkbox" name='skills[]' value="Exercise Techniques" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="react-checkbox" className="w-full py-3 ms-2 text-sm  text-gray-900 dark:text-gray-300">Exercise Techniques</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="angular-checkbox" type="checkbox" name='skills[]' value="Communication" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="angular-checkbox" className="w-full py-3 ms-2 text-sm  text-gray-900 dark:text-gray-300">Communication</label>
        </div>
    </li>
    <li className="w-full  border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="laravel-checkbox" type="checkbox" name='skills[]' value="First Aid and CPR" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label htmlFor="laravel-checkbox" className="w-full py-3 ms-2 text-sm  text-gray-900 dark:text-gray-300">First Aid and CPR</label>
        </div>
    </li>
</ul>

    <div className="mb-6 mt-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.email} readOnly />
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
        <input type="text" id="image" name='image' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" defaultValue={user.photoURL} readOnly />
    </div> 
    <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available days a week</label>
        <Select name='availableDays' options={options}></Select>
    </div> 
    <div className="flex items-start mb-6">
        
       
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>
</form>

    </div>
</div>
        </div>
    );
};

export default BeATrainer;