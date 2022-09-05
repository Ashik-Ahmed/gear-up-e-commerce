import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify';

const DeleteProductModal = ({ product, refetch }) => {

    const handleProductDelete = (id) => {

        fetch(`http://localhost:5000/delete-product?id=${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            toast.success('Product Deleted')
            refetch();
        })
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
                        <label onClick={() => handleProductDelete(product._id)} for="delete-modal" class="btn bg-red-500 border-0">Yes</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;