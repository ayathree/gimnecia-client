import Swal from "sweetalert2";

import useAxiosPublic from "../hook/useAxiosPublic";


const HomeNews = () => {
    const axiosPublic = useAxiosPublic()
    const handleNews = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value
        

        const newsInfo = { name, email };
        console.log(newsInfo);

        axiosPublic.post('/news', newsInfo)
        .then(res=>{
            console.log(res.data)
            console.log('added')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have successfully subscribed",
                showConfirmButton: false,
                timer: 1500
              });

            form.reset()
        })
        .catch(error=>{
            console.log(error.message)
        })
    };
    return (
        <div>
        <section className="flex flex-col  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
<div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-400 md:dark:bg-gray-800">
    <div className="px-6 py-6 md:px-8 md:py-0">
        <h2 className="text-3xl font-bold text-black dark:text-white ">Sign Up For Updates</h2>

        <p className="mt-2 text-sm text-black dark:text-gray-400 ">Sign up or subscribe now for the latest updates</p>
    </div>
</div>

<div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
    <form onSubmit={handleNews}>
        <div className="flex flex-col gap-5 p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
        <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="name" placeholder="Enter your name" aria-label="Enter your name" required/>

            <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="email" name="email" placeholder="Enter your email" aria-label="Enter your email" required/>

            <button className="px-4 py-3 text-sm font-medium tracking-wider text-black uppercase transition-colors duration-300 transform bg-gray-400 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Subscribe Now</button>
        </div>
    </form>
</div>
</section>
        
    </div>
    );
};

export default HomeNews;