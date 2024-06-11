import Swal from "sweetalert2";

import useAxiosSecure from "../../../hook/useAxiosSecure";
// import useUsers from "../../../hook/useUsers";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";


const AddNewForum = () => {
    const axiosSecure = useAxiosSecure()
const {user}=useAuth()

const {data: userRole=[]}=useQuery({
    queryKey:['userRole'],
    queryFn: async()=>{
        const res= await axiosSecure.get(`/users/${user.email}`)
        return res.data
    }
})
    const handleForum=e=>{
        e.preventDefault()
        const form=e.target;
        const title= form.title.value;
        const detail= form.details.value;
        const image = form.image.value;
        const users = userRole?.role;
        const data={title, detail,image, users}
        console.log(data)
        axiosSecure.post('/forum', data)
        .then(res=>{
            if (res.data.insertedCount > 0) {
                // Swal.fire("Success", "Class has been submitted.", "success");
            }
            else{
                Swal.fire("Success", "Forum has been submitted.", "success");
                
                }
            form.reset()

        })

    }


    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add Forum</h2>

    <form onSubmit={handleForum}>
        <div className=" mt-4 ">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Title</label>
                <input id="username" type="text" name="title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Image</label>
                <input id="emailAddress" type="text" name="image" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            
<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
<textarea id="message" rows="4" name="details" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write  here..."></textarea>


            

            
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
    </form>
</section>

            
        </div>
    );
};

export default AddNewForum;