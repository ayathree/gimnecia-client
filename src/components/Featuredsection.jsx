import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";


const Featuredsection = () => {
    const axiosPublic = useAxiosPublic()
    const { data: feature = [] } = useQuery({
        queryKey: ['feature'],
        queryFn: async () => {
            const res = await axiosPublic.get('/booked');
            return res.data;
        }
    });
    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-5 justify-center'>
            
{
    feature.slice(0,6).map(fea=><a key={fea._id} href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{fea.classes}</h5>
       <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" >Package : {fea.package}</h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">{fea.classes} is the most famous class among our gym classes.Our classes are taken by our expert trainers.</p>
        </a>)
}

            
        </div>
    );
};

export default Featuredsection;