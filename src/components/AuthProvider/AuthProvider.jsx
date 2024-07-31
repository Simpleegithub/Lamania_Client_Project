"use client"

import { SessionProvider } from "next-auth/react"
import PropTypes from 'prop-types';  // If you're using PropTypes for prop validation

function AuthProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
