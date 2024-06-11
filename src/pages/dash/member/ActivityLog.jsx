import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const { data: pending = [] } = useQuery({
        queryKey: ['pending', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/feedTrainers/${user?.email}`);
            return res.data;
        }
    });

    const { data: rejected = [] } = useQuery({
        queryKey: ['rejected', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reject/${user?.email}`);
            return res.data;
        }
    });

    const handleEyeClick = (feedback) => {
        setFeedback(feedback);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
             <Helmet>
                <title>GYMNECIA | Activity log</title>
            </Helmet>
            {!pending && !rejected && (
                <p className="text-6xl font-bold">You Have Not Make Any Request Till Now </p>
            )}
            {pending?.status === 'pending' && (
                <p>Your request to become a trainer is <span className="text-blue-800 font-bold">{pending?.status}</span></p>
            )}
            {rejected?.status === 'rejected' && (
                <div>
                    <p>Your request to become a trainer is <span className="text-red-600 font-bold">{rejected?.status}</span></p>
                    <p>See the feedback <FaEye onClick={() => handleEyeClick(rejected?.feedback)} className="cursor-pointer inline" /></p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                        <div className="inline-block max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <h2 className="text-xl font-semibold leading-tight tracking-wide text-gray-800">
                                Feedback
                            </h2>
                            <p className="mt-2 text-gray-600">{feedback}</p>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={handleModalClose} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
