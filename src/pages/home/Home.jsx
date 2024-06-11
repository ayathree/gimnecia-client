
import img1 from '../../assets/yoga.jpg'
import img2 from '../../assets/zumba.jpg'
import img3 from '../../assets/facilities.webp'
import img4 from '../../assets/Thetrainer.jpg'
import HomeNews from '../../components/HomeNews';
import Featuredsection from '../../components/Featuredsection';
import ReviewSection from '../../components/ReviewSection';
import ForumSection from '../../components/ForumSection';
import Team from '../../components/Team';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
             <Helmet>
                <title>GYMNECIA | Home</title>
            </Helmet>
            
            <div className="p-6 mt-24 bg-gray-400 py-12 dark:bg-violet-600 dark:text-gray-50">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold">
                The best Gym Near 
				<br  className="sm:hidden" />
                To You
			</h2>
			
			<Link to={'/allClasses'}><a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">See classes</a></Link>
		</div>
	</div>
</div>
{/* featured */}
<div className='mt-24'>
<section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 bg-gray-400 capitalize lg:text-3xl dark:text-white">Key Benefits from our gym</h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div className="lg:flex">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={img1} alt=""/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <h1 className='text-3xl font-semibold'>Yoga</h1>
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                       Best Yoga classes taken by best trainers
                    </a>
                    
                    
                </div>
            </div>

            <div className="lg:flex">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={img2} alt=""/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                <h1 className='text-3xl font-semibold'>Zumba with fun</h1>
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                       Best zumba classes with fun and friendly environment
                    </a>

                    
                </div>
            </div>

            <div className="lg:flex">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={img3} alt=""/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                <h1 className='text-3xl font-semibold'>Best facilities</h1>
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                       Has a best facilities and collection of better equipments
                    </a>

                   
                </div>
            </div>

            <div className="lg:flex">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={img4} alt=""/>

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                <h1 className='text-3xl font-semibold'>Supportive trainers</h1>
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        All the trainers are very supportive
                    </a>

                  
                </div>
            </div>

            

            
        </div>
    </div>
</section>

</div>
{/* booked class */}
<h1 className='text-2xl text-center bg-gray-400 font-bold mt-24'>Some booked class of our gym</h1>
<div className='mt-24'>
<Featuredsection></Featuredsection>
</div>
{/* review */}
<h1 className='text-2xl text-center bg-gray-400 font-bold mt-24'>Reviews of the members</h1>
<div className='mt-24'>
<ReviewSection></ReviewSection>
</div>
{/* forum */}
<h1 className='text-2xl text-center bg-gray-400  font-bold mt-24'>Latest forums from our community</h1>
<div className='mt-24'>
<ForumSection></ForumSection>
</div>
{/* newsLetter */}
<h1 className='text-2xl text-center bg-gray-400  font-bold mt-24'>News Letter Subscription</h1>
<div className='mt-24'>
    <HomeNews></HomeNews>
</div>
{/* team */}
<h1 className='text-2xl text-center bg-gray-400  font-bold mt-24'>Our Teams</h1>
<div className='mt-24'>
  <Team></Team>  
</div>




            
        </div>
    );
};

export default Home;