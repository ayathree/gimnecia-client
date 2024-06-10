import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageSlot = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: booked = [], refetch } = useQuery({
        queryKey: ['booked', user?.displayName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user.displayName}`);
            return res.data;
        },
        enabled: !!user?.displayName  
    });

    const handleDelete = (book) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookeee/${book._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div>
            <h1>Manage Slot: {booked.length}</h1>
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Slot Time</th>
                                <th scope="col" className="px-6 py-3">Slot Name</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booked.map(book => (
                                <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {book.userEmail}
                                    </th>
                                    <td className="px-6 py-4">{book.slotTime}</td>
                                    <td className="px-6 py-4">{book.slotName}</td>
                                    <td className="px-6 py-4">
                                        {book.statusBook === 'Booked' ? (
                                            <p className="text-green-500">Booked</p>
                                        ) : (
                                            <p className="text-red-500">Pending</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.statusBook === 'Booked' ? (
                                            <Link to={`/dashboard/bookeDetails/${book._id}`}>
                                                <button className="text-blue-500">Details</button>
                                            </Link>
                                        ) : (
                                            <button onClick={() => handleDelete(book)} className="text-blue-500 text-2xl">
                                                <MdOutlineDelete />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSlot;
