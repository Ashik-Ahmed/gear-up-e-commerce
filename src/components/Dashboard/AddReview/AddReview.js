import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useDBUser from '../../../hooks/useDBUser';
import Loading from '../../Shared/Loading/Loading';

const AddReview = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isLoading] = useDBUser(authUser.email);

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const name = dbUser.name;
        const photo = dbUser.photo;
        const email = dbUser.email;
        const designation = e.target.designation.value;
        const review = e.target.review.value;

        const reviewDetails = {
            name,
            photo,
            email,
            designation,
            review
        }

        fetch('https://gear-up-ecommerce-server.onrender.com/add-review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(reviewDetails)
        }).then(res => res.json()).then(data => {
            if (data.insertedId) {
                console.log(data);
                toast.success('Review Submitted');
                e.target.reset();
            }
            else {
                toast.error('Failed');
            }
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-2/3 mt-4'>
            <p className='text-3xl text-cyan-600 font-bold mb-2'>Give us a Review</p>
            <form onSubmit={handleSubmitReview} className='bg-white p-4 rounded'>
                <div>
                    <label className="label">
                        <span className="label-text">Your Designation</span>
                    </label>
                    <input name='designation' type="text" placeholder="Ex. CEO, BDcom" className="input input-bordered w-full" />
                </div>
                <div className='w-full mt-4'>
                    <label className="label">
                        <span className="label-text">Your Review</span>
                    </label>
                    <textarea name='review' type="text" placeholder="Type " className="textarea textarea-bordered w-full" />
                </div>
                <div className='mt-4'>
                    <button type='submit' className='btn bg-cyan-500 hover:bg-cyan-600 border-0'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;