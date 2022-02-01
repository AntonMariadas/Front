
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import axios from "axios";


const DisplayUserJobs = ({ idUser }) => {
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const { authToken } = useContext(AuthContext);
    const [userFavoriteJobs, setUserFavoriteJobs] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        getUserFavorites(idUser);
    }, [rerender]);

    const getUserFavorites = (id) => {
        axios.get(`${springBootApi}/api/v1/accounts/${id}/jobs`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(res => setUserFavoriteJobs(res.data))
            .catch(err => console.log(err));
    };

    const removeFromFavorites = (idUser, idJob) => {
        axios.delete(`${springBootApi}/api/v1/accounts/${idUser}/jobs/${idJob}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => setRerender(!rerender))
            .catch(err => console.log(err));
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Entreprise</th>
                        <th scope="col">Domaine</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Alternance</th>
                        <th scope="col">Localisation</th>
                        <th scope="col">Note</th>
                        <th scope="col">Favoris</th>
                        <th scope="col">Candidature</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userFavoriteJobs.map((job, index) => {
                        return (
                            <tr className="table-light" key={index}>
                                <th scope="row">{job.name}</th>
                                <td>{job.field}</td>
                                <td>{job.address.toLowerCase()}</td>
                                <td>{job.size}</td>
                                <td>{job.contactMode}</td>
                                <td>{job.alternance ? "Oui" : "Non"}</td>
                                <td>
                                    <span className="badge bg-primary rounded-pill">lat</span>{job.latitude} <br />
                                    <span className="badge bg-primary rounded-pill">lng</span>{job.longitude}
                                </td>
                                <td className="text-warning"><FontAwesomeIcon icon={faStar} /> {job.stars}</td>
                                <td>{job.addedDate}</td>
                                <td>
                                    <span className="text-success">{job.applicationDate}</span> <br />
                                    <span className="text-danger">{job.relaunchDate}</span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeFromFavorites(idUser, job.id)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayUserJobs;