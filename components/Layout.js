import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Layout = ({ children }) => {
    const { setIsAuthenticated, setUser, setAuthToken } = useContext(AuthContext);

    useEffect(() => {
        let connectedUser = JSON.parse(localStorage.getItem('user'));
        setUser(connectedUser);
        let isAuth = JSON.parse(sessionStorage.getItem('isAuthenticated'));
        setIsAuthenticated(isAuth);
        let authToken = JSON.parse(sessionStorage.getItem('authToken'));
        setAuthToken(authToken);
    }, []);

    return (
        <div>
            <Navbar />

            <main className="container py-5">
                {children}
            </main>

            <Footer />
        </div>

    );
};

export default Layout;