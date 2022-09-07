import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import useDBUser from '../../../hooks/useDBUser';
import Loading from '../../Shared/Loading/Loading';

const MyOrderRow = ({ myOrder, setModal, refetch }) => {
    console.log('Refetch:', refetch);

    const [authUser] = useAuthState(auth);
    const [dbUser, dbLoading] = useDBUser(authUser.email);

    const { _id, productId, productName, quantity, amount, payment, shipment, customerEmail, customerName, customerPhone, customerAddress } = myOrder;

    // const [product, isLoading] = useProduct(productId);

    const handleDelivered = (id) => {

        const updatedOrder = {
            shipping: 'Shipped'
        }
        fetch(`https://gear-up-ecommerce-server.onrender.com/update-shipping/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedOrder)
        }).then(res => res.json()).then(data => {
            console.log(data);
            refetch();
        })

    }

    if (dbLoading) {
        return <Loading />
    }

    return (
        <tr>
            <td>{productName}</td>
            <td className='invisible md:visible'>{quantity}</td>
            <td className='invisible md:visible'>{amount}</td>
            <td className='invisible md:visible'>{payment ? 'Paid' : <span className='text-red-500'>Pending</span>}</td>
            <td className='invisible md:visible'>{shipment || <span className='text-red-500'>Pending</span>}</td>
            <td className='flex gap-x-3'>
                {
                    (!dbUser.role && !payment) && <Link to={`/dashboard/payment/${_id}`} className='btn btn-xs bg-teal-400 hover:bg-teal-600 border-0'>Pay</Link>
                }
                <label onClick={() => setModal(myOrder)} for="details-modal" className="btn btn-xs bg-indigo-400 hover:bg-indigo-600 border-0 modal-button">Details</label>
                {
                    !payment && <label onClick={() => setModal(myOrder)} for="delete-modal" class="btn btn-xs bg-red-400 hover:bg-red-600 border-0 modal-button">Cancel</label>
                }
                {
                    (dbUser.role && payment && !shipment) && <button onClick={() => handleDelivered(_id)} className='btn btn-xs bg-teal-400 hover:bg-teal-600 border-0'>Delivered</button>
                }
            </td>
        </tr>
    );
};

export default MyOrderRow;