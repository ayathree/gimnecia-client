import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTrainers = () => {
    const axiosPublic = useAxiosPublic()
const {data: trainer=[], isPending:loading, refetch}=useQuery({
    queryKey:['trainer'],
    queryFn: async()=>{
        const res= await axiosPublic.get('/trainers')
        return res.data
    }
})

    return [trainer, loading, refetch]
};

export default useTrainers;