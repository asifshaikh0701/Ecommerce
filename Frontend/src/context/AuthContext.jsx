

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLocation = localStorage.getItem("location");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedLocation) setLocation(storedLocation);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    // Optionally fetch location automatically
    fetchLocation();
  };

  const logout = () => {
    setUser(null);
    setLocation("");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || "";
            const state = data.address.state || "";
            const locationName = `${city}, ${state}`;
            updateLocation(locationName);
          } catch (err) {
            console.error("Error fetching location name", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, location, updateLocation, fetchLocation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


