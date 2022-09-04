import React from 'react';

const UserRow = ({ user }) => {
    const { name, email, phone, birthday, role } = user;

    const handleMakeAdmin = () => {
        console.log('Admin make');
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td className='invisible md:visible'>{email}</td>
            <td className='invisible md:visible'>{phone}</td>
            <td className='invisible md:visible'>{birthday}</td>
            <td className='flex gap-x-3'>
                {
                    role == 'admin' ? <p>Already an Admin</p>
                        :
                        <label onClick={handleMakeAdmin} for="details-modal" className="btn btn-xs bg-cyan-500 hover:bg-cyan-600 border-0 modal-button">Make Admin</label>
                }

            </td>
        </tr>
    );
};

export default UserRow;