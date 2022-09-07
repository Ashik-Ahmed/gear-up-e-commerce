import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Loading from '../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ myOrder }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const navigate = useNavigate();

    const { amount, customerName, customerEmail } = myOrder;

    useEffect(() => {

        fetch(`https://gear-up-ecommerce-server.onrender.com/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearr ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ amount })
        }).then(res => res.json()).then(data => {
            // console.log(data.client_secret);
            if (data?.client_secret) {
                setClientSecret(data.client_secret);
            }
        })

    }, [amount])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);


        // confirm card payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: customerEmail
                    },
                },
            },
        );

        console.log(paymentIntent);
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }

        else {
            setCardError('');
            setSuccess('Payment Successful..!')
            setTransactionId(paymentIntent.id);

            // update order payment status to DB
            const payment = {
                transactionId: paymentIntent.id
            }
            fetch(`https://gear-up-ecommerce-server.onrender.com/order-payment/${myOrder._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json()).then(data => {
                setProcessing(false);
                // console.log(data);
            })
            // navigate('/dashboard/my-orders');
        }
    }


    // if (processing) {
    //     return <Loading />
    // }

    return (
        <div>
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
                <button type="submit" disabled={!stripe || !clientSecret} className='btn btn-info btn-sm mt-6 w-1/2'>Pay</button>
            </form>
            {
                cardError && <p className='text-error'>{cardError}</p>
            }
            {
                success && <div className='text-info'>
                    <p>{success}</p>
                    <p>Trx. Id: {transactionId}</p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;