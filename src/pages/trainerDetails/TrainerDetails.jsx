import { Link } from "react-router-dom";


const TrainerDetails = () => {
    return (
        <div>
            <h1>trainer details</h1>
            <Link to={'/beATrainer'}><button>Be a trainer</button></Link>
            
        </div>
    );
};

export default TrainerDetails;