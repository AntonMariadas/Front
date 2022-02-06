import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';


const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);


    const logoutUser = () => {
        if (!isAuthenticated) {
            return;
        }
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser({});
        router.push('/connexion');
    };

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                <a className="navbar-brand">MyItJob</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link">Accueil</a>
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link href="/jobs">
                                    <a className="nav-link">Jobs</a>
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link href="/liens">
                                <a className="nav-link">Liens utiles</a>
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link href="/favoris">
                                    <a className="nav-link">Favoris</a>
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && user.role === "ADMIN" && (
                            <li className="nav-item">
                                <Link href="/administration">
                                    <a className="nav-link">Administration</a>
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <Link href="/inscription">
                                    <a className="nav-link">Inscription</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-md-auto">
                        {!isAuthenticated ?
                            (
                                <li className="nav-item">
                                    <Link href="/connexion">
                                        <a className="nav-link">Connexion</a>
                                    </Link>
                                </li>
                            ) :
                            (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href='' onClick={logoutUser}>Déconnexion</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/profil">
                                            <a className="btn text-light" style={{ backgroundColor: 'CornflowerBlue' }}>{user.firstName}</a>
                                        </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Navbar;