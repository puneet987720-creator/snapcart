import { useEffect } from 'react'
import { checkLoginStatus } from '../../services/authorization'
import axios from 'axios'

export function Welcome() {

return (
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://png.pngtree.com/thumb_back/fw800/background/20241011/pngtree-vector-online-shopping-image_16361651.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    )
}