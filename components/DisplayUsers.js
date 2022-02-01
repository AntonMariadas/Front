import { faUserSlash, faUserMinus, faBookmark, faUserPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import axios from "axios";


const DisplayUsers = ({ setSelectedUserId, setIsDisplayHistory }) => {
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const { authToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        getUsers();
    }, [rerender]);

    const getUsers = () => {
        axios.get(`${springBootApi}/api/v1/accounts`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    };

    const upgradeUser = (id) => {
        axios.put(`${springBootApi}/api/v1/accounts/${id}/upgrade`, {}, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => {
                setRerender(!rerender);
            })
            .catch(err => console.log(err));
    };

    const downgradeUser = (id) => {
        axios.put(`${springBootApi}/api/v1/accounts/${id}/downgrade`, {}, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => {
                setRerender(!rerender);
            })
            .catch(err => console.log(err));
    };

    const deleteUser = (id) => {
        axios.delete(`${springBootApi}/api/v1/accounts/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then((res) => {
                console.log(res);
                setRerender(!rerender);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Géolocalisation</th>
                        <th scope="col">Profil</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr className="table-light" key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.number} {user.road} <br /> {user.postCode} {user.city}</td>
                                <td>
                                    <span className="badge bg-primary rounded-pill">lat</span> {user.latitude} <br />
                                    <span className="badge bg-primary rounded-pill">lng</span> {user.longitude}
                                </td>
                                <td>{user.profile.toUpperCase()}</td>
                                <td>
                                    {user.role === "USER" ?
                                        (<button className="btn btn-info btn-sm">{user.role}</button>) :
                                        (<button className="btn btn-success btn-sm">{user.role}</button>)
                                    }
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                                        setSelectedUserId(user.id);
                                        setIsDisplayHistory(false);
                                    }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                    <button type="button" className="btn btn-outline-warning btn-sm" onClick={() => {
                                        setSelectedUserId(user.id);
                                        setIsDisplayHistory(true);
                                    }}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                    <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => deleteUser(user.id)}>
                                        <FontAwesomeIcon icon={faUserSlash} />
                                    </button>
                                    {user.role === "USER" ?
                                        (
                                            <button type="button" className="btn btn-outline-success btn-sm" onClick={() => upgradeUser(user.id)}>
                                                <FontAwesomeIcon icon={faUserPlus} />
                                            </button>
                                        ) :
                                        (
                                            <button type="button" className="btn btn-outline-info btn-sm" onClick={() => downgradeUser(user.id)}>
                                                <FontAwesomeIcon icon={faUserMinus} />
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayUsers;