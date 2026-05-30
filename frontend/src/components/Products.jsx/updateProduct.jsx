import { useContext, useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { LoginStateStore } from "../../Store/loginState-store";
import {Form, redirect, useActionData} from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/poducts";

export function UpdateProductForm() {
  const {IsLoggedIn, setIsLoggedIn, userDetails, setuserDetails} = useContext(LoginStateStore);
  const actionData = useActionData();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetchProductById(id);
          setProduct(response.data.product);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProduct();
    }, [id]);
  
  if(!IsLoggedIn || userDetails.usertype !== "admin"){
    return <div className="text-center mt-20">Access Denied</div>
  }
  return (
    <Form method="POST" encType="multipart/form-data">

  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
        <div className="card-body">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Update Product</h1>
      </div>
      {actionData?.error && (
        <div className="alert alert-error mt-4">
          <span>{actionData.error}</span>
        </div>
      )}
          <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="form-control">
              <label className="label">Product Name</label>
              <input type="text" defaultValue={product?.name} name="name" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">Description</label>
              <textarea defaultValue={product?.description} name="description" className="textarea textarea-bordered" placeholder="Required"></textarea>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">Price</label>
              <div className="input-group">
                <span>₹</span>
                <input type="number" defaultValue={product?.price} name="price" className="input input-bordered" placeholder="Required" />
              </div>
            </div>

            {/* Stock */}
            <div className="form-control">
              <label className="label">Stock</label>
              <input type="number" defaultValue={product?.stock} name="stock" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">Category</label>
              <input type="text" defaultValue={product?.category} name="category" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Brand */}
            <div className="form-control">
              <label className="label">Brand</label>
              <input type="text" defaultValue={product?.brand} name="brand" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Image Upload */}
            <div className="form-control col-span-2">
              <label className="label">Product Image</label>
              <input type="file" name="image" accept="image/png, image/jpg, image/jpeg" className="file-input file-input-bordered w-full" />
            </div>
          </fieldset>

          {/* Buttons */}
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary">Save Product</button>
            <button type="reset" className="btn btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Form>
  );
}

export async function updateProductAction({ request, params }) {
  const formData = await request.formData();
  const id = params.id;
  try {
    const response = await updateProduct(id, formData);
    console.log('Product updated successfully:', response.data);
    return redirect('/product');

  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Product update failed';
    console.error('Error updating product:', message);
    return new Response(JSON.stringify({ error: message }),
     { status: error?.response?.status || 400,
      headers: { "Content-Type": "application/json" } }
    );
  }
}