import React from 'react';
import Products from '../Products/Products';
import Banner from './Banner';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import ReviewLimited from './ReviewLimited';
import useProducts from '../../hooks/useProducts';
import Loading from '../Shared/Loading/Loading';
import Product from '../Products/Product';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';

const Home = () => {

    const [authUser] = useAuthState(auth);

    const [dbUser, isDBLoading] = useDBUser(authUser?.email);

    const [products, isLoading] = useProducts();

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='bg-gray-200'>
            <Banner />
            <div className=' py-8'>
                <div className='py-4 text-4xl font-bold'>
                    <p className='inline border-white border-b-2'>Our Products</p>
                </div>
                <section class="text-gray-600 body-font">
                    <div class="container px-5 py-6 mx-auto">
                        <div class="md:grid grid-cols-4 -m-4 gap-4">
                            {
                                products.slice(0, 4).map(product => <Product key={product._id} product={product}></Product>)
                            }
                        </div>
                        {
                            !dbUser.role &&
                            <div className='mt-8 flex justify-end'>
                                <Link to='/products' className='btn  btn-sm'>Browse All</Link>
                            </div>
                        }
                    </div>
                </section>

            </div>
            <ReviewLimited />

            <div className="stats shadow mb-6 mt-12">

                <div className="stat">
                    <div className="stat-figure text-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Visitors</div>
                    <div className="stat-value">30K+</div>
                    <div className="stat-desc">Per Month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-info text-3xl">
                        <HiOutlineUserGroup />
                    </div>
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">2,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-info text-3xl">
                        <MdOutlineProductionQuantityLimits />
                    </div>
                    <div className="stat-title">Total Product</div>
                    <div className="stat-value">400+</div>
                    <div className="stat-desc">↗︎ 30 (13%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-info text-3xl">
                        <TbTruckDelivery />
                    </div>
                    <div className="stat-title">Successful Order</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
        </div>
    );
};

export default Home;