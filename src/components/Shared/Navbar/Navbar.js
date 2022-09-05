import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Navbar = () => {

    const [authUser] = useAuthState(auth);

    //sign out the loggedin user
    const handleSignout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <div>
            <div class="navbar">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            <li><Link to='/reviews'>Reviews</Link></li>
                            <li><Link to='/blogs'>Blogs</Link></li>
                            <li><Link to='/'>Portfolio</Link></li>
                            <li><Link to='/contact-us'>Contact Us</Link></li>
                            {/* <li tabindex="0">
                                <a class="justify-between">
                                    Parent
                                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul class="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                    <Link to='/' class="normal-case text-xl text-cyan-600 font-extrabold ml-4 italic">Gear Up</Link>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><Link to='/reviews'>Reviews</Link></li>
                        <li><Link to='/blogs'>Blogs</Link></li>
                        <li><Link to='/'>Portfolio</Link></li>
                        <li><Link to='/contact-us'>Contact Us</Link></li>
                        {/* <li tabindex="0">
                            <a>
                                Parent
                                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul class="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        authUser ?

                            <div>
                                <button onClick={handleSignout} className='btn btn-sm bg-indigo-500 hover:bg-indigo-600 border-0'>Signout</button>
                                <p className='text-xs'>{authUser.email}</p>
                            </div>
                            :
                            <Link to='/login' className="btn btn-sm bg-gray-600 border-0">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;