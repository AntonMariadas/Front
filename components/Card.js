import Link from "next/link";

const Card = ({ job }) => {
    return (
        <div className="col-md-4 my-3">
            <div className="card bg-secondary">
                <div className="card-header text-center p-2">
                    <h4 className="m-0">
                        {job.header}
                    </h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title m-0 text-decoration-underline">{job.title}</h5>
                    <p className="card-text">{job.text}</p>
                    <div className="text-center">
                        <Link href="/jobs/[id]" as={`/jobs/${job.id}`}>
                            <button type="button" className="btn btn-primary btn-sm">Voir l'offre</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Card;