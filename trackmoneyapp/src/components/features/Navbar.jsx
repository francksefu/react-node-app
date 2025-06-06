import { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import UsersContext from "../../context/user";

const Navbar = () => {
    const {token, setToken, activeMenu, setActiveMenu} = useContext(UsersContext);
    const [dropdown, setDropdown] = useState(false);
    const [dropdownMobile, setDropdownMobile] = useState(false);
    const signOut = () => {
        sessionStorage.setItem('token', '');
        setToken(null);
        setDropdown(false);
    }
    const location = useLocation();
    return (
        <>
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/*<!-- Mobile menu button-->*/}
                    <button onClick={() => setDropdownMobile(! dropdownMobile)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    {/*<!--
                        Icon when menu is closed.

                        Menu open: "hidden", Menu closed: "block"
                    -->*/}
                    <svg className={dropdownMobile ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    {/*<!--
                        Icon when menu is open.

                        Menu open: "block", Menu closed: "hidden"
                    -->*/}
                    
                    <svg className={dropdownMobile ? "hidden size-6" : "block size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                    
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                    
                        <Link to="/" onClick={() => setActiveMenu('Home')} className={`${activeMenu === "Home" ? "bg-gray-700" : ""} ${"rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"}`} aria-current="page">Home</Link>
                        <Link to="/expenses" onClick={() => setActiveMenu('Expenses')} className={`${activeMenu === "Expenses" ? "bg-gray-700" : ""} ${"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>Expenses</Link>
                        <Link to="/categories" onClick={() => setActiveMenu('Categorie')} className={`${activeMenu === "Categorie" ? "bg-gray-700" : ""} ${"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>Categories</Link>
                        
                    </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    </button>

                    {/*<!-- Profile dropdown -->*/}
                    <div className="relative ml-3">
                    {token ? (
                        <div>
                            <button onClick={() => setDropdown(! dropdown)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                            </button>
                        </div>
                    ) : (<div>
                        <Link to="/signin" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign in</Link>
                        <Link to="/signup" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign up</Link>
                    </div>)}
                    

                    {/*
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    */}
                    {dropdown ? <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                        
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                        <a href="#" onClick={signOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                    </div> : ''}
                    
                    </div>
                </div>
                </div>
            </div>

            {/*Mobile menu, show/hide based on menu state. -->*/}
            <div className="sm:hidden" id="mobile-menu" >
                {dropdownMobile && <div className="space-y-1 px-2 pt-2 pb-3">
                
                <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</Link>
                <Link to="/expenses" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Expenses</Link>
                <Link to="/categories" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Categories</Link>
                </div>}
                
            </div>
            </nav>
        </>
    );
}

export default Navbar;