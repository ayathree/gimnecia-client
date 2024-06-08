import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({payDetails}) => {
    const[error, setError]= useState('')
    const{user}=useAuth()
    const stripe = useStripe()
    const [clientSecret, setClientSecret]= useState('')
    const[transactionId, setTransactionId]=useState('')
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const price = payDetails.price
    console.log(payDetails)

    useEffect(()=>{
        if (price > 0) {
         axiosSecure.post('/create-payment-intent', {price: price})
         .then(res=>{
             console.log(res.data.clientSecret)
             setClientSecret(res.data.clientSecret)
         })
         
        }
     },[axiosSecure, price])

     // confirm payment
     

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            return
            
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
            
        }

        const {error, paymentMethod}= await stripe.createPaymentMethod({
            type:'card',
            card

        })
       
        if (error) {
            console.log('payment error', error)
            setError(error.message)
            
        }
        else{
            console.log('payment method', paymentMethod)
            setError('')
        }
        const {paymentIntent, error:confirmError}= await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card : card,
                billing_details :{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
    
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
            
        }
        else{
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                
                const payment={
                    email : user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    slotTime : payDetails.slotTime,
                    slotName: payDetails.slotName,
                    slotId : payDetails.slotId,
                    statusBook : payDetails.statusBook,
                    
                     classes:payDetails.classes,
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log('payment saved',res.data)
                
               
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    
                    
                }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
        <CardElement
    options={{
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }}
  />
  
  <button type="submit" disabled={!stripe || !clientSecret} className="text-white bg-green-400 mt-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
  <p className="text-red-600">{error}</p>
  {
    transactionId && <p className="text-green-600">Your transaction id : {transactionId}</p>
  }

    </form>
    );
};

export default CheckoutForm;