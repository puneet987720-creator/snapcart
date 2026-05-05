import {Form, redirect, useActionData} from "react-router-dom";
import { loginUser } from "../../services/authorization";

export function LoginForm() {
  const actionData = useActionData();

  return (
    <Form method="POST" >
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Welcome Back!</h1>
      {actionData?.error && (
        <div className="alert alert-error mt-4">
          <span>{actionData.error}</span>
        </div>
      )}
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
</Form>
  );
}

export async function loginUserAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    const response = await loginUser(data);
    console.log('User logged in successfully:', response);
    return redirect("/");
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Login failed';
    console.error('Error logging in user:', message);
    return new Response(JSON.stringify({ error: message }),
     { status: error?.response?.status || 400,
      headers: { "Content-Type": "application/json" } }
    );
  }
}