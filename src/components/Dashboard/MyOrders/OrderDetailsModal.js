import React from 'react';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../Shared/Loading/Loading';

const OrderDetailsModal = ({ myOrder }) => {

    const [product, isLoading] = useProduct(myOrder.productId)

    console.log(product);

    const { quantity, amount } = myOrder;

    // if (isLoading) {
    //     return < Loading />
    // }

    return (
        <div className='bg-gray-200'>
            <input type="checkbox" id="details-modal" class="modal-toggle" />
            <div class="modal ">
                <div class="modal-box w-11/12 max-w-5xl md:bg-gray-200">
                    <label for="details-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <section class="text-gray-600 body-font overflow-hidden text-left">
                            <div class="container px-5 mx-auto md:flex w-full">
                                <div class="text-left mx-auto border-r-4 md:w-1/2 pr-4">
                                    <img alt="Product" class="max-w-md max-h-md object-center rounded" src={product?.image} />
                                    {/* <div class="w-full mt-6 lg:mt-0">
                                        <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.supplier}</h2>
                                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>

                                        <p class="leading-relaxed">{product.description}</p>
                                        <div class="flex">
                                            <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                                            <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>

                                <div className=' md:w-1/2 pl-4'>
                                    <p className='text-xl font-bold'>Order Number <span className='text-red-500'>#{myOrder._id.slice(0, 6)}</span> </p>

                                    <div>
                                        <div class="overflow-x-auto rounded-lg">
                                            <div className='mt-2 md:bg-white pl-4 py-2 rounded'>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Product</p>
                                                    <p className=' w-1/2 p-1 items-center'>: {product?.name}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Order Date</p>
                                                    <p className=' w-1/2 p-1 items-center'>: {myOrder.date || '10-Sept-2022'}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Payment Status</p>
                                                    <p className=' w-1/2 p-1 items-center'>: {myOrder.payment || 'Pending'}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Shipment Status</p>
                                                    <p className=' w-1/2 p-1 items-center'>: {myOrder.shipment || 'Pending'}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Unit Price</p>
                                                    <p className=' w-1/2 p-1 items-center'>: $ {product?.price}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Quantity</p>
                                                    <p className=' w-1/2 p-1 items-center'>: {myOrder.quantity} pcs</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className=' w-1/2 p-1 items-center font-semibold'>Total</p>
                                                    <p className=' w-1/2 p-1 items-center'>: $ {myOrder.amount}</p>
                                                </div>
                                            </div>
                                            <div className='mt-2 p-2 rounded bg-white'>
                                                <p className='text-lg font-semibold text-black mb-2'>Customer Information</p>
                                                <div className='flex pl-4'>
                                                    <p className='w-1/2 font-semibold'>Name </p>
                                                    <p>: {myOrder.customerName}</p>
                                                </div>
                                                <div className='flex pl-4'>
                                                    <p className='w-1/2 font-semibold'>Phone </p>
                                                    <p>: {myOrder.customerPhone}</p>
                                                </div>
                                                <div className='flex pl-4'>
                                                    <p className='w-1/2 font-semibold'>Shipping Address</p>
                                                    <p>: {myOrder.customerAddress}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-action">
                        {/* <label for="details-modal" class="btn">Yay!</label> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;