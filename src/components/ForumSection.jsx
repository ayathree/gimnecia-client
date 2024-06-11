import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";

const ForumSection = () => {
    const axiosPublic = useAxiosPublic();
    const { data: forums = [] } = useQuery({
        queryKey: ['forums'],
        queryFn: async () => {
            const res = await axiosPublic.get('/forum');
            return res.data;
        }
    });

    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleExpand = (id) => {
        setExpandedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
            <div className="container p-6 mx-auto space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        forums.slice(0, 6).map(forum => (
                            <article key={forum._id} className="flex flex-col dark:bg-gray-50">
                                <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                    <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={forum.image} />
                                </a>
                                <div className="flex flex-col flex-1 p-6">
                                    <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{forum.title}</h3>
                                    <p>
                                        {expandedPosts[forum._id] ? forum.detail : `${forum.detail.slice(0, 50)}...`}
                                        {forum.detail.length > 50 && (
                                            <button
                                                onClick={() => toggleExpand(forum._id)}
                                                className="text-blue-500 hover:underline ml-1"
                                            >
                                                {expandedPosts[forum._id] ? "See Less" : "See More"}
                                            </button>
                                        )}
                                    </p>
                                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                                        <span className="font-bold text-green-500">Upvotes: {forum.upvotes || 0}</span>
                                        <span className="font-bold text-red-500">Downvotes: {forum.downvotes || 0}</span>
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ForumSection;
