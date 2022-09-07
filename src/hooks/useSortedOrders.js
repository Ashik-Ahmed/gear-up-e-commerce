import React from 'react';
import { useQuery } from 'react-query';

const useSortedOrders = (payment) => {
    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => fetch(`https://gear-up-ecommerce-server.onrender.com/orders/${payment}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [myOrders, isLoading, refetch];
};

export default useSortedOrders;