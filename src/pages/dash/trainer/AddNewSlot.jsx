import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";

const AddNewSlot = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [availableDays, setAvailableDays] = useState([]);

    const { data: trainer = {} } = useQuery({
        queryKey: ['trainer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trainee/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email  
    });

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
        { value: '7.30-9.30 PM', label: '7.30-9.30 PM' }
    ]; 

    const optionsThree = [
        { value: 'morning', label: 'morning' },
        { value: 'evening', label: 'evening' },
        { value: 'night', label: 'night' }
    ];   

    const handleNew = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newslotTime = form.availableTime.value;
        const newslotName = form.slotName.value;
        const newdays = availableDays.map(day => day.value);

        const applyTrainer = {
            newslotTime,
            newslotName,
            newdays
        };

        try {
            const res = await axiosSecure.put(`/trainee/new/${user.email}`, applyTrainer);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your request has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                setAvailableDays([]);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your request has been saved ",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error updating trainer:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleNew} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        name="floating_email" 
                        defaultValue={trainer?.name} 
                        id="floating_email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required 
                    />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        defaultValue={trainer?.email} 
                        name="floating_password" 
                        id="floating_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        readOnly
                    />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email 
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        defaultValue={trainer?.skills} 
                        name="repeat_password" 
                        id="floating_repeat_password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        readOnly
                    />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Skills
                    </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            defaultValue={trainer?.days} 
                            name="floating_first_name" 
                            id="floating_first_name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly 
                        />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Selected Days
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            defaultValue={trainer?.age} 
                            name="floating_last_name" 
                            id="floating_last_name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly 
                        />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Age
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            defaultValue={trainer?.experience} 
                            name="floating_phone" 
                            id="floating_phone" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly 
                        />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Experience
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            defaultValue={trainer?.classT} 
                            name="floating_company" 
                            id="floating_company" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly 
                        />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Class
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type='text' 
                            defaultValue={trainer?.slotTime} 
                            name="floating_phone" 
                            id="floating_phone" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly  
                        />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Slot Time
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            type="text" 
                            defaultValue={trainer?.slotName} 
                            name="floating_company" 
                            id="floating_company" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            readOnly
                        />
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Slot Name
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <Select className="mt-5" name='slotName'  options={optionsThree} ></Select>
                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            New Slot Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Select className="mt-5" name='availableTime'  options={optionsTwo} ></Select>
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            New Slot Time
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Select className="mt-5" name='availableDays' isMulti options={options} onChange={setAvailableDays}></Select>
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            New Selected Days
                        </label>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddNewSlot;
