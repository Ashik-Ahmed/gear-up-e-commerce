import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import useProduct from '../../hooks/useProduct';
import Loading from '../Shared/Loading/Loading';

const Purchase = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isDBLoading] = useDBUser(authUser.email);
    const { id } = useParams();
    const [product, isLoading, refetch] = useProduct(id);

    if (isLoading || isDBLoading) {
        return <Loading />
    }

    const { _id, name, image, description, minimum, quantity, price } = product;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const orderQuantity = parseInt(e.target.quantity.value);
        const name = e.target.name.value || dbUser.name;
        const phone = e.target.phone.value || dbUser.phone;
        const address = e.target.address.value;

        if (orderQuantity >= minimum && orderQuantity <= quantity) {

            const orderDetails = {
                productId: _id,
                quantity: orderQuantity,
                amount: orderQuantity * parseInt(price),
                payment: 'pending',
                customerEmail: authUser.email,
                customerName: name,
                customerPhone: phone,
                customerAddress: address,

            }

            console.log(orderDetails);

            fetch('http://localhost:5000/confirm-purchase', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            }).then(res => res.json()).then(data => {
                if (data.acknowledged === true) {
                    toast.success('Order Placed successfully');

                    //update product quantity
                    const updatedProduct = {
                        quantity: parseInt(quantity) - orderQuantity,
                    }

                    fetch(`http://localhost:5000/update-product/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            e.target.reset();
                        })
                }
            })
        }
        else {
            alert('Quantity not matched')
        }
    }

    return (
        <div className='py-4 bg-gray-200'>

            <section class="text-gray-600 body-font overflow-hidden text-left">
                <div class="container px-2 py-4 mx-auto flex flex-shrink">
                    <div class="w-1/2 mx-auto pr-6">
                        <img alt="ecommerce" class="lg:w-1/2 w-full h-52 object-center rounded" src={image} />
                        <div class="w-full lg:py-6 mt-6 lg:mt-0">
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                            <div class="flex mb-4">
                                <span class="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-cyan-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span class="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span class="flex ml-3 pl-3 py-2 border-l-2 border-cyan-500 space-x-2s">
                                    <h2 class="text-sm title-font text-gray-500 tracking-widest">Min. Order: {minimum}pcs</h2>
                                </span>
                            </div>
                            <div className='flex justify-between w-1/2 mb-2'>
                                <span class="title-font font-medium text-2xl text-gray-900">${price}</span>
                                <span class="title-font font-medium text-2xl text-gray-900 text-right">Stock: {quantity}pcs</span>
                            </div>
                            <p class="leading-relaxed">{description}</p>

                        </div>
                    </div>

                    <div className='text-left border-l-2 border-cyan-500 w-1/2 pl-6 '>
                        <form onSubmit={handlePlaceOrder}>
                            <p className='text-xl font-bold text-cyan-600'>Order Information</p>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                <div class="flex items-center gap-2">
                                    <p>Quantity</p>
                                    <div class="form-control">
                                        <input name='quantity' type="number" placeholder={minimum} class="input input-sm input-bordered" required />
                                    </div>
                                </div>
                                <div class="flex ml-6 items-center">
                                    <span class="mr-3">Size</span>
                                    <div class="relative mr-4">
                                        <select class="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex ml-4">
                                    <span class="mr-3">Color</span>
                                    <button class="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button class="border-2 border-gray-300 ml-1 bg-cyan-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                            </div>

                            <div>
                                <p className='text-xl font-bold text-cyan-600'>Shipping Information</p>
                                <div className='flex mt-6'>
                                    <div className='w-1/2'>
                                        <div className='mb-4'>
                                            <p>Name</p>
                                            <input name='name' type="text" placeholder={dbUser.name || 'Name'} className='input input-bordered w-3/4' />
                                        </div>
                                        <div>
                                            <p>Phone Number</p>
                                            <input name='phone' type="text" placeholder={dbUser.phone || 'Phone Number'} className='input input-bordered w-3/4' />
                                        </div>
                                    </div>
                                    <div className='w-1/2'>
                                        <p>Address</p>
                                        <textarea name='address' type="text" placeholder='Address' className='textarea textarea-bordered w-full h-36' required />
                                    </div>
                                </div>
                            </div>

                            <div className='md:mt-12'>
                                <button type='submit' className='btn bg-cyan-600 hover:bg-cyan-700 border-0 w-full'>Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Purchase;