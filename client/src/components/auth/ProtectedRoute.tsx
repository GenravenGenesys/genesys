import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "./AuthProvider";


interface ProtectedRouteProps {
    allowedRoles: ('DM' | 'PLAYER')[];
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { role } = useContext(AuthContext);
    return allowedRoles.includes(role as any) ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
