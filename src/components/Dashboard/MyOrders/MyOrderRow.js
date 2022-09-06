import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import useDBUser from '../../../hooks/useDBUser';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../Shared/Loading/Loading';

const MyOrderRow = ({ myOrder, setModal }) => {

    const [authUser] = useAuthState(auth);
    const [dbUser, dbLoading] = useDBUser(authUser.email);

    const { _id, productId, productName, quantity, amount, payment, shipment, customerEmail, customerName, customerPhone, customerAddress } = myOrder;

    // const [product, isLoading] = useProduct(productId);

    const handleDelivered = (id) => {
        console.log('Delivered', id);




    }

    if (dbLoading) {
        return <Loading />
    }

    return (
        <tr>
            <td>{productName}</td>
            <td className='invisible md:visible'>{quantity}</td>
            <td className='invisible md:visible'>{amount}</td>
            <td className='invisible md:visible'>{payment ? 'Paid' : 'Pending'}</td>
            <td className='invisible md:visible'>{shipment || 'Pending'}</td>
            <td className='flex gap-x-3'>
                {
                    (!dbUser.role && !payment) && <Link to={`/dashboard/payment/${_id}`} className='btn btn-xs bg-teal-400 hover:bg-teal-600 border-0'>Pay</Link>
                }
                <label onClick={() => setModal(myOrder)} for="details-modal" className="btn btn-xs bg-indigo-400 hover:bg-indigo-600 border-0 modal-button">Details</label>
                {
                    !payment && <label onClick={() => setModal(myOrder)} for="delete-modal" class="btn btn-xs bg-red-400 hover:bg-red-600 border-0 modal-button">Cancel</label>
                }
                {
                    (dbUser.role && payment) && <button onClick={() => handleDelivered(_id)} className='btn btn-xs bg-teal-400 hover:bg-teal-600 border-0'>Delivered</button>
                }
            </td>
        </tr>
    );
};

export default MyOrderRow;