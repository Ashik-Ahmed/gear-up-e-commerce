import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import CancelOrderModal from './CancelOrderModal';
import MyOrderRow from './MyOrderRow';
import OrderDetailsModal from './OrderDetailsModal';

const MyOrders = () => {

    const [modal, setModal] = useState(null);

    const [authUser] = useAuthState(auth);

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => fetch(`https://gear-up-ecommerce-server.onrender.com/orders?email=${authUser.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    // const handleOrderCancel = (id) => {
    //     console.log('Product deleted', id);

    //     fetch(`https://gear-up-ecommerce-server.onrender.com/delete-order?id=${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('accesToken')}`
    //         }
    //     }).then(res => res.json()).then(data => {
    //         console.log(data);
    //         toast.success('Order Canceled Successfully');
    //         refetch();

    //         fetch(`https://gear-up-ecommerce-server.onrender.com/update-product/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(updatedProduct)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 // e.target.reset();
    //             })
    //     })
    // }

    if (isLoading) {
        return <Loading />
    }

    // console.log(myOrders);

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
                        <th className='invisible md:visible bg-cyan-500'>Shipment</th>
                        <th className='bg-cyan-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders?.map(myOrder => <MyOrderRow key={myOrder._id} myOrder={myOrder} setModal={setModal} refetch={refetch}></MyOrderRow>)
                    }
                    {

                        modal && <CancelOrderModal myOrder={modal} refetch={refetch}></CancelOrderModal>

                    }
                    {

                        modal && <OrderDetailsModal myOrder={modal} setModal={setModal}></OrderDetailsModal>

                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;