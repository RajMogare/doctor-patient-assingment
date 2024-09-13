import React from "react";
import { Link, useNavigate } from "react-router-dom";
import headerBg from "../../public/header-bg.png";


const HomePage = () => {
  const handleSignInClick = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Show error if no token is found
      toast.error("You need to sign in first");
      return;  // Exit the function
    }

    try {
      // Decode token to get user information
      const decodedToken = jwt_decode(token);

      if (decodedToken.role === "Patient") {
        // If the role is Patient, navigate to the profile and show success message
        toast.success("Login successful!");
        navigate(`/profile/${decodedToken.id}`);
      } else if (decodedToken.role === "Doctor") {
        // Add a case for Doctor role if needed
        toast.success("Login successful! Redirecting to Doctor profile.");
        navigate(`/doctor-profile/${decodedToken.id}`);
      } else {
        // If the role is neither, show error
        toast.error("Invalid role");
      }
    } catch (error) {
      // If token decoding fails, show error
      toast.error("Invalid token format");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto min-h-screen flex flex-col">
      <nav className="flex items-center justify-between p-8 gap-4">
        <div className="text-2xl font-semibold text-teal-500">MEDIBuddy</div>
        <Link to="/register">
          <button className="px-8 py-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">
            Register Now
          </button>
        </Link>
      </nav>

      <header className="flex flex-col lg:grid lg:grid-cols-2 gap-8 p-8 flex-grow relative">
        <div className="flex flex-col justify-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="font-normal">Get Quick</span>
            <br />
            Medical Services
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            In today's fast-paced world, access to prompt and efficient medical
            services is of paramount importance. When faced with a medical
            emergency or seeking immediate medical attention, the ability to
            receive quick medical services can significantly impact the outcome
            of a situation.
          </p>
          <Link to="/signin">
            <button
              className="px-8 py-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </Link>
        </div>
        <div className="relative text-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 h-80 w-80 rounded-full z-[-1]"></div>
          <img
            src={headerBg}
            alt="header"
            className="max-w-full mx-auto lg:mx-0"
          />
        </div>
      </header>
    </div>
  );
};

export default HomePage;
