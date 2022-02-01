import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from "axios";


const ManageCompanies = () => {
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;
    const [companies, setCompanies] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = () => {
        axios.get(`${nodeJsApi}/api/companies`)
            .then(res => setCompanies(res.data))
            .catch(err => console.log(err));
    };

    const deleteCompany = (id) => {
        axios.delete(`${nodeJsApi}/api/companies/${id}`)
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
                        <th scope="col">Adresse</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Siret</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Alternance</th>
                        <th scope="col">Localisation</th>
                        <th scope="col">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => {
                        return (
                            <tr className="table-light" key={index}>
                                <th scope="row">{company.name}</th>
                                <td>{company.naf_text}</td>
                                <td>{company.matched_rome_label}</td>
                                <td>{company.address.toLowerCase()}</td>
                                <td>{company.headcount_text}</td>
                                <td>{company.siret}</td>
                                <td>{company.contact_mode}</td>
                                <td>{company.alternance ? "Oui" : "Non"}</td>
                                <td>
                                    <span className="badge bg-primary rounded-pill">lat</span>{company.lat} <br />
                                    <span className="badge bg-primary rounded-pill">lng</span>{company.lon}
                                </td>
                                <td className="text-warning"><FontAwesomeIcon icon={faStar} /> {company.stars}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCompanies;