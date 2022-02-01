import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Card = ({ name, naf_text, id, address, headcount_text, contact_mode, stars }) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <div className="col-md-4 my-3">
            <div className="card bg-secondary">
                <div className="card-header p-2 alert-primary d-flex justify-content-around">
                    <h5 className="m-0 ">
                        {name}
                    </h5>
                    <span style={{ color: 'GoldenRod' }}>
                        {stars}<FontAwesomeIcon icon={faStar} />
                    </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">{naf_text}</h5>
                    <p className="">
                        <span className="badge rounded-pill alert-primary">Adresse</span> <br />
                        {capitalizeFirstLetter(address)} <br />
                        <span className="badge rounded-pill alert-primary">Taille</span> <br />
                        {headcount_text} <br />
                        <span className="badge rounded-pill alert-primary">Contact</span> <br />
                        {contact_mode}
                    </p>
                    <div className="text-center">
                        <Link href="/jobs/[id]" as={`/jobs/${id}`}>
                            <button type="button" className="btn btn-primary btn-sm">Voir l'offre</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Card;