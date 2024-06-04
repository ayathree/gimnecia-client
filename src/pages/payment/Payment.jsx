import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../hook/useAuth";


const Payment = () => {
    const payment=useLoaderData()
    const {user}=useAuth()
    console.log(payment)
    return (
        <div>

           <h1>payment</h1> 
           <div className="relative mt-24 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Trainer Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Package
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
           

{
    payment.map(pay=><tbody key={pay._id}>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {user.displayName}
                        </th>
                        <td className="px-6 py-4">
                            {pay.name}
                        </td>
                        <td className="px-6 py-4">
                            {pay.package}
                        </td>
                        <td className="px-6 py-4">
                            ${pay.price}
                        </td>
                        <td className="px-6 py-4">
                            <Link to={`/payCard/${pay._id}`}><button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pay</button></Link>
                        </td>
                    </tr>
                  
                </tbody>

    )
}
    </table>

        </div>
        </div>
    );
};

export default Payment;
