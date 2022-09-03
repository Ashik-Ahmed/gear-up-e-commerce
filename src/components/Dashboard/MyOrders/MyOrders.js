import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import CancelOrderModal from './CancelOrderModal';
import MyOrderRow from './MyOrderRow';

const MyOrders = () => {

    const [modal, setModal] = useState();

    const [authUser] = useAuthState(auth);

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => fetch(`http://localhost:5000/my-orders?email=${authUser.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))


    const handleOrderCancel = (id) => {
        console.log('Product deleted', id);

        fetch(`http://localhost:5000/delete-order?id=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accesToken')}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            toast.success('Order Canceled Successfully');
            refetch();
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='py-6 px-2'>
            <p className='text-xl font-bold text-cyan-600 text-left pb-2 pl-1'>My Orders</p>
            <table class="table table-fixed table-compact table-zebra container mx-auto">
                <thead>
                    <tr>
                        <th className='bg-cyan-500'>Name</th>
                        <th className='invisible md:visible bg-cyan-500'>Quantity</th>
                        <th className='invisible md:visible bg-cyan-500'>Total</th>
                        <th className='invisible md:visible bg-cyan-500'>Payment</th>
                        <th className='invisible md:visible bg-cyan-500'>Status</th>
                        <th className='bg-cyan-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders?.map(myOrder => <MyOrderRow key={myOrder._id} myOrder={myOrder} setModal={setModal}></MyOrderRow>)
                    }
                    {

                        modal && <CancelOrderModal myOrder={modal} handleOrderCancel={handleOrderCancel}></CancelOrderModal>

                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;