import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faGitlab } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <footer className="bg-dark fixed-bottom">
            <div className="container text-center">
                <section >
                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="https://gitlab.com/mariadasanton27"
                        target="_blank"
                        role="button"
                    ><FontAwesomeIcon icon={faGitlab} size="2x" />
                    </a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="https://github.com/AntonMariadas/"
                        target="_blank"
                        role="button"
                    ><FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>

                    <a
                        className="btn btn-floating m-1 link-primary"
                        href="https://www.linkedin.com/in/anton-m-172a161b0/"
                        target="_blank"
                        role="button"
                    ><FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                </section>

                <section className="text-white">{new Date().getFullYear()} © MyITJob - Mentions légales
                </section>
            </div>
        </footer>
    );
};

export default Footer;