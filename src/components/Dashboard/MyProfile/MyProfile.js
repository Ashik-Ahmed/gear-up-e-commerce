import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import useDBUser from '../../../hooks/useDBUser';

const MyProfile = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser] = useDBUser(authUser.email);

    return (
        <div className='w-full md:flex'>
            <div class="indicator bg-white rounded mt-28 m-4 w-1/3 h-fit">
                <img class="mask mask-hexagon indicator-item indicator-center -mt-6 w-40" src={dbUser.photo} alt='' />
                <div className='mt-16 pl-4 w-full'>
                    <div className='text-left py-8'>
                        <div className='flex items-baseline justify-between'>
                            <p className='font-bold w-1/3'>Name</p>
                            <span className='w-2/3'>: {dbUser.name}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Email</p>
                            <span className='w-2/3'>: {dbUser.email}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Birthday</p>
                            <span className='w-2/3'>: {dbUser.birthday}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Blood group</p>
                            <span className='w-2/3'>: {dbUser.blood}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Sex</p>
                            <span className='w-2/3'>: {dbUser.sex}</span>
                        </div>
                        <div className='flex items-baseline justify-between mt-1'>
                            <p className='font-bold w-1/3'>Bio</p>
                            <span className='w-2/3'>: {dbUser.bio}</span>
                        </div>
                    </div>
                    <button className='btn bg-cyan-500 hover:bg-cyan-600 border-0 w-2/3 my-6'>Edit Profile</button>
                </div>
            </div>

            <div className='w-2/3 bg-white rounded m-4'>
                <p>Edit Area</p>
            </div>
        </div>
    );
};

export default MyProfile;