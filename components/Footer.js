import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <footer className="bg-dark fixed-bottom">
            <div className="container text-center">
                <section >
                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="#!"
                        role="button"
                    ><FontAwesomeIcon icon={faFacebook} size="2x" /></a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="#!"
                        role="button"
                    ><FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="#!"
                        role="button"
                    ><FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="https://github.com/AntonMariadas/"
                        role="button"
                    ><FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="https://www.linkedin.com/in/anton-m-172a161b0/"
                        role="button"
                    ><FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                </section>

                <section className="text-white">2022 © MyITJob - Mentions légales
                </section>
            </div>
        </footer>
    );
};

export default Footer;