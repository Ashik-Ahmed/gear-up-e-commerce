import React, { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import Loading from '../../Shared/Loading/Loading';
import DeleteProductModal from './DeleteProductModal';
import ProductDetailsModal from './ProductDetailsModal';
import ProductRow from './ProductRow';

const ManageProducts = () => {

    const [modal, setModal] = useState();

    const [products, isLoading, refetch] = useProducts();

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='py-6 px-2'>
            <p className='text-xl font-bold text-cyan-600 text-left pb-2 pl-1'>Manage Products</p>
            <table class="table table-fixed table-compact table-zebra container mx-auto">
                <thead>
                    <tr>
                        <th className='bg-cyan-500'>Name</th>
                        <th className='invisible md:visible bg-cyan-500'>Price</th>
                        <th className='invisible md:visible bg-cyan-500'>Stock</th>
                        <th className='invisible md:visible bg-cyan-500'>Min. Order</th>
                        <th className='invisible md:visible bg-cyan-500'>Origin</th>
                        <th className='bg-cyan-500'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => <ProductRow key={product._id} product={product} setModal={setModal}></ProductRow>)
                    }
                    {

                        modal && <DeleteProductModal product={modal} refetch={refetch}></DeleteProductModal>

                    }
                    {

                        modal && <ProductDetailsModal product={modal} refetch={refetch}></ProductDetailsModal>

                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;