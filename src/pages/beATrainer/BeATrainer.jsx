import  { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import trainer from '../../assets/trainer2.jpg';
import useAuth from '../../hook/useAuth';
import useAxiosPublic from '../../hook/useAxiosPublic';

const BeATrainer = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const options = [
    { value: 'sat', label: 'Sat' },
    { value: 'sun', label: 'Sun' },
    { value: 'mon', label: 'Mon' },
    { value: 'tue', label: 'Tue' },
    { value: 'wed', label: 'Wed' },
    { value: 'thu', label: 'Thu' },
    { value: 'fri', label: 'Fri' }
  ];

  const optionsTwo = [
    { value: '9.30-11.30 AM', label: '9.30-11.30 AM' },
    { value: '4.30-6.30 PM', label: '3.30-6.30 PM' },
    { value: '7.30-9.30 PM', label: '7.30-9.30 PM' },
  ];

  const optionsThree = [
    { value: 'morning', label: 'morning' },
    { value: 'evening', label: 'evening' },
    { value: 'night', label: 'night' },
  ];

  const [availableDays, setAvailableDays] = useState([]);
  // const [availableTimes, setAvailableTimes] = useState([]);

  const handleApply = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const socialIcon = form.socialIcon.value;
    const experience = form.experience.value;
    const skillElements = form.querySelectorAll('input[name="skills[]"]:checked');
    const skills = Array.from(skillElements).map(element => element.value);
    const email = user?.email;
    const image = user?.photoURL;
    const status = 'pending';
    const slotTime = form.availableTime.value;
    const slotName = form.slotName.value;

    // Combine availableDays and availableTimes into timeslot
    const days = availableDays.map(day => day.value);
      
    

    const applyTrainer = {
      name,
      age,
      socialIcon,
      experience,
      skills,
      status,
      email,
      image,
      days,
      slotName,
      slotTime
    };

    console.log(applyTrainer);

    axiosPublic.post('/trainers', applyTrainer)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your request has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          form.reset();
          setAvailableDays([]);
         
        }
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div>
      <h1>Be a Trainer</h1>
      <div className="flex w-full mt-24 mx-auto bg-white dark:bg-gray-800">
        <div className="hidden bg-cover lg:block lg:w-1/2" style={{
          backgroundImage: `url(${trainer})`
        }}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <form onSubmit={handleApply}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                <input type="text" name='age' id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="socialIcon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social Icon</label>
                <input type="url" name='socialIcon' id="socialIcon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of Experience</label>
                <input type="text" name='experience' id="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="availableTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available time in day</label>
                <Select name='availableTime'  options={optionsTwo} ></Select>
              </div>
              <div>
                <label htmlFor="availableTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slot Name</label>
                <Select name='slotName'  options={optionsThree} ></Select>
              </div>
            </div>

            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Skills</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="empathy" type="checkbox" name='skills[]' value="Empathy" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="empathy" className="w-full py-3 ms-2 text-sm text-gray-900 dark:text-gray-300">Empathy</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="exercise" type="checkbox" name='skills[]' value="Exercise Techniques" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="exercise" className="w-full py-3 ms-2 text-sm text-gray-900 dark:text-gray-300">Exercise Techniques</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="communication" type="checkbox" name='skills[]' value="Communication" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="communication" className="w-full py-3 ms-2 text-sm text-gray-900 dark:text-gray-300">Communication</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="firstAid" type="checkbox" name='skills[]' value="First Aid and CPR" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="firstAid" className="w-full py-3 ms-2 text-sm text-gray-900 dark:text-gray-300">First Aid and CPR</label>
                </div>
              </li>
            </ul>

            <div className="mb-6 mt-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.email} readOnly />
            </div>
            <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
              <input type="text" id="image" name='image' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={user.photoURL} readOnly />
            </div>
            <div className="mb-6">
              <label htmlFor="availableDays" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Available days a week</label>
              <Select name='availableDays' isMulti options={options} onChange={setAvailableDays}></Select>
            </div>
            <div className="flex items-start mb-6"></div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeATrainer;
