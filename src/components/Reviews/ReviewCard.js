import React from 'react';
import photo from '../../assets/profilePic.png';

const ReviewCard = ({ review }) => {
    return (
        <div class="lg:mb-0 mb-6 p-4 bg-white rounded">
            <div class="h-full text-center">
                <div className='h-2/3'>
                    <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-cyan-500 bg-gray-100" src={review.photo || photo} />
                    <p class="leading-relaxed">{review.review}</p>
                </div>
                <div className='h-1/3'>
                    <span class="inline-block h-1 w-10 rounded bg-cyan-500 mt-6 mb-4"></span>
                    <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">{review.name}</h2>
                    <p class="text-gray-500">{review.designation}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;