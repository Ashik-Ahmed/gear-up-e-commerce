import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddProduct = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const handleAddProduct = (data, e) => {
        const name = data.name;
        const category = data.category;
        const price = parseInt(data.price);
        const quantity = parseInt(data.quantity);
        const minimum = parseInt(data.minimum);
        const description = data.description;
        const image = data.image;


        const product = {
            name,
            category,
            price,
            quantity,
            minimum,
            description,
            image
        }
        // console.log(product);

        fetch('http://localhost:5000/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.insertedId) {
                e.target.reset()
                toast.success('Product Uploaded Successfully');
            }
        })
    }

    return (
        <div>
            <div className='mb-2'>
                <p className='text-2xl text-cyan-600 font-bold mt-4 p-1'>Add Product</p>
            </div>
            <div class="form-control w-full py-4 px-12 bg-white rounded">
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='flex gap-4'>
                        <div className=' w-2/3'>
                            <label class="label">
                                <span class="label-text">Product Name</span>
                            </label>
                            <input
                                type='text'
                                class="input input-bordered w-full"
                                placeholder="Product Name"
                                {...register("name", {
                                    required: true
                                })}
                            />
                        </div>

                        <div className='w-1/3'>
                            <label class="label">
                                <span class="label-text">Category</span>
                            </label>
                            <select
                                className='w-full select select-bordered'
                                {...register("category")
                                }>
                                <option value="">Select Category</option>
                                <option value="Local">Local</option>
                                <option value="Imported">Imported</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex w-full gap-4 mt-2'>
                        <div>
                            <label class="label">
                                <span class="label-text">Price</span>
                            </label>
                            <input
                                type='number'
                                class="input input-bordered"
                                placeholder="Price"
                                {...register("price", {
                                    required: true
                                })}
                            />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input
                                type='number'
                                class="input input-bordered"
                                placeholder="Quantity"
                                {...register("quantity", {
                                    required: true
                                })}
                            />
                        </div>
                        <div>
                            <label class="label">
                                <span class="label-text">Minimum Buying quantity</span>
                            </label>
                            <input
                                type='number'
                                class="input input-bordered"
                                placeholder="Min. buying quantity"
                                {...register("minimum", {
                                    required: true
                                })}
                            />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea
                            type='text'
                            class="textarea textarea-bordered w-full"
                            placeholder="Description"
                            {...register("description", {
                                required: true
                            })}
                        />
                    </div>

                    <div className='mt-2'>
                        <label class="label">
                            <span class="label-text">Product Photo Link</span>
                        </label>
                        <input
                            type='text'
                            class="input input-bordered w-full"
                            placeholder="Product Photo"
                            {...register("image", {
                                required: true
                            })}
                        />
                    </div>

                    <div className='w-full mt-2'>
                        <input type="submit" className='btn bg-cyan-500 hover:bg-cyan-600 border-0 w-1/3' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;