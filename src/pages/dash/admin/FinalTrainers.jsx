import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";


const FinalTrainers = () => {
    const axiosSecure=useAxiosSecure()
    const {data: trainers=[],refetch}=useQuery({
        queryKey:['trainers'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/confirmedTrainer');
            return res.data;
        }
    })
    const handleDelete=trainer=>{
        axiosSecure.delete(`/confirmedTrainer/${trainer._id}`)
        .then(res=>{
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                if (res.data.deletedCount >0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              
            }
        );
    }
    
            
                  
            refetch()
             
           }
        })

    })
}
    return (
        <div>
            trainee:{trainers.length}
            <div>
                

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Trainer No
                </th>

                <th scope="col" className="px-6 py-3">
                    Trainer name
                </th>
                <th scope="col" className="px-6 py-3">
                    Trainer email
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                
            </tr>
        </thead>
        <tbody>
           
            {
                trainers.map((trainer,index)=><tr key={trainer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {trainer.name}
                </td>
                <td className="px-6 py-4">
                    {trainer.email}
                </td>
               
                <td className="px-6 py-4">
                    <button onClick={()=>handleDelete(trainer)} className="text-blue-700 font-semibold">Delete</button>
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

export default FinalTrainers;