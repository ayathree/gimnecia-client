import { useLoaderData } from "react-router-dom";


const Payment = () => {
    const payment=useLoaderData()
    console.log(payment)
    return (
        <div>

           <h1>payment</h1> 
        </div>
    );
};

export default Payment;
