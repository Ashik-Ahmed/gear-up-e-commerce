import React from 'react';

const Reviews = () => {
    return (
        <div className='mt-6'>
            <div className='py-4'>
                <p className='text-4xl font-bold border-b-2 border-white inline'>Reviews</p>
            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-6 mx-auto">
                    <div class="md:grid grid-cols-3 -m-4 gap-8">
                        <div class="lg:mb-0 mb-6 p-4 bg-white rounded">
                            <div class="h-full text-center">
                                <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-cyan-500 bg-gray-100" src="https://dummyimage.com/302x302" />
                                <p class="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span class="inline-block h-1 w-10 rounded bg-cyan-500 mt-6 mb-4"></span>
                                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">HOLDEN CAULFIELD</h2>
                                <p class="text-gray-500">Senior Product Designer</p>
                            </div>
                        </div>
                        <div class="lg:mb-0 mb-6 p-4 bg-white rounded">
                            <div class="h-full text-center">
                                <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-cyan-500 bg-gray-100" src="https://dummyimage.com/300x300" />
                                <p class="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span class="inline-block h-1 w-10 rounded bg-cyan-500 mt-6 mb-4"></span>
                                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">ALPER KAMU</h2>
                                <p class="text-gray-500">UI Develeoper</p>
                            </div>
                        </div>
                        <div class="lg:mb-0 p-4 bg-white rounded">
                            <div class="h-full text-center">
                                <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-cyan-500 bg-gray-100" src="https://dummyimage.com/305x305" />
                                <p class="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                <span class="inline-block h-1 w-10 rounded bg-cyan-500 mt-6 mb-4"></span>
                                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">HENRY LETHAM</h2>
                                <p class="text-gray-500">CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reviews;