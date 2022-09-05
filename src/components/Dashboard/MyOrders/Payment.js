import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Payment = () => {

    const { id } = useParams();

    const { data: myOrder, isLoading, refetch } = useQuery('myOrder', () => fetch(`http://localhost:5000/order?id=${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authoruzation: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    console.log(myOrder);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Payment for Order <span className='text-red-500'>#{id.slice(0, 6)}</span></h2>
                        <p>Total Amount: {myOrder.amount}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;