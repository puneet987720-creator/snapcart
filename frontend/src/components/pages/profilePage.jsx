import React from "react";
import { useContext } from "react";
import { LoginStateStore } from "../../Store/loginState-store";

export function ProfilePage() {
  const { userDetails } = useContext(LoginStateStore);
  
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
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-secondary btn-sm sm:btn-md">Edit</button>
          </div>
        </div>
      </div>

      {userDetails.usertype === "admin" && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add Product</h2>
            <p className="text-sm sm:text-base">Manage and add new products to your store.</p>
            <div className="card-actions justify-end">
              <a href="/product/new" className="btn btn-primary btn-sm sm:btn-md">Add</a>
            </div>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User Profile</h2>
          <p className="text-sm sm:text-base">Update your personal information and preferences.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary btn-sm sm:btn-md">Edit</button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Security</h2>
          <p className="text-sm sm:text-base">Manage passwords, authentication, and privacy options.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent btn-sm sm:btn-md">Update</button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Notifications</h2>
          <p className="text-sm sm:text-base">Control email, SMS, and app notifications.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-info btn-sm sm:btn-md">Configure</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
