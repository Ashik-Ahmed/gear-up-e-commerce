import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Shared/Loading/Loading';

const Product = ({ product }) => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isLoading] = useDBUser(authUser?.email);
    console.log(dbUser);

    const { _id, name, image, description, category, minimum, quantity, price } = product;

    // if (isLoading) {
    //     return <Loading />
    // }

    return (
        <div class="p-4 w-full text-left bg-white rounded">
            <div class="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={image} />
            </div>
            <div class="mt-4">
                <div className='flex'>
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 pr-2 border-r-2 ">{category || 'CATEGORY'}</h3>
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 pl-2"> Min. Order: {minimum}</h3>
                </div>
                <h2 class="text-gray-900 title-font text-lg font-medium">{name}</h2>
                <p class="mt-1 text-xl">$ {price}</p>
            </div>
            <div class="card-actions justify-end">
                {
                    dbUser?.role ?
                        <Link to={`dashboard/update-product/${_id}`} class="btn btn-sm bg-cyan-500 hover:bg-cyan-600 border-0">Update</Link>
                        :
                        <Link to={`/purchase/${_id}`} class="btn btn-sm bg-cyan-500 hover:bg-cyan-600 border-0">Buy Now</Link>
                }
            </div>
        </div>

        // <div>
        //     <div class="card card-compact bg-base-100 shadow-xl text-left">
        //         <div>
        //             <figure><img src={image} className='object-cover' alt="Shoes" /></figure>
        //         </div>
        //         <div class="card-body">
        //             <h2 class="card-title">{name}</h2>
        //             <p className='text-2xl font-semibold'>${price}</p>
        //             <p>{description}</p>
        //             <div className='flex justify-between text-xl'>
        //                 <p className='text-left'>Min. Order: {minimum} pcs</p>
        //                 <p className='text-right'>{quantity} pcs left</p>
        //             </div>
        //             <div class="card-actions justify-end">
        //                 <Link to={`/purchase/${_id}`} class="btn btn-sm bg-gray-600 border-0">Buy Now</Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Product;