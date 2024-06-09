import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAuth from "../../hook/useAuth";

const BookedTrainer = () => {
    const axiosPublic = useAxiosPublic()
    const {user}=useAuth()
    const time = useLoaderData();
    const [price, setPrice] = useState(0);
    console.log(time)

    const handleJoin = e => {
        e.preventDefault();
        const form = e.target;
        const name = time?.name;
        const userEmail = user?.email;
        const slotTime = time?.slotTime;
        const slotId = time?._id;
        const slotName = time?.slotName;
        const packageType = form.package.value;
        const classes = form.class.value;
        const statusBook ='none'

        // Determine the price based on the selected package
        let price;
        switch (packageType) {
            case 'basic':
                price = 10;
                break;
            case 'standard':
                price = 50;
                break;
            case 'premium':
                price = 100;
                break;
            default:
                price = 0;
                break;
        }

        const bookedInfo = { name, slotTime,statusBook, slotName, price, package: packageType, slotId, userEmail, classes };
        console.log(bookedInfo);

        axiosPublic.post('/booked', bookedInfo)
        .then(res=>{
            console.log(res.data)
            console.log('added')
            form.reset()
        })
        .catch(error=>{
            console.log(error.message)
        })
    };

    const handlePackageChange = (e) => {
        const selectedPackage = e.target.value;
        let price;
        switch (selectedPackage) {
            case 'basic':
                price = 10;
                break;
            case 'standard':
                price = 50;
                break;
            case 'premium':
                price = 100;
                break;
            default:
                price = 0;
                break;
        }
        setPrice(price);
    };

    return (
        <div>
            <h1>Book Trainer: {time.availableTime}</h1>
            <div className="p-6 mt-24 py-12 bg-gray-400 dark:bg-violet-600 dark:text-gray-50">
                <div className="container mx-auto">
                    <h1 className="font-semibold text-3xl mb-4">Our Packages</h1>
                    <div className="flex flex-col gap-7 lg:flex-row items-center justify-between">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Package Name</th>
                                        <th scope="col" className="px-6 py-3">Benefits</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Basic</th>
                                        <td className="px-6 py-4">
                                            Access to gym facilities during regular operating hours<br />
                                            Use of cardio and strength training equipment<br />
                                            Access to locker rooms and showers.
                                        </td>
                                        <td className="px-6 py-4">$10</td>
                                    </tr>
                                    <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Standard</th>
                                        <td className="px-6 py-4">
                                            All benefits of the basic membership<br />
                                            Access to group fitness classes such as yoga, spinning, and Zumba.<br />
                                            Use of additional amenities like a sauna or steam room.
                                        </td>
                                        <td className="px-6 py-4">$50</td>
                                    </tr>
                                    <tr className="bg-gray-300 dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Premium</th>
                                        <td className="px-6 py-4">
                                            All benefits of the standard membership.<br />
                                            Access to personal training sessions with certified trainers.<br />
                                            Discounts on additional services such as massage therapy or nutrition counseling.
                                        </td>
                                        <td className="px-6 py-4">$100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h1 className="font-semibold text-4xl">Choose your package from here</h1>
                    </div>
                </div>
            </div>
            <div>
                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 py-24 mx-auto lg:py-32">
                        <div className="lg:flex">
                            <div className="lg:w-1/2">
                                <h1 className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">Book the Trainer</h1>
                                <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">{time.name}</h1>
                                <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">Time Slot : {time.slotTime}</h1>
                            </div>
                            <div className="mt-8 lg:w-1/2 lg:mt-0">
                                <form onSubmit={handleJoin} className="w-full lg:max-w-xl">
                                    <h1 className="font-semibold">Select Class :</h1>
                                    <div className="relative flex items-center mb-4">
                                        <select name="class" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required>
                                            <option value=""></option>
                                            {
                                                time.classT?.map(item=><option key={item.id} value={item}>{item}</option>)
                                            }
                                            {/* <option value="yoga">Yoga</option>
                                            <option value="pilates">Pilates</option>
                                            <option value="zumba">Zumba</option>
                                            <option value="boxing">Boxing</option> */}
                                        </select>
                                    </div>
                                    <h1 className="font-semibold">Select Package :</h1>
                                    <div className="relative flex items-center">
                                        <select name="package" onChange={handlePackageChange} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required>
                                            <option value=""></option>
                                            <option value="basic">Basic</option>
                                            <option value="standard">Standard</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <h1 className="font-semibold">Price: ${price}</h1>
                                    </div>
                                    <div className="mt-8 md:flex md:items-center">
                                       
                                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-400 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Save
                                        </button>
                                        
                                    </div>
                                </form>
                                <Link to={`/payment/${user.email}`}>
                                <div className="mt-8 md:flex md:items-center">
                                       
                                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-400 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Join Now
                                        </button>
                                        
                                    </div></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BookedTrainer;
