import { NavLink } from 'react-router-dom'

export function Sidebar({ IsLoggedIn }) {
    return (
        <>
            <div className="drawer">
                {/* Toggle checkbox */}
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                {/* Page content */}
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                </div>
                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu bg-gradient-to-b from-base-200 to-base-300 min-h-full w-80 p-4 shadow-lg rounded-r-xl">
                        {!IsLoggedIn ? <li><a className="flex items-center gap-2 rounded-md transition-transform duration-200 border border-base-300 shadow-md p-2 hover:bg-base-300 hover:shadow-lg hover:scale-105" href="/login"><span className="material-icons">Login</span></a></li> : <li><a className="flex items-center gap-2 rounded-md transition-transform duration-200 border border-base-300 shadow-md p-2 hover:bg-base-300 hover:shadow-lg hover:scale-105" href="/product"><span className="material-icons"> Home</span></a></li>}
                        
                        {!IsLoggedIn ? <li><a className="flex items-center gap-2 rounded-md transition-transform duration-200 border border-base-300 shadow-md p-2 hover:bg-base-300 hover:shadow-lg hover:scale-105" href="/signup"><span className="material-icons"> Signup</span></a></li> : <li><a className="flex items-center gap-2 rounded-md transition-transform duration-200 border border-base-300 shadow-md p-2 hover:bg-base-300 hover:shadow-lg hover:scale-105" href="/"><span className="material-icons"> My orders</span></a></li>}
                     <li><a className="flex items-center gap-2 rounded-md transition-transform duration-200 border border-base-300 shadow-md p-2 hover:bg-base-300 hover:shadow-lg hover:scale-105" href="/filter"><span className="material-icons">Filter</span></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}