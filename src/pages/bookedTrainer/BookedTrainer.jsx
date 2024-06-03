import { useLoaderData } from "react-router-dom";


const BookedTrainer = () => {
    const time =useLoaderData()
    return (
        <div>
            <h1>book trainer:{time.availableTime}</h1>
        </div>
    );
};

export default BookedTrainer;