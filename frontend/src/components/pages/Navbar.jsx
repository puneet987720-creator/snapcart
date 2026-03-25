import { useContext } from "react";
import { useState } from "react";
import { LoginStateStore } from "../../Store/loginState-store"
import { FilterProductStore } from "../../Store/filterProduct-store";
import { logoutUser } from "../../services/authorization";
import { searchProducts } from "../../services/poducts";

export function Navbar() {
  const { IsLoggedIn } = useContext(LoginStateStore);
  console.log('Navbar - Is user logged in?', IsLoggedIn);
  const [ searchTerm, setSearchTerm, setSearchResults] = useContext(FilterProductStore);
  const handleSearch = async(e) => {
    const response = await searchProducts(searchTerm);
   const searchResult= setSearchResults(response.data.products);
    e.preventDefault();
  }
  const handleLogoutClick = () => {
    window.location.reload(); // Reloads the entire page
  };
  return (
    <>
      <div className="navbar bg-base-100 fixed top-0 left-0 right-0 shadow-sm z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {!IsLoggedIn ? <li><a href="/login">Login</a></li> : <li><a href="/product">Home</a></li>}
              {!IsLoggedIn ? <li><a href="/signup">Signup</a></li> : <li><a href="/">My orders</a></li>}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">Snapcart</a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <input type="text" onChange={(e)=>{setSearchTerm(e.target.value)}} onKeyDown={(e)=>e.key==='Enter' && handleSearch(e)} placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            {IsLoggedIn && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Profile Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                    <a href="/profilePage" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a href="/settings">Settings</a></li>
                  <li>
                    <a onClick={() => document.getElementById('my_modal_5').showModal()}>Logout</a>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Are you sure you want to logout?</p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">cancel</button>
                            <a href="/" className="btn btn-primary" onClick={async () => await logoutUser().then(() => handleLogoutClick())}>Logout</a>
                          </form>
                        </div>
                      </div>
                    </dialog></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}