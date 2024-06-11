import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';


const ReviewSection = () => {
    const axiosPublic = useAxiosPublic()
    const { data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review');
            return res.data;
        }
    });
    return (
        <>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {
            review.map(re=><SwiperSlide key={re._id}>
                <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div className="flex justify-center -mt-16 md:justify-end">
        <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={re.image}/>
    </div>

    <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Reviews from our members</h2>

    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">{re.feedback}</p>

    
</div>
            </SwiperSlide>)
          }
          
        </Swiper>
      </>
    
    );
};

export default ReviewSection;