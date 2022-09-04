import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import CancelOrderModal from '../MyOrders/CancelOrderModal';
import MyOrderRow from '../MyOrders/MyOrderRow';
import OrderDetailsModal from '../MyOrders/OrderDetailsModal';

const ManageOrders = () => {


    const [modal, setModal] = useState();

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => fetch(`http://localhost:5000/orders`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='py-6 px-2'>
            <p className='text-xl font-bold text-cyan-600 text-left pb-2 pl-1'>Manage Orders</p>
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

                        modal && <CancelOrderModal myOrder={modal} refetch={refetch}></CancelOrderModal>

                    }
                    {

                        modal && <OrderDetailsModal myOrder={modal}></OrderDetailsModal>

                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;