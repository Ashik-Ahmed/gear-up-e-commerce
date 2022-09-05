import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import photo from '../../../assets/profilePic.png'

const Reviews = () => {

    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch('http://localhost:5000/reviews', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
                    <div class="md:grid grid-cols-3 -m-4 gap-8">
                        {
                            reviews.map(review => {
                                return <>
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
                                </>
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reviews;