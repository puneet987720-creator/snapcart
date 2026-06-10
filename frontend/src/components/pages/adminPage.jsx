import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { LoginStateStore } from "../../Store/loginState-store";

export function AdminPage() {
   const {IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails} = useContext(LoginStateStore);

      if(!IsLoggedIn || userDetails.usertype !== "admin"){
    return <div className="text-center mt-20">Access Denied</div>
  }
    return (
        <div className="bg-base-200 min-h-screen">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-md px-4 sm:px-6">
                <div className="flex-1">
                    <h1 className="text-lg sm:text-xl font-bold">User Settings</h1>
                </div>
            </div>

            {/* Settings Content */}
            <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">Manage Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* User Details Card */}
                    <div className="card bg-base-100 shadow-xl col-span-1 md:col-span-2">
                        <div className="card-body">
                            <h2 className="card-title">User Details</h2>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p><span className="font-bold">Username:</span> {userDetails.firstname}</p>
                                <p><span className="font-bold">Email:</span> {userDetails.email}</p>
                                <p><span className="font-bold">User Type:</span> {userDetails.usertype}</p>
                            </div>
                            
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Add Product</h2>
                            <p className="text-sm sm:text-base">Manage and add new products to your store.</p>
                            <div className="card-actions justify-end">
                                <NavLink to="/product/new" className="btn btn-primary btn-sm sm:btn-md">Add</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Manage Orders</h2>
                            <p className="text-sm sm:text-base">View and manage all placed orders.</p>
                            <div className="card-actions justify-end">
                                <NavLink to="/all-orders" className="btn btn-primary btn-sm sm:btn-md">View Orders</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
