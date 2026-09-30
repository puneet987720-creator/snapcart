import { useContext } from "react";
import { LoginStateStore } from "../../Store/loginState-store";
import {Form, redirect, useActionData} from "react-router-dom";
import { addProduct } from "../../services/poducts";

export function AddProductForm() {
  const { IsLoggedIn, userDetails } = useContext(LoginStateStore);
  const actionData = useActionData();
  if (!IsLoggedIn || userDetails?.usertype !== "admin") {
    return <div className="text-center mt-20">Access Denied</div>
  }
  return (
    <Form method="POST" encType="multipart/form-data" className="w-full">
      <div className="hero min-h-screen bg-base-200 px-3 pt-20 pb-8 sm:px-6 sm:pt-24">
        <div className="hero-content w-full max-w-none p-0">
          <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
            <div className="card-body gap-5 p-4 sm:p-8">
              <header className="space-y-2 text-center sm:text-left">
                <span className="badge badge-primary badge-outline">Inventory</span>
                <h1 className="text-3xl font-bold sm:text-4xl">Add Product</h1>
                <p className="text-sm text-base-content/60 sm:text-base">
                  Add the product details and image to your store.
                </p>
              </header>
              {actionData?.error && (
                <div className="alert alert-error mt-2 text-sm wrap-break-word">
                  <span>{actionData.error}</span>
                </div>
              )}
              <fieldset className="fieldset grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {/* Product Name */}
                <div className="form-control min-w-0">
                  <label className="label"><span className="label-text font-medium">Product Name</span></label>
                  <input type="text" name="name" className="input input-bordered w-full min-w-0" placeholder="Required" />
                </div>

                {/* Description */}
                <div className="form-control min-w-0 sm:col-span-2">
                  <label className="label"><span className="label-text font-medium">Description</span></label>
                  <textarea name="description" className="textarea textarea-bordered min-h-32 w-full" placeholder="Required"></textarea>
                </div>

                {/* Price */}
                <div className="form-control min-w-0">
                  <label className="label"><span className="label-text font-medium">Price</span></label>
                  <div className="input-group w-full">
                    <span>₹</span>
                    <input type="number" name="price" className="input input-bordered w-full min-w-0" placeholder="Required" />
                  </div>
                </div>

                {/* Stock */}
                <div className="form-control min-w-0">
                  <label className="label"><span className="label-text font-medium">Stock</span></label>
                  <input type="number" name="stock" className="input input-bordered w-full min-w-0" placeholder="Required" />
                </div>

                {/* Category */}
                <div className="form-control min-w-0">
                  <label className="label"><span className="label-text font-medium">Category</span></label>
                  <input type="text" name="category" className="input input-bordered w-full min-w-0" placeholder="Required" />
                </div>

                {/* Brand */}
                <div className="form-control min-w-0">
                  <label className="label"><span className="label-text font-medium">Brand</span></label>
                  <input type="text" name="brand" className="input input-bordered w-full min-w-0" placeholder="Required" />
                </div>

                {/* Image Upload */}
                <div className="form-control min-w-0 sm:col-span-2">
                  <label className="label"><span className="label-text font-medium">Product Image</span></label>
                  <input type="file" name="image" accept="image/png, image/jpg, image/jpeg" className="file-input file-input-bordered w-full min-w-0" />
                </div>
              </fieldset>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="submit" className="btn btn-primary w-full sm:w-auto">Save Product</button>
                <button type="reset" className="btn btn-outline w-full sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export async function createProductAction({ request }) {
  const formData = await request.formData();

  try {
    const response = await addProduct(formData);
    console.log('Product created successfully:', response.data);
    return redirect('/product');

  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Product creation failed';
    console.error('Error creating product:', message);
    return new Response(JSON.stringify({ error: message }),
     { status: error?.response?.status || 400,
      headers: { "Content-Type": "application/json" } }
    );
  }
}