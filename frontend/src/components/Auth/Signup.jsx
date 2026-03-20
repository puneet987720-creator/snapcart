import {Form, redirect} from "react-router-dom";
import { createUser } from "../../services/authorization";

export function SignupForm() {
  return (
    <Form method="POST" >
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Create Account</h1>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label">First Name</label>
              <input type="text" name="firstname" className="input" placeholder="Required" />
            </div>
            <div className="flex-1">
              <label className="label">Last Name</label>
              <input type="text" name="lastname" className="input" placeholder="Optional" />
            </div>
          </div>

          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Required" />

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Required" />
            </div>
            <div className="flex-1">
              <label className="label">Confirm Password</label>
              <input type="password" className="input" placeholder="Required" />
            </div>
          </div>

              <label className="label">{`User Type(Required)`}</label>
          <div className="flex gap-1">
            <div className="flex">
            <input type="checkbox" aria-label="Customer" name="customer" className="btn" />
            </div>
            <div className="flex">
          <input type="checkbox" aria-label="Admin" name="admin" className="btn" />
            </div>
          </div>          
          <button className="btn btn-neutral mt-4">Signup</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
</Form>
  );
}

export async function createUserAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    const response = await createUser(data);
    console.log('User created successfully:', response.data);

  } catch (error) {
    console.error('Error creating user:', error);
  }
  return redirect('/verify-emailMsg');
}