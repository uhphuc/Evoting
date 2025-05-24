// components/UserForm.jsx
import React from 'react';

const UserForm = ({ user, onChange, onSubmit, isEditing, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Voter' : 'Add New Voter'}
            </h2>
            <button
                type="button"
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChange}
            placeholder="Full Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="Email Address"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={onChange}
            placeholder="Phone Number"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={onChange}
            placeholder="Full Address"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={onChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEditing ? 'Update Voter' : 'Add Voter'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;