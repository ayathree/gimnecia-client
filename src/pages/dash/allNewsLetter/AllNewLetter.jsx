import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const AllNewLetter = () => {
    const axiosSecure=useAxiosSecure()
    const {data: subscriber=[],}=useQuery({
        queryKey:['subscriber'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/news');
            return res.data;
        }
    })
    return (
        <div>
             <Helmet>
                <title>GYMNECIA | News letter subscriber</title>
            </Helmet>
            <div>
                

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    subscriber no
                </th>
                <th scope="col" className="px-6 py-3">
                subscriber name
                </th>
                <th scope="col" className="px-6 py-3">
                subscriber email
                </th>
                
            </tr>
        </thead>
        <tbody>
           
           {
            subscriber.map((subs,index)=> <tr key={subs._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td className="px-6 py-4">
                    {subs.name}
                </td>
                <td className="px-6 py-4">
                   {subs.email}
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

export default AllNewLetter;