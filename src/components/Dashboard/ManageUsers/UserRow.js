import React from 'react';

const UserRow = ({ user, refetch }) => {
    const { name, email, phone, birthday, role } = user;

    const handleMakeAdmin = () => {

        const updatedUser = {
            role: 'admin'
        }


        // update the role to DB 
        fetch(`https://gear-up-ecommerce-server.onrender.com/create-user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedUser),
        }).then(res => res.json()).then(data => {
            refetch();
        })
    }

    return (
        <tr>
            <td>{name}</td>
            <td className='invisible md:visible'>{email}</td>
            <td className='invisible md:visible'>{phone}</td>
            <td className='invisible md:visible'>{birthday}</td>
            <td className='flex gap-x-3'>
                {
                    role === 'admin' ? <p>Already an Admin</p>
                        :
                        <label onClick={handleMakeAdmin} for="details-modal" className="btn btn-xs bg-cyan-500 hover:bg-cyan-600 border-0 modal-button">Make Admin</label>
                }

            </td>
        </tr>
    );
};

export default UserRow;