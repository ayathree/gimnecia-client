import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router-dom";


const ApplyTrainers = () => {
    const axiosSecure=useAxiosSecure()
    const {data: trainers=[],}=useQuery({
        queryKey:['trainers'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/trainers');
            return res.data;
        }
    })
    return (
        <div>
            <h1>apply :{trainers.length}</h1>
            <div>
                

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Applicant No
                </th>
                <th scope="col" className="px-6 py-3">
                    Applicant name
                </th>
                <th scope="col" className="px-6 py-3">
                    Applicant Email
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
           {
            trainers.map((trainer,index)=> <tr key={trainer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th>
                    {index+1}
                </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {trainer.name}
            </th>
            <td className="px-6 py-4">
                {trainer.email}
            </td>
            <td className="px-6 py-4">
                <Link to={`/dashboard/applicantDetails/${trainer._id}`}> <button className="text-blue-600 font-semibold">Detail</button></Link>
               
            </td>
            
        </tr>)
           }
           
        </tbody>
    </table>
</div>

            </div>
        </div>
    );
};

export default ApplyTrainers;