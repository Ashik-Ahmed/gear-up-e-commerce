import React from 'react';
import { useQuery } from 'react-query';
import UserRow from './UserRow';

const ManageUsers = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
            'content-type': 'application.json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    console.log(users);

    return (
        <div className='py-6 px-2'>
            <p className='text-xl font-bold text-cyan-600 text-left pb-2 pl-1'>Manage Users</p>
            <table class="table table-fixed table-compact table-zebra container mx-auto">
                <thead>
                    <tr>
                        <th className='bg-cyan-500'>Name</th>
                        <th className='invisible md:visible bg-cyan-500'>Email</th>
                        <th className='invisible md:visible bg-cyan-500'>Phone</th>
                        <th className='invisible md:visible bg-cyan-500'>Birthday</th>
                        <th className='bg-cyan-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => <UserRow key={user._id} user={user}></UserRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;