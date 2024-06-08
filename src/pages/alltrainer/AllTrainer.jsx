import { Link } from "react-router-dom";
import useTrainers from "../../hook/useTrainers";
import { IoShareSocialSharp } from "react-icons/io5";
import useMember from "../../hook/useMember";


const AllTrainer = () => {
    const[trainer]=useTrainers()
    const [isMember] = useMember()
    return (
        <div className="mt-24">
            <h1>All trainer:{trainer.length}</h1>
           <Link to={'/trainerDetails'}> <button>Trainer Details</button></Link>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {
                trainer.map(item=><div key={item._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        
                        <div className="flex flex-col items-center py-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={item.image} alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium  ">{item.name}</h5>
                            <span className="text-sm "> <span className="font-semibold">Experience</span> :{item.experience}</span>
                            <span className="text-sm font-semibold ">Available On</span> 

                            <a className="text-center"
                            href={item.socialIcon}><IoShareSocialSharp />  </a> 
                            <span className="text-sm "> <span className="font-semibold">Available Slot</span> :{item.slotName} {item.slotTime}</span>
                            <div className=" mt-4 md:mt-6">
                               {
                                isMember && <Link to={`/trainerDetails/${item._id}`}> <button  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Know more</button></Link>
                               }
                                
                            </div>
                        </div>
                    </div>
                    )
            }
           </div>
        </div>
    );
};

export default AllTrainer;
