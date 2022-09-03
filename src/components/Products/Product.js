import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {

    const { _id, name, image, description, minimum, quantity, price } = product;

    return (
        <div>
            <div class="card card-compact bg-base-100 shadow-xl text-left">
                <div>
                    <figure><img src={image} className='object-cover' alt="Shoes" /></figure>
                </div>
                <div class="card-body">
                    <h2 class="card-title">{name}</h2>
                    <p className='text-2xl font-semibold'>${price}</p>
                    <p>{description}</p>
                    <div className='flex justify-between text-xl'>
                        <p className='text-left'>Min. Order: {minimum} pcs</p>
                        <p className='text-right'>{quantity} pcs left</p>
                    </div>
                    <div class="card-actions justify-end">
                        <Link to={`/purchase/${_id}`} class="btn btn-sm bg-gray-600 border-0">Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;