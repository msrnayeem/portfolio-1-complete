import React from 'react';
import NavigationAdmin from './NavigationAdmin.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
    return (
        <>
            <NavigationAdmin />
            {children}
            <Footer />
        </>
    );
};

export default Layout;