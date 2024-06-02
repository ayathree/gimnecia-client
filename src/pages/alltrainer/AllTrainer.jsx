import { Link } from "react-router-dom";


const AllTrainer = () => {
    return (
        <div>
            <h1>All trainer</h1>
           <Link to={'/trainerDetails'}> <button>Trainer Details</button></Link>
        </div>
    );
};

export default AllTrainer;
