import Link from "next/link";
import { faArrowLeft, faHeart, faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import axios from 'axios';
import Map from '../../components/Map';
import RoutingMachine from '../../components/RoutingMachine';
import SuccessModal from "../../components/SuccessModal";
import FailureModal from "../../components/FailureModal";
import moment from "moment";
import withAuth from "../../components/HOC/withAuth";
import JobMarker from "../../components/JobMarker";
import UserMarker from "../../components/UserMarker";


const details = () => {
    const router = useRouter();
    let id = router.query.id;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;

    const { user, authToken } = useContext(AuthContext);
    const [job, setJob] = useState({});
    const [rating, setRating] = useState(0);
    const [displayRoute, setDisplayRoute] = useState(false);

    const defaultCenter = [48.8566, 2.3522];
    const [jobPosition, setJobPosition] = useState(defaultCenter);
    const [userPosition, setUserPosition] = useState(defaultCenter);

    useEffect(async () => {
        const res = await axios.get(`${nodeJsApi}/api/companies/${id}`);
        setJob(res.data);
        let perCentage = (res.data.stars) * 20;
        setRating(perCentage);
        setJobPosition([res.data.lat, res.data.lon]);
        setUserPosition([user.latitude, user.longitude]);
    }, []);

    const addToFavorites = () => {
        let addedDate = new Date();
        addedDate = moment(addedDate).format('DD-MM-YYYY');

        let favoriteJob = {
            name: job.name,
            identifier: job._id,
            field: job.naf_text,
            profile: job.matched_rome_label,
            siret: job.siret,
            website: job.website,
            stars: job.stars,
            address: job.address,
            alternance: job.alternance,
            contactMode: job.contact_mode,
            size: job.headcount_text,
            latitude: job.lat,
            longitude: job.lon,
            addedDate: addedDate
        };

        axios.post(`${springBootApi}/api/v1/accounts/${user.id}/jobs`, favoriteJob, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => {
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setShowFailureModal(true),
                    setTimeout(() => {
                        setShowFailureModal(false);
                    }, 2000);
            });
    };

    const showRoute = () => {
        setDisplayRoute(true);
    };

    return (
        <>
            <div className="py-5">
                <section className="my-5 d-flex flex-column align-items-center">
                    <Map style={{ width: '100%', height: '31rem' }} center={defaultCenter} zoom={10} scrollWheelZoom={false}>
                        {({ TileLayer, Marker, Popup, }) => (
                            <>
                                {displayRoute && (
                                    <RoutingMachine
                                        position={'topleft'}
                                        start={userPosition}
                                        end={jobPosition}
                                        color={'#757de8'}
                                        collapsible={true}
                                        autoRoute={true}
                                        language={'fr'}
                                    />
                                )}
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                                    attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                                />
                                <JobMarker position={jobPosition}>
                                    <Popup>
                                        {job.address}
                                    </Popup>
                                </JobMarker>
                                <UserMarker position={userPosition}>
                                    <Popup>
                                        Vous êtes ici !
                                    </Popup>
                                </UserMarker>
                            </>
                        )}
                    </Map>

                    <div className="my-4">
                        <h3 className="text-center">{job.name}</h3>
                        <h4 className="text-muted mb-4 text-center">{job.naf_text} | {job.matched_rome_label}</h4>
                        <h5>
                            <span className="badge bg-dark">Adresse</span> <br />
                            {job.address}
                        </h5>
                        <h5>
                            <span className="badge bg-dark">Taille</span> <br />
                            {job.headcount_text}
                        </h5>
                        <h5>
                            <span className="badge bg-dark">Contact</span> <br />
                            {job.contact_mode}
                        </h5>
                        <p>
                            <span className="badge bg-light">Alternance</span> <br />
                            {job.alternance ? "Oui" : "Non"}
                        </p>
                        <p>
                            <span className="badge bg-light">Siret</span> <br />
                            {job.siret}
                        </p>
                        <p>
                            <span className="badge bg-light">Localisation</span> <br />
                            {job.lat} - {job.lon}
                        </p>
                        <span className="badge bg-light">Note</span> <br />
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{ width: `${rating}%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div> <br />
                        <p>
                            <span className="badge bg-light">Site web</span> <br />
                            {job.website ?
                                (<a href={job.website} target="_blank" rel="noopener noreferrer">{job.website}</a>)
                                :
                                "Non communiqué"}
                        </p>
                    </div>
                    {showSuccessModal && <SuccessModal message="Ajouté aux favoris" />}
                    {showFailureModal && <FailureModal message="Déjà ajouté aux favoris" />}
                    <div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <Link href="/jobs">
                                <button type="button" className="btn btn-outline-dark">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </Link>
                            <button type="button" className="btn btn-outline-danger" onClick={addToFavorites}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button type="button" className="btn btn-outline-primary" onClick={showRoute}>
                                <FontAwesomeIcon icon={faRoute} />
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default withAuth(details);