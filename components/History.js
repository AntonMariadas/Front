import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const History = ({ idUser }) => {
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const { authToken } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        axios.get(`${springBootApi}/api/v1/accounts/${idUser}/history`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(res => setApplications(res.data))
            .catch(err => console.log(err));
    }, [rerender]);

    const deleteApplication = (id) => {
        axios.delete(`${springBootApi}/api/v1/accounts/${idUser}/history/${id}`, {
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
                        <th scope="col">Profil</th>
                        <th scope="col">Siret</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Site</th>
                        <th scope="col">Candidaté</th>
                        <th scope="col">Relancé</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => {
                        return (
                            <tr className="table-light" key={application.id}>
                                <th scope="row">{application.name}</th>
                                <td>{application.field}</td>
                                <td>{application.profile}</td>
                                <td>{application.siret}</td>
                                <td>{application.address.toLowerCase()}</td>
                                <td>{application.website ? application.website : "Non communiqué"}</td>
                                <td className="text-success">{application.applicationDate}</td>
                                <td className="text-danger">{application.relaunchDate}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteApplication(application.id)}>
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

export default History;