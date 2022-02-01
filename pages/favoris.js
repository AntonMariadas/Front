import axios from 'axios';
import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faEraser, faStar, faTimes, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import withAuth from '../components/HOC/withAuth';


const favoris = () => {
    const { user, authToken } = useContext(AuthContext);
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const [favoriteJobs, setFavoriteJobs] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [number, setNumber] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showFailure, setShowFailure] = useState(false);
    const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        axios.get(`${springBootApi}/api/v1/accounts/${user.id}/jobs`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(res => {
                setFavoriteJobs(res.data);
            })
            .catch(err => console.log(err));
    }, [rerender]);


    const removeFromFavorites = (id) => {
        axios.delete(`${springBootApi}/api/v1/accounts/${user.id}/jobs/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => setRerender(!rerender))
            .catch(err => console.log(err));
    };

    const toggleDatePicker = (id) => {
        setShowCalendar(!showCalendar);
        setNumber(id);
    };

    const pickApplicationDate = (id) => {
        toggleDatePicker(id);
        setNumber(id);
        let selectedDate = moment(date).format('DD-MM-YYYY');
        const payload = {
            applicationDate: selectedDate
        };

        axios.put(`${springBootApi}/api/v1/accounts/${user.id}/jobs/${id}`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => {
                setRerender(!rerender);
            })
            .catch(err => console.log(err));
    };

    const removeApplicationDate = (id) => {
        const payload = {
            applicationDate: ""
        };
        axios.put(`${springBootApi}/api/v1/accounts/${user.id}/jobs/${id}/unapply`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => {
                setRerender(!rerender);
            })
            .catch(err => console.log(err));
    };

    const moveToHistory = async (id) => {
        const res = await axios.get(`${springBootApi}/api/v1/accounts/${user.id}/jobs/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        let job = res.data;

        if ((!job.applicationDate || job.applicationDate === "") || (!job.relaunchDate || job.relaunchDate === "")) {
            setShowFailure(true);
            setNumber(id);
            setTimeout(() => {
                setShowFailure(false);
            }, 3000);
            return;
        }

        let payload = {
            name: job.name,
            identifier: job.identifier,
            field: job.field,
            profile: job.profile,
            siret: job.siret,
            website: job.website,
            address: job.address,
            applicationDate: job.applicationDate,
            relaunchDate: job.relaunchDate
        };

        axios.post(`${springBootApi}/api/v1/accounts/${user.id}/history`, payload, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then(() => removeFromFavorites(id))
            .catch(err => console.log(err));
    };

    return (
        <div className="py-5 text-center">
            <Head>
                <title>Favoris</title>
            </Head>
            <section className='my-5'>
                {favoriteJobs.map(job => {
                    return (
                        <div className="accordion" id="accordionExample" key={job.id}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${job.id}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${job.id}`} aria-expanded="true" aria-controls={`collapse${job.id}`}>
                                        {job.name} - ajouté le {job.addedDate}
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
                                        <p>
                                            <span className="badge rounded-pill alert-primary">Site web</span>
                                            {job.website ?
                                                (<a href={job.website} target="blank">{job.website}</a>)
                                                :
                                                "Non communiqué"}
                                        </p>
                                        {job.applicationDate && (
                                            <p className='text-primary fw-bold'><span className="badge rounded-pill alert-primary">Candidaté</span> {job.applicationDate}<button type='button' className="btn btn-outline btn-sm" onClick={() => removeApplicationDate(job.id)}> <FontAwesomeIcon icon={faEraser} /></button></p>
                                        )}
                                        {job.relaunchDate && (
                                            <p className='text-danger fw-bold'><span className="badge rounded-pill alert-danger">Relance</span> {job.relaunchDate}</p>
                                        )}
                                        {showCalendar && number == job.id && (
                                            <div className='d-flex justify-content-center mt-3'>
                                                <div>
                                                    <div className='calendar-container'>
                                                        <Calendar
                                                            onChange={setDate}
                                                            value={date}
                                                            maxDate={new Date()}
                                                        />
                                                    </div>
                                                    <p className='text-center text-primary fw-bold'>
                                                        {date.toLocaleDateString("fr-FR", OPTIONS)}
                                                        <button className='btn btn-primary btn-sm mx-3' onClick={() => pickApplicationDate(job.id)}>OK</button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeFromFavorites(job.id)}><FontAwesomeIcon icon={faTimes} /></button>
                                            <button type="button" className="btn btn-outline-success btn-sm" onClick={() => toggleDatePicker(job.id)}><FontAwesomeIcon icon={faCalendarAlt} /></button>
                                            <button type="button" className="btn btn-outline-info btn-sm" onClick={() => moveToHistory(job.id)}><FontAwesomeIcon icon={faCalendarCheck} /></button>
                                        </div>
                                        {showFailure && number == job.id && (
                                            <div className="alert alert-dismissible alert-danger text-center my-0">
                                                <strong>La candidature et la relance doivent être complètes </strong>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

        </div>
    );
};



export default withAuth(favoris);