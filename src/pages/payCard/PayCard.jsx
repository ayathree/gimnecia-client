import { useLoaderData } from "react-router-dom";


const PayCard = () => {
    const payDetails= useLoaderData()
    console.log(payDetails)
    return (
        <div>
            <h1>paycard</h1>
        </div>
    );
};

export default PayCard;