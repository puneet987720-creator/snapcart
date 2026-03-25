import {Form, redirect} from "react-router-dom";
import { addProduct } from "../../services/poducts";

export function AddProductForm() {
  return (
    <Form method="POST">

  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
        <div className="card-body">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Add Product</h1>
      </div>
          <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div className="form-control">
              <label className="label">Product Name</label>
              <input type="text" name="name" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">Description</label>
              <textarea name="description" className="textarea textarea-bordered" placeholder="Optional"></textarea>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">Price</label>
              <div className="input-group">
                <span>₹</span>
                <input type="number" name="price" className="input input-bordered" placeholder="Required" />
              </div>
            </div>

            {/* Stock */}
            <div className="form-control">
              <label className="label">Stock</label>
              <input type="number" name="stock" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">Category</label>
              <input type="text" name="category" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Brand */}
            <div className="form-control">
              <label className="label">Brand</label>
              <input type="text" name="brand" className="input input-bordered" placeholder="Required" />
            </div>

            {/* Image Upload */}
            <div className="form-control col-span-2">
              <label className="label">Product Image</label>
              <input type="file" name="image" className="file-input file-input-bordered w-full" />
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

export async function createProductAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    const response = await addProduct(data);
    console.log('Product created successfully:', response.data);

  } catch (error) {
    console.error('Error creating product:', error);
  }
  return redirect('/product');
}