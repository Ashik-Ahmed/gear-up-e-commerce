import React from 'react';
import useProducts from '../../hooks/useProducts';
import Loading from '../Shared/Loading/Loading';
import Product from './Product';

const Products = () => {

    const [products, isLoading, refetch] = useProducts();

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className=' py-8'>
            <div className='py-4 text-4xl font-bold'>
                <p className='inline border-black border-b-4'>Our Products</p>
            </div>
            <div className='md:grid grid-cols-3 gap-16 container mx-auto'>
                {
                    products.slice(0, 3).map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;