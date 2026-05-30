import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, checkLoginStatus } from "../../services/authorization";
import { LoginStateStore } from "../../Store/loginState-store";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setuserDetails } = useContext(LoginStateStore);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await loginUser(data);
      const statusResponse = await checkLoginStatus();
      const loginState = statusResponse.data.isLoggedIn;
      const user = statusResponse.data.user;
      setIsLoggedIn(loginState);
      setuserDetails(user);
      localStorage.setItem('isLoggedIn', JSON.stringify(loginState));
      localStorage.setItem('userDetails', JSON.stringify(user));
      navigate("/");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      setErrorMessage(message);
      console.error('Error logging in user:', message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Welcome Back!</h1>
      {errorMessage && (
        <div className="alert alert-error mt-4">
          <span>{errorMessage}</span>
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
    </form>
  );
}
