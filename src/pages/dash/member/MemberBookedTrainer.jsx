import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MemberBookedTrainer = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: memberBooked = [] } = useQuery({
        queryKey: ['memberBooked', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedUser/${user?.email}`);
            return res.data;
        }
    });

    const openReviewModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const image = user.photoURL;
        const feedback = form.textarea.value;
        const data = { image, feedback };

        setIsModalOpen(false);

        axiosSecure.post('/review', data)
            .then(res => {
                if (res.data.insertedCount > 0) {
                    // Swal.fire("Success", "Your review has been submitted.", "success");
                }
                else{
                    Swal.fire("Success", "Your review has been submitted.", "success");
                }
            });
    };

    return (
        <div>
             <Helmet>
                <title>GYMNECIA | Booked trainers</title>
            </Helmet>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 justify-center">
                {
                    memberBooked.map(booked => (
                        <div key={booked._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{booked.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Class</span>: {booked.classes}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Slot Time</span>: {booked.slotTime}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Slot Name</span>: {booked.slotName}</p>
                            {
                                booked?.newslotName && 
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">New Slot Name</span>: {booked?.newslotName}</p>
                            }
                            {
                                booked?.newslotTime && 
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">New Slot Time</span>: {booked?.newslotTime}</p>
                            }
                            <button onClick={openReviewModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Review
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                        <div className="inline-block max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <h2 className="text-xl font-semibold leading-tight tracking-wide text-gray-800">
                                Review Section
                            </h2>
                            
                            <form onSubmit={handleReviewSubmit}>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                <textarea id="message" name="textarea" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={handleModalClose} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                                    <button type="submit" className="px-6 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-700">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberBookedTrainer;
