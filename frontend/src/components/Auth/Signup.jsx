import { useState, useEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { createUser } from "../../services/authorization";
import {Loader} from "../pages/loader";

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const actionData = useActionData();

  const handleSubmit = (event) => {
    if (password !== confirmPassword) {
      event.preventDefault();
      setPasswordError(true);
      setLoading(false);
    } else {
      setPasswordError(false);
      setLoading(true);
    }
  };

 useEffect(() => {
    if (actionData?.error) {
      setLoading(false);
    }
  }, [actionData]);
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="hero bg-base-200 min-h-screen pt-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create Account</h1>
            {actionData?.error && (
        <div className="alert alert-error mt-4">
          <span>{actionData.error}</span>
        </div>
      )}
      {passwordError && (
        <div className="alert alert-error mt-4">
          <span>Passwords do not match</span>
        </div>
      )}
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

                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  placeholder="Optional"
                />

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Required" />

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="label">Password</label>
                    <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} className="input" placeholder="Required" />
                  </div>
                  <div className="flex-1">
                    <label className="label">Confirm Password</label>
                    <input type="password" name="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} className="input" placeholder="Required" />
                  </div>
                </div>

                <label className="label">{`User Type(Required)`}</label>
                <div className="flex gap-1">
                  <div className="flex">
                    <input type="radio" aria-label="Customer" name="usertype" value="customer" className="btn" />
                  </div>
                  <div className="flex">
                    <input type="radio" aria-label="Admin" name="usertype" value="admin" className="btn" />
                  </div>
                </div>
                <button disabled={loading} type="submit" className="btn btn-neutral mt-4">Signup{loading && <Loader />}</button>
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
    const message = error?.response?.data?.message || error?.message || 'Login failed';
    console.error('Error signup user:', message);
    return new Response(JSON.stringify({ error: message }),
     { status: error?.response?.status || 400,
      headers: { "Content-Type": "application/json" } }
    );
  }
  return redirect('/verify-emailMsg');
}