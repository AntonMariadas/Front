import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Accordeon = ({ job }, deleteFromFavorite, applyToJob) => {

    return (
        <div className="accordion" id="accordionExample" key={job.id}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${job.id}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${job.id}`} aria-expanded="true" aria-controls={`collapse${job.id}`}>
                        {job.name} - le xx/xx/xx
                    </button>
                </h2>
                <div id={`collapse${job.id}`} className="accordion-collapse collapse show" aria-labelledby={`heading${job.id}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <h5 className="text-muted">{job.field} | {job.profile}</h5>
                        <span className="badge bg-dark">Adresse</span>
                        <h6>{job.address}</h6>
                        <span className="badge bg-dark">Contact</span>
                        <h6>{job.contactMode}</h6>
                        <p><span className="badge rounded-pill alert-primary">Alternance</span> {job.alternance ? "Oui" : "Non"}</p>
                        <p><span className="badge rounded-pill alert-primary">Siret</span> {job.siret}</p>
                        <p><span className="badge rounded-pill alert-primary">Taille</span> {job.size}</p>
                        <p className="text-warning">
                            <span className="badge rounded-pill alert-primary">Note</span>
                            {job.stars} <FontAwesomeIcon icon={faStar} />
                        </p>
                        <a href={job.website} target="blank">
                            <span className="badge rounded-pill alert-primary">Site web</span>
                            {job.website}
                        </a> <br />
                        <div className="btn-group mt-4" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger btn-sm" onClick={deleteFromFavorite}>Supprimer</button>
                            <button type="button" className="btn btn-success btn-sm" onClick={applyToJob}>Date de candidature</button>
                            <button type="button" className="btn btn-info btn-sm">Date de relance</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordeon;