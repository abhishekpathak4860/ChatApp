import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {/* <h2 className="absolute top-6 left-6 text-2xl font-serif text- font-bold text-blue-600 mt-[-12px]">
        Nivesh Jano
      </h2> */}

      <span className=" absolute top-6 left-6 text-2xl font-serif t font-bold  mt-[-12px]  text-[#f8b3b4]">
        <span className="text-4xl">न</span>iveshak
      </span>

      {/* Explore Tag */}
      <div className="mt-16 text-sm bg-gray-100 px-4 py-1 rounded-full text-gray-600">
        Explore how we serve investors
      </div>

      {/* Main Heading */}
      <h1 className="mt-6 text-3xl md:text-5xl font-semibold mb-4 leading-tight">
        Empower Your Finances with Our <br />
        <span className="text-blue-600 font-bold">
          Support & Advisory Chat Platform
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-2xl mb-6">
        Connect with certified advisors, resolve your queries in real-time, and
        book expert video consultations — all in one secure platform.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Create an Account
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 transition hover:text-white"
        >
          Login
        </Link>
      </div>

      {/* Image */}
      <img
        src="coverimg.jpg"
        alt="Dashboard Preview"
        className="w-full max-w-4xl shadow-xl rounded-xl"
      />
    </div>
  );
}
