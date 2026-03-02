
export function SignupForm() {
  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="card bg-base-100 w-[28rem] shadow-sm">
    <div className="card-body">
      <h2 className="card-title">Signup</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">First Name</legend>
        <input type="text" className="input input-bordered" placeholder="Required" />

        <legend className="fieldset-legend">Last Name</legend>
        <input type="text" className="input input-bordered" placeholder="Optional" />

        <legend className="fieldset-legend">Email</legend>
        <input type="email" className="input input-bordered" placeholder="Required" />

        <legend className="fieldset-legend">Password</legend>
        <input type="password" className="input input-bordered" placeholder="Required" />

        <legend className="fieldset-legend">Confirm Password</legend>
        <input type="password" className="input input-bordered" placeholder="Required" />
      </fieldset>

      <div className="card-actions justify-end">
        <button className="btn btn-primary">Signup</button>
      </div>
    </div>
  </div>
</div>
  );
}
