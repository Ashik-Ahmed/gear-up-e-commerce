import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../Shared/Loading/Loading';

const CancelOrderModal = ({ myOrder, refetch }) => {
    console.log(refetch);

    const [product, isLoading] = useProduct(myOrder.productId);

    // console.log(myOrder);

    const updatedProduct = { quantity: myOrder?.quantity + product?.quantity };

    // console.log(updatedProduct);

    const handleOrderCancel = (orderId, productId) => {

        fetch(`https://gear-up-ecommerce-server.onrender.com/delete-order?id=${orderId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accesToken')}`
            }
        }).then(res => res.json()).then(data => {
            // console.log(data);
            toast.success('Order Canceled Successfully');
            refetch();

            fetch(`https://gear-up-ecommerce-server.onrender.com/update-product/${productId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // e.target.reset();
                })
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <input type="checkbox" id="delete-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box text-center">
                    <div>
                        <span className='text-5xl text-red-500 flex justify-center border-2 rounded-full w-min mx-auto bg-gray-200  p-2'> <RiDeleteBinLine /> </span>
                    </div>
                    <h3 class="font-bold text-lg">You are about to cancel your order</h3>
                    <div className='flex gap-4 items-center justify-center my-2'>
                        <img src={product.image} alt="product" className='w-24 h-24 ' />
                        <p className='text-lg font-semibold'>{product.name}</p>
                    </div>
                    <p class="py-4 text-gray-500 font-bold">Are you sure?</p>
                    <div class="modal-action">
                        <label for="delete-modal" class="btn">No</label>
                        <label onClick={() => handleOrderCancel(myOrder._id, product._id)} for="delete-modal" class="btn bg-red-500 border-0">Yes</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderModal;