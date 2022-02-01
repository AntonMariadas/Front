import Head from 'next/head';
import ManageCompanies from '../components/ManageCompanies';
import ManageCompaniesByRome from '../components/ManageCompaniesByRome';
import DisplayUsers from '../components/DisplayUsers';
import DisplayUserJobs from '../components/DisplayUserJobs';
import { useState, useEffect } from 'react';
import withAdminRole from '../components/HOC/withAdminRole';
import History from '../components/History';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';


const administration = () => {
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [isDisplayUsers, setIsDisplayUsers] = useState(true);
    const [isDisplayHistory, setIsDisplayHistory] = useState(false);

    useEffect(() => {
        if (selectedUserId !== 0) {
            setIsDisplayUsers(false);
        } else {
            setIsDisplayUsers(true);
        }
    }, [selectedUserId]);


    return (
        <div className='my-5'>
            <Head>
                <title>Administration</title>
            </Head>

            <section>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-bs-toggle="tab" href="#users" onClick={() => setSelectedUserId(0)}>Utilisateurs</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Entreprises</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" data-bs-toggle="tab" href="#administration">Administration de système d'information</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#consultant">Conseil et maîtrise d'ouvrage en systèmes d'information</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#defense">Défense et conseil juridique</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#direction">Direction des systèmes d'information</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#developpement">Etudes et développement informatique</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#support">Expertise et support en systèmes d'information</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#maintenance">Maintenance informatique et bureautique</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#production">Production et exploitation de systèmes d'information</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#redaction">Rédaction technique</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#entreprises">Toutes les entreprises</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Graphiques</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" data-bs-toggle="tab" href="#bar">Entreprises par domaine</a>
                            <a className="dropdown-item" data-bs-toggle="tab" href="#pie">Entreprises par potentiel d'embauche</a>
                        </div>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active show" id="users">
                        {isDisplayUsers && (
                            <DisplayUsers setSelectedUserId={setSelectedUserId} setIsDisplayHistory={setIsDisplayHistory} />
                        )}

                        {!isDisplayUsers && !isDisplayHistory && (
                            <DisplayUserJobs idUser={selectedUserId} />
                        )}

                        {!isDisplayUsers && isDisplayHistory && (
                            <History idUser={selectedUserId} />
                        )}

                    </div>
                    <div className="tab-pane fade" id="entreprises">
                        <ManageCompanies />
                    </div>
                    <div className="tab-pane fade" id="administration">
                        <ManageCompaniesByRome label={"administration"} />
                    </div>
                    <div className="tab-pane fade" id="consultant">
                        <ManageCompaniesByRome label={"consultant"} />
                    </div>
                    <div className="tab-pane fade" id="defense">
                        <ManageCompaniesByRome label={"defense"} />
                    </div>
                    <div className="tab-pane fade" id="direction">
                        <ManageCompaniesByRome label={"direction"} />
                    </div>
                    <div className="tab-pane fade" id="developpement">
                        <ManageCompaniesByRome label={"developpement"} />
                    </div>
                    <div className="tab-pane fade" id="support">
                        <ManageCompaniesByRome label={"support"} />
                    </div>
                    <div className="tab-pane fade" id="maintenance">
                        <ManageCompaniesByRome label={"maintenance"} />
                    </div>
                    <div className="tab-pane fade" id="production">
                        <ManageCompaniesByRome label={"production"} />
                    </div>
                    <div className="tab-pane fade" id="redaction">
                        <ManageCompaniesByRome label={"redaction"} />
                    </div>
                    <div className="tab-pane fade" id="bar">
                        <PieChart />
                    </div>
                    <div className="tab-pane fade" id="pie">
                        <BarChart />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default withAdminRole(administration);