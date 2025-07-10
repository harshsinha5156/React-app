import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaEnvelope,  FaMapMarkerAlt, FaCamera, FaSave, FaLock, FaCheck, FaTimes } from 'react-icons/fa';

const UserProfileForm = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    profileImage: null,
    password: '',
    confirmPassword: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Validate form on section change
  useEffect(() => {
    if (activeSection === 'security') {
      validatePasswords();
    }
  }, [formData.password, formData.confirmPassword, activeSection]);

  const validatePasswords = () => {
    const match = formData.password === formData.confirmPassword;
    setPasswordMatch(match);
    return match;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setErrors({ profileImage: 'Please select an image file' });
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) { // 2MB
        setErrors({ profileImage: 'Image size should be less than 2MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          profileImage: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (activeSection === 'basic') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
    }
    
    if (activeSection === 'address') {
      if (formData.street && !formData.city) newErrors.city = 'City is required';
      if (formData.zip && !/^\d{5,10}$/.test(formData.zip)) {
        newErrors.zip = 'ZIP code is invalid';
      }
    }
    
    if (activeSection === 'security' && formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!validatePasswords()) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleNext = () => {
    if (!validateForm()) return;
    
    const sections = ['basic', 'address', 'profile', 'security'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const sections = ['basic', 'address', 'profile', 'security'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  // Render input with error state
  const renderInput = (name, label, icon, type = 'text', placeholder = '', required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : ''} px-3 py-2 border ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
          required={required}
        />
        {errors[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <FaTimes className="text-red-500" />
          </div>
        )}
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  const renderSection = () => {
    switch(activeSection) {
      case 'basic':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold flex items-center">
              <FaUser className="mr-2 text-indigo-600" /> Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderInput('firstName', 'First Name', null, 'text', 'John', true)}
              </div>
              <div>
                {renderInput('lastName', 'Last Name', null, 'text', 'Doe', true)}
              </div>
            </div>
            
            {renderInput('email', 'Email', <FaEnvelope className="text-gray-400" />, 'email', 'john@example.com', true)}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="text-sm bg-transparent focus:outline-none pr-2 text-gray-700 h-full border-r border-gray-300"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`w-full pl-24 px-3 py-2 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                />
                
                {errors.phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FaTimes className="text-red-500" />
                  </div>
                )}
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>
        );
      
      case 'address':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" /> Address Information
            </h2>
            
            {renderInput('street', 'Street Address', null, 'text', '123 Main St')}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderInput('city', 'City', null, 'text', 'Mumbai')}
              </div>
              <div>
                {renderInput('state', 'State/Province', null, 'text', 'Maharashtra')}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderInput('zip', 'ZIP/Postal Code', null, 'text', '400001')}
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold flex items-center">
              <FaCamera className="mr-2 text-indigo-600" /> Profile Picture
            </h2>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="w-32 h-32 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-4xl" />
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none transition-transform duration-300 transform hover:scale-110 shadow-lg"
                >
                  <FaCamera className="text-sm" />
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <p className="text-sm text-gray-500 text-center mb-2">
                Click on the camera icon to upload a profile picture
              </p>
              
              {errors.profileImage && (
                <p className="text-sm text-red-500 text-center">{errors.profileImage}</p>
              )}
              
              <div className="mt-2 text-xs text-gray-400">
                <p>Supported formats: JPG, PNG</p>
                <p>Max size: 2MB</p>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold flex items-center">
              <FaLock className="mr-2 text-indigo-600" /> Security
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                />
                {formData.password.length > 0 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {formData.password.length >= 6 ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              {formData.password.length > 0 && formData.password.length < 6 && (
                <p className="mt-1 text-sm text-yellow-600">Password must be at least 6 characters</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword || !passwordMatch ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                />
                {formData.confirmPassword.length > 0 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {passwordMatch ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              {!passwordMatch && formData.confirmPassword.length > 0 && (
                <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-800 flex items-center">
                <FaLock className="mr-2" /> Password Requirements
              </h3>
              <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
                <li>At least 6 characters</li>
                <li>Include numbers and letters</li>
                <li>Consider using special characters</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">User Profile Settings</h1>
      <p className="text-gray-600 mb-6">Update your personal information and preferences</p>
      
      {/* Success message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <FaCheck className="mr-2 text-green-600" />
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {['basic', 'address', 'profile', 'security'].map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded-t-md transition-all duration-300 ${
                activeSection === section
                  ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section === 'basic' && 'Basic Info'}
              {section === 'address' && 'Address'}
              {section === 'profile' && 'Profile Picture'}
              {section === 'security' && 'Security'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {renderSection()}
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-8">
          <div>
            {activeSection !== 'basic' && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            {activeSection !== 'security' && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none transition-colors duration-300 flex items-center"
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 ${
                isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white rounded-md focus:outline-none transition-colors duration-300 flex items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                 
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {/* Add custom animations to Tailwind */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserProfileForm;