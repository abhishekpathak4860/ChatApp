import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen  flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
      }}
    >
      <span className=" absolute top-6 left-6 text-2xl font-serif t font-bold  mt-[-12px]  text-[#f8b3b4]">
        <span className="text-4xl">न</span>iveshak
      </span>

      {/* Explore Tag */}
      <div
        className="mt-16 text-sm bg-gray-100 px-4 py-1 font-bold rounded-full text-gray-600"
        style={{ color: "rgb(246 ,180 ,172 )" }}
      >
        Explore how we serve investors
      </div>

      {/* Main Heading */}
      <h1
        className="mt-6 text-3xl md:text-5xl font-semibold mb-4 leading-tight"
        style={{ color: "rgb(246 ,180 ,172 )" }}
      >
        Empower Your Finances with Our <br />
        <span
          className="text-blue-600 font-bold"
          style={{ color: "rgb(246 ,180 ,172 )" }}
        >
          Support & Advisory Chat Platform
        </span>
      </h1>

      {/* Description */}
      <p className=" font-bold max-w-2xl mb-6 text-[rgba(246,179,172,0.74)]">
        Connect with certified advisors, resolve your queries in real-time, and
        book expert video consultations — all in one secure platform.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          style={{ backgroundColor: "rgb(246 ,180 ,172 )" }}
        >
          Create an Account
        </Link>
        <Link
          to="/login"
          className="border text-[rgb(246,180,172)] px-6 py-2 rounded-full hover:bg-[rgb(246,180,172)] transition hover:text-white"
          style={{
            border: "1px solid rgb(246 ,180 ,172 )",
          }}
        >
          Login
        </Link>
      </div>

      {/* Image */}
      <img
        src="Header.webp"
        alt="Dashboard Preview"
        className="w-full max-w-4xl shadow-xl rounded-xl"
      />
    </div>
  );
}
