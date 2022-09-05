import React from 'react';

const ProductRow = ({ product, setModal }) => {

    const { name, price, category, description, quantity, minimum } = product;

    return (
        <tr>
            <td>{name}</td>
            <td className='invisible md:visible'>{price}</td>
            <td className='invisible md:visible'>{quantity}</td>
            <td className='invisible md:visible'>{minimum}</td>
            <td className='invisible md:visible'>{category}</td>
            <td className='flex gap-x-3'>
                <label onClick={() => setModal(product)} for="details-modal" className="btn btn-xs bg-indigo-400 hover:bg-indigo-600 border-0 modal-button">Details</label>
                <label onClick={() => setModal(product)} for="delete-modal" class="btn btn-xs bg-red-400 hover:bg-red-600 border-0 modal-button">Delete</label>
            </td>
        </tr>
    );
};

export default ProductRow;