import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
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