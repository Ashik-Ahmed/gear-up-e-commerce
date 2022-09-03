import React from 'react';
import { useQuery } from 'react-query';

const useProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('http://localhost:5000/products', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [products, isLoading, refetch];
};

export default useProducts;