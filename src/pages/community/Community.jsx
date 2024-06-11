import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hook/useAxiosPublic";

const Community = () => {
    const axiosPublic = useAxiosPublic();
    const [expandedPosts, setExpandedPosts] = useState({});

    const { data: forum = [] } = useQuery({
        queryKey: ['forum'],
        queryFn: async () => {
            const res = await axiosPublic.get('/forum');
            return res.data;
        }
    });

    const toggleExpand = (id) => {
        setExpandedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
                <div className="container p-6 mx-auto space-y-8">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold">Our community/forum page</h2>
                        <p className="font-serif text-sm dark:text-gray-600">Posted for our community which is growing fast day by day</p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {
                            forum.map(item => (
                                <article key={item._id} className="flex flex-col dark:bg-gray-50">
                                    <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                        <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={item.image} />
                                    </a>
                                    <div className="flex flex-col flex-1 p-6">
                                        <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                                        <p className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">
                                            Posted by : <span className="bg-amber-400 p-1">{item.users}</span>
                                        </p>
                                        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug mt-5">{item.title}</h3>
                                        <p>
                                            {expandedPosts[item._id] ? item.detail : item.detail.slice(0, 50)}
                                            {item.detail.length > 50 && (
                                                <button
                                                    onClick={() => toggleExpand(item._id)}
                                                    className="text-blue-500 hover:underline ml-1"
                                                >
                                                    {expandedPosts[item._id] ? "See Less" : "See More"}
                                                </button>
                                            )}
                                        </p>
                                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                                            <span>June 1, 2020</span>
                                            <span>2.1K views</span>
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Community;
