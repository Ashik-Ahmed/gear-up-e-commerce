import React from 'react';
import { useQuery } from 'react-query';

const useProduct = (id) => {
    const { data: product, isLoading, refetch } = useQuery('product', () => fetch(`https://gear-up-ecommerce-server.onrender.com/product/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [product, isLoading, refetch];
};

export default useProduct;