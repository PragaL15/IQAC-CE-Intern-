// import React, { useEffect, useState } from 'react';
// import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const [isAuthorized, setIsAuthorized] = useState(null);
//   const [accessibleRoutes, setAccessibleRoutes] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const checkAuthorization = async () => {
//       try {
//         const resourceResponse = await axios.get('http://localhost:5000/api/roles-resources', { withCredentials: true });
//         if (resourceResponse.status === 200) {
//           const datas = resourceResponse.data.map(resource => resource.path);
//           setAccessibleRoutes(datas)
//           setIsAuthorized(true);
//           console.log("protected Route :"+ datas);
          
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           setIsAuthorized(false);
//         } else {
//           console.error('Error checking authorization:', error);
//         }
//       }
//     };

//     checkAuthorization();
//   }, []);

//   if (isAuthorized === null) {
//     return <div>Loading...</div>;
//   }

//   const currentPath = location.pathname;

//   if (!accessibleRoutes.includes(currentPath)) {
//     return <Navigate to="/404" />;
//   }

//   return isAuthorized ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;

//------------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [authorizedRoutes, setAuthorizedRoutes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const resourceResponse = await axios.get('http://localhost:5000/api/roles-resources', { withCredentials: true });
        if (resourceResponse.status === 200) {
          const datas = resourceResponse.data.map(resource => resource.path);
          setAuthorizedRoutes(datas)
          setIsAuthorized(true);
          console.log("protected Route :"+ datas);
          
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthorized(false);
        } else {
          console.error('Error checking authorization:', error);
        }
      }
    };

    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  const isRouteAuthorized = authorizedRoutes.includes(location.pathname);

  return isAuthorized && isRouteAuthorized ? <Outlet /> : <Navigate to={isAuthorized ? "/404" : "/"} />;
};

export default ProtectedRoute;