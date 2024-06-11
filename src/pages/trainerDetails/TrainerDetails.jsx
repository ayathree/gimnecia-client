import { Helmet } from "react-helmet-async";
import { Link, useLoaderData,  } from "react-router-dom";





const TrainerDetails = () => {
    const details = useLoaderData();
    console.log(details)
    
    
    return (
        <div className="mt-24">
             <Helmet>
                <title>GYMNECIA | Trainer details</title>
            </Helmet>
            <div>
            <div className="p-6 py-12 bg-gray-400 dark:bg-violet-600 dark:text-gray-50">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold">Become a 
				<br  className="sm:hidden" />Trainer
			</h2>
			
            <Link to={'/beATrainer'}><button rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block text-xl dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">Be a trainer</button></Link>
		</div>
	</div>
</div>
           
            </div>
            <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container grid gap-6 justify-around mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
		<div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-3 dark:bg-gray-50">
			
			<h1 className="text-5xl font-extrabold dark:text-gray-900">Available Slot</h1>
			<p className="my-8">
				<span className="font-medium dark:text-gray-900">Available Time for a trainer when he/she can take your classes.</span>
                <span className="font-medium dark:text-gray-900">Click the slot for book a Trainer</span>
			</p>
			<form noValidate="" action="" className="self-stretch space-y-3">
				
				{
                    details?.days?.map(day=><Link key={day.id} to={`/bookedTrainer/${details?.email}`}><button type="button"  className="w-full mb-5 py-2 font-semibold bg-gray-500 rounded text-white dark:bg-violet-600 dark:text-gray-50">{day} {details?.slotTime} </button></Link>)
                }
                {
                    details?.newdays?.map(day=><Link key={day.id} to={`/bookedTrainer/${details?.email}`}><button type="button"  className="w-full mb-5 py-2 font-semibold bg-gray-500 rounded text-white dark:bg-violet-600 dark:text-gray-50">{day} {details?.newslotTime} </button></Link>)
                }
			</form>
		</div>
		<div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16  dark:bg-gray-50 xl:col-span-2 ">
           
        <img src={details.image} alt="" className=" w-full h-[300px]  rounded-md  dark:bg-gray-500" />
        <div className="w-full mt-10">
        <h1 className="text-xl font-semibold">Trainer Name : {details.name}</h1>
        <h1 className="text-xl font-semibold">Age : {details.age}</h1>
        
        {
            details?.slotName && <h1 className="text-xl font-semibold">Slot Name : {details?.slotName}</h1>
        }
        {
           details?.newslotName && <h1 className="text-xl font-semibold">Slot Name : {details?.newslotName}</h1> 
        }
        <h1 className="text-xl font-semibold">Expertise : </h1>
        <div>
            <p>{details.skills?.[0]}</p>
            <p>{details.skills?.[1]}</p>
            <p>{details.skills?.[2]}</p>
            <p>{details.skills?.[3]}</p>

        </div>
        
        </div>
        
        </div>
	</div>
</section>
            
        </div>
    );
};

export default TrainerDetails;