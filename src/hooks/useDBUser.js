import React from 'react';
import { useQuery } from 'react-query';

const useDBUser = (email) => {
    const { data: dbUser, isLoading, refetch } = useQuery('dbUser', () => fetch(`https://gear-up-ecommerce-server.onrender.com/user?email=${email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [dbUser, isLoading, refetch];
};

export default useDBUser;