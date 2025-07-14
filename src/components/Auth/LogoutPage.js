import React, { useEffect } from 'react';

const LogoutPage = ({ onLogout, navigateTo }) => {
  useEffect(() => {
    
    onLogout();
    
   
    const timer = setTimeout(() => {
      navigateTo('home');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onLogout, navigateTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Logged Out Successfully
          </h2>
          <p className="mt-4 text-gray-600">
            You have been securely logged out. Redirecting to home page...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;