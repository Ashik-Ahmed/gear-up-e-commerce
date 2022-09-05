import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Shared/Loading/Loading';

const Dashboard = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isLoading] = useDBUser(authUser.email);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='bg-gray-200'>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex justify-center">
                    <Outlet />
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div class="drawer-side md:bg-white">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu py-4 overflow-y-auto w-48 text-base-content">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        <li><Link to='my-orders'>My Orders</Link></li>
                        <li><Link to='add-review'>Add a Review</Link></li>
                        {
                            dbUser.role === 'admin' &&
                            <>
                                <li><Link to='manage-users'>Manage Users</Link></li>
                                <li><Link to='manage-orders'>Manage Orders</Link></li>
                                <li><Link to='manage-products'>Manage Products</Link></li>
                                <li><Link to='add-product'>Add Product</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;