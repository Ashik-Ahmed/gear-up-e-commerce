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
        // <div className=' py-8'>
        //     <div className='py-4 text-4xl font-bold'>
        //         <p className='inline border-white border-b-2'>Our Products</p>
        //     </div>
        //     <div className='md:grid grid-cols-3 gap-8 container mx-auto'>
        //         {
        //             products.slice(0, 3).map(product => <Product key={product._id} product={product}></Product>)
        //         }
        //     </div>
        // </div>

        <div className=' py-8'>
            <div className='py-4 text-4xl font-bold'>
                <p className='inline border-white border-b-2'>Our Products</p>
            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-6 mx-auto">
                    <div class="md:grid grid-cols-4 -m-4 gap-4">
                        {
                            products.slice(0, 4).map(product => <Product key={product._id} product={product} ></Product>)
                        }
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Products;