import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51L27hQBfaAM8tiFdMf9Wqlu7GMrnVRoWhcB3ExeKjfckg4c2ry7XMEVzVt7LcBa39D9k9bIdDgUY54cebVH3ngBN00iubBivaP');

const Payment = () => {

    const { id } = useParams();

    const { data: myOrder, isLoading, refetch } = useQuery('myOrder', () => fetch(`http://localhost:5000/order?id=${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authoruzation: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    // console.log(myOrder);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-full'>
            <div className="card w-1/2 bg-base-100 shadow-xl mx-auto mt-8">
                <div className="card-body">
                    <h2 className="card-title">Payment for Order <span className='text-red-500'>#{id.slice(0, 6)}</span></h2>
                    <p className='text-left'>Total Amount: $ {myOrder.amount}</p>

                    <div className='mt-8'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm myOrder={myOrder} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;