import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
    const { logout } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, If you're not an ADMIN please use the mobile platform to Login.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            onClick={ () => {
                logout()
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound