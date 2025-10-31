import React, { useState } from 'react';
import { User } from '../types';

interface UserFormProps {
  onSubmit: (user: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<User>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<User> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (field: keyof User) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-large p-10 max-w-md mx-auto border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-4">
          <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Start Your Training
        </h2>
        <p className="text-gray-600">
          Enter your details to begin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange('name')}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange('email')}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Start Training Session
        </button>
      </form>
    </div>
  );
};

