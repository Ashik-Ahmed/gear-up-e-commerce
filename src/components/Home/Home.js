import React from 'react';
import Products from '../Products/Products';
import Banner from './Banner';

const Home = () => {
    return (
        <div className='bg-gray-200'>
            <Banner />
            <Products />
        </div>
    );
};

export default Home;