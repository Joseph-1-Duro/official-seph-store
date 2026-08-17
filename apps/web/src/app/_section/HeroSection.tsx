import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Elevate your style</h1>
        <p>Get you looks right at one store.</p>
        <Link href={'/shop'} className="btn-container">
          <div className="btn-drawer transition-top">Welcome...</div>
          <div className="btn-drawer transition-bottom">...8 hours</div>

          <button className="btn">
            <span className="btn-text">Shop Now</span>
          </button>

          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  )
}