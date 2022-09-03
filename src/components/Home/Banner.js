import React from 'react';
import bannerPhoto from '../../assets/banner-photo.jpg'

const Banner = () => {
    return (
        <div>
            <div class="hero" style={{ "background-image": `url(${bannerPhoto})`, 'background-repeat': 'no-repeat', 'height': '90vh' }}>
                <div class="hero-overlay bg-opacity-60 md:bg-opacity-0"></div>
                <div class="hero-content text-center text-neutral-content md:-ml-96 flex items-center">
                    <div class="max-w-md md:-ml-56">
                        <h1 class="mb-5 text-4xl font-bold font-sans">MOTORCYCLE PARTS</h1>
                        <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button class="bg-gray-900 hover:bg-black py-2 px-6 shadow-2xl border-slate-500 border-b-4 border-r-4 rounded cursor-pointer">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;