import { useState, useEffect } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAuth from "../../hook/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
// import { useQuery } from "@tanstack/react-query";

const Community = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth(); 
    const [forum, setForum] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        const fetchForum = async () => {
            try {
                const res = await axiosPublic.get('/forum');
                setForum(res.data);
            } catch (error) {
                console.error("Failed to fetch forum:", error);
            }
        };
        fetchForum();
    }, [axiosPublic]);

    const toggleExpand = (id) => {
        setExpandedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleUpvote = async (id) => {
        if (user) {
            try {
                await axiosPublic.post(`/forum/${id}/upvote`);
                setForum(prevForum => {
                    return prevForum.map(post => {
                        if (post._id === id) {
                            return { ...post, upvotes: post.upvotes + 1 };
                        }
                        return post;
                    });
                });
            } catch (error) {
                console.error("Failed to upvote:", error);
            }
        } else {
            Swal.fire("Warning", "need to login.", "warning");
        }
    };

    const handleDownvote = async (id) => {
        if (user) {
            try {
                await axiosPublic.post(`/forum/${id}/downvote`);
                setForum(prevForum => {
                    return prevForum.map(post => {
                        if (post._id === id) {
                            return { ...post, downvotes: post.downvotes + 1 };
                        }
                        return post;
                    });
                });
            } catch (error) {
                console.error("Failed to downvote:", error);
            }
        } else {
            Swal.fire("Warning", "need to login.", "warning");
        }
    };

    return (
        <div>
             <Helmet>
                <title>GYMNECIA | Community</title>
            </Helmet>
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
                                        
                                        <div className="flex items-center space-x-2 mt-3">
                                            <button 
                                                onClick={() => handleUpvote(item._id)} 
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Upvote
                                            </button>
                                            <span>{item.upvotes}</span>
                                            <button 
                                                onClick={() => handleDownvote(item._id)} 
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Downvote
                                            </button>
                                            <span>{item.downvotes}</span>
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
