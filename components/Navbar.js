import Link from 'next/link';

const Navbar = () => {
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
                        <li className="nav-item">
                            <Link href="/jobs">
                                <a className="nav-link">Jobs</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/liens">
                                <a className="nav-link">Liens utiles</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/mon-espace">
                                <a className="nav-link">Mon espace</a>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <Link href="/inscription">
                                <a className="nav-link">Inscription</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/connexion">
                                <a className="nav-link">Connexion</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;