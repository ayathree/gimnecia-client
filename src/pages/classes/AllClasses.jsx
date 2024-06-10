import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { Link } from "react-router-dom";

const AllclassNamees = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trainers = [] } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/confirmedTrainer');
            return res.data;
        }
    });
    const { data: upcoming = [] } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await axiosPublic.get('/newClass');
            return res.data;
        }
    });

    // Group trainers by classT
    const classGroups = trainers.reduce((groups, trainer) => {
        trainer.classT.forEach((clas) => {
            if (!groups[clas]) {
                groups[clas] = [];
            }
            groups[clas].push(trainer);
        });
        return groups;
    }, {});

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center">
            {Object.keys(classGroups).map((className) => (
                <div key={className} className="mb-6 mt-24 p-10 bg-slate-300">
                    <h2 className="text-2xl font-bold mb-4">{className}</h2>
                    <p>Trainers who took this class...</p>
                    <div className="flex flex-wrap">
                        {classGroups[className].map((trainer) => (
                            <div key={trainer._id} className="m-2">
                                <Link to={`/trainerDetails/${trainer._id}`}><img 
                                    className="w-16 h-16 rounded-full object-cover" 
                                    src={trainer.image} 
                                    alt={trainer.name} 
                                    title={trainer.name} 
                                /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <h1 className="text-center font-bold text-2xl mt-24">Upcoming Classes...</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 justify-center mt-24">
            {
                upcoming.map(up=><div key={up._id} className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <img src={up.image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                            
                        </div>
                        <div className="space-y-2">
                            <a rel="noopener noreferrer" href="#" className="block">
                                <h3 className="text-xl font-semibold dark:text-violet-600">{up.classD}</h3>
                            </a>
                            <p className="leading-snug dark:text-gray-600">{up.detail}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>


        </div>
    );
};

export default AllclassNamees;
