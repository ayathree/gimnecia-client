import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";


const ManageSlot = () => {
    const axiosSecure = useAxiosSecure();
    const {user}=useAuth()
  const { data: booked = {} } = useQuery({
    queryKey: ['booked', user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked/${user.displayName}`);
      return res.data;
    }
  });
    return (
        <div>
            <h1>manage slot :{booked.length}</h1>
            <div>
                

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
           
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

            </div>
        </div>
    );
};

export default ManageSlot;