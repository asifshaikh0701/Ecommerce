

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiFarmTractor } from 'react-icons/gi';
import { MdHome, MdLogin, MdPerson } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const { user, location: userLocationCtx, updateLocation, fetchLocation } = useAuth();
  const [editing, setEditing] = useState(false);
  const [newLocation, setNewLocation] = useState('');

  const getProfilePath = () => {
    if (!user || !user.role) return '/login';
    return user.role === 'customer'
      ? '/customer/dashboard/profile'
      : '/seller/dashboard/profile';
  };

  const navItems = [
    { name: 'Home', to: '/', icon: <MdHome /> },
    { name: 'Products', to: '/products', icon: <MdStorefront /> },
    { name: 'Why Us', to: '/why-us', icon: <FaLeaf /> },
    !user && { name: 'Login', to: '/login', icon: <MdLogin /> }
  ].filter(Boolean);

  // Auto fetch GPS location after login if none set
  useEffect(() => {
    if (user && !userLocationCtx) {
      fetchLocation();
    }
  }, [user, userLocationCtx, fetchLocation]);

  const saveManualLocation = (e) => {
    e.preventDefault();
    if (newLocation.trim() !== '') {
      updateLocation(newLocation.trim());
      setEditing(false);
      setNewLocation('');
    }
  };

  return (
    <nav className="bg-white shadow-lg px-4 py-3 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Search */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 text-green-800 text-2xl font-bold"
          >
            <GiFarmTractor className="text-3xl text-green-700" />
            <span className="bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent">
              AgroConnect
            </span>
          </Link>

          {typeof searchQuery === 'string' && setSearchQuery && (
            <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="hidden md:block w-64 lg:w-80 px-4 py-2 rounded-xl bg-gray-100 text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition duration-300"
          />
          
          )}
        </div>

        {/* Links + Location */}
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex space-x-6 text-base font-medium items-center">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 ${
                    location.pathname === item.to
                      ? 'bg-green-100 text-green-800 font-semibold'
                      : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <Link
                  to={getProfilePath()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-green-700 hover:bg-green-100"
                >
                  <MdPerson className="text-lg" />
                  <span>Profile</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Location Display / Manual Input */}
          {user &&
            (editing ? (
              <form
                onSubmit={saveManualLocation}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="border border-green-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex items-center text-gray-600 text-sm bg-green-50 px-3 py-1 rounded-full space-x-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{userLocationCtx || 'Fetching...'}</span>
                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-500 text-xs underline"
                >
                  Change
                </button>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

