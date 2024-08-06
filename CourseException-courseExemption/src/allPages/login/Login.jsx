import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import apiLoginHost from '../login/LoginApi';
import "./login.css";

function Login() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  // Function to initiate Google OAuth
  const googleAuth = () => {
    window.location.href = `${apiLoginHost}/auth/google`;
  };

  // Function to fetch roles and resources
  const fetchRoleAndResources = async () => {
    const token = localStorage.getItem('token'); // or wherever you store the token
    if (!token) {
      console.log("No token found, cannot fetch roles and resources");
      return;
    }

    try {
      const response = await axios.get(`${apiLoginHost}/api/roles-resources`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // Process the response data as needed
      console.log(response.data);

      // Store user_id and resources in local storage
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('resources', JSON.stringify(response.data));

      // Redirect to dashboard after fetching roles and resources
      navigate('/dashboard');
    } catch (error) {
      console.error("Error fetching roles and resources:", error);
    }
  };

  // Function to check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiLoginHost}/auth/check`, { withCredentials: true });
        if (response.status === 200 && response.data.token) {
          const { token } = response.data;
          console.log("Token received from backend:", token); // Log the token received
          setToken(token);
          localStorage.setItem('token', token);
          await fetchRoleAndResources(); // Fetch roles and resources after setting the token
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.log("Token invalid or expired, redirecting to login.");
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    if (token) {
      fetchRoleAndResources();
    } else {
      checkAuth();
    }
  }, [token, navigate]);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await axios.post(`${apiLoginHost}/auth/logout`, {}, { withCredentials: true });
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('resources');
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to verify access to a path
  const verifyAccess = async (path) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const response = await axios.get(`${apiLoginHost}/api/verify-access`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          path,
        },
      });

      return response.data.access;
    } catch (error) {
      console.error("Error verifying access:", error);
      return false;
    }
  };

  // Function to handle routing
  const handleRoute = async (path) => {
    const access = await verifyAccess(path);
    if (access) {
      navigate(path);
    } else {
      alert("You do not have access to this path");
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <div className="login-card">
          <img src="/student_logo.png" alt="Student Logo" className="fixed-size-image" />
          <h2>IQAC Portal</h2>
          {!token ? (
            <>
              <button className="google-btn" onClick={googleAuth}>
                <img src="/image8-2.png" alt="Google Logo" className="google-logo" />
                <span className="text">Sign in with Google</span>
              </button>
              <div className='para'>
                <p>Sign in using your BITsathy account</p>
              </div>
            </>
          ) : (
            <div>
              <p>You are logged in!</p>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
              {/* Add buttons for routes as an example */}
              <button onClick={() => handleRoute('/dashboard')}>Dashboard</button>
              <button onClick={() => handleRoute('/some-protected-route')}>Some Protected Route</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
