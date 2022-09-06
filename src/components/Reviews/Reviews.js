import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import ReviewCard from './ReviewCard';

const Reviews = () => {

    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch('http://localhost:5000/reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='py-6 bg-gray-200 '>
            <div className='py-4'>
                <p className='text-4xl font-bold border-b-2 border-white inline'>Reviews</p>
            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-6 mx-auto">
                    <div class="md:grid grid-cols-3 -m-4 gap-8 mx-auto">
                        {
                            reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reviews;