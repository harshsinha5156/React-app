


import React from 'react';

const AccountSettings = ({ user, updateUserProfile, onBackClick }) => {
  const [formData, setFormData] = React.useState(user || {});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateUserProfile(formData);
    // Consider removing setTimeout and handle submission state in parent
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Back button at top */}
      <button
        onClick={onBackClick}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        aria-label="Go back to account overview"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to My Account
      </button>

      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      
      {/* Form remains unchanged */}
      <form onSubmit={handleSubmit}>
        {/* ... existing form fields ... */}
        
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={onBackClick}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;


