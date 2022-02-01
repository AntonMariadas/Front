import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";
import History from "../components/History";
import WithAuth from '../components/HOC/withAuth';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const profil = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="my-5">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#home">Profil</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#profile">Modifier</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#history">Historique</a>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active show" id="home">
                    <ViewProfile />
                </div>
                <div className="tab-pane fade" id="profile">
                    <EditProfile />
                </div>
                <div className="tab-pane fade" id="history">
                    <History idUser={user.id} />
                </div>
            </div>
        </div>
    );
};

export default WithAuth(profil);