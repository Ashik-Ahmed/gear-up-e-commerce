import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import CancelOrderModal from '../MyOrders/CancelOrderModal';
import MyOrderRow from '../MyOrders/MyOrderRow';
import OrderDetailsModal from '../MyOrders/OrderDetailsModal';

const ManageOrders = () => {


    const [modal, setModal] = useState();

    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => fetch(`https://gear-up-ecommerce-server.onrender.com/orders`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    // const handleOrderSort = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.pay.value);


    // }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='py-6 px-2'>
            <div className='flex justify-between items-center mb-1'>
                <p className='text-xl font-bold text-cyan-600 text-left pb-2 pl-1'>Manage Orders</p>
                {/* <div className='mr-2'>
                    <form onSubmit={handleOrderSort} className="form-control w-full max-w-xs">
                        <div className='flex gap-2'>
                            <select name='pay' className="select select-sm select-bordered">
                                <option disabled selected>Payment</option>
                                <option value='Paid'>Paid</option>
                                <option>Unpaid</option>
                            </select>
                            <button type='submit' className='btn btn-sm bg-cyan-500 hover:bg-cyan-600 border-0'>Find</button>
                        </div>
                    </form>
                </div> */}
            </div>
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