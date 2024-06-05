import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const FinalTrainers = () => {
    const axiosSecure=useAxiosSecure()
    const {data: trainers=[],refetch}=useQuery({
        queryKey:['trainers'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/confirmedTrainer');
            return res.data;
        }
    })
    return (
        <div>
            trainee:{trainers.length}
        </div>
    );
};

export default FinalTrainers;