import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='bg-gray-200'>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex justify-center">
                    <Outlet />
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div class="drawer-side bg-cyan-500">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu py-4 overflow-y-auto w-48 text-base-content">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        <li><Link to='my-orders'>My Orders</Link></li>
                        <li><Link to='add-review'>Add a Review</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;