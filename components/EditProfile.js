import Head from 'next/head';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import { useState, useContext } from 'react';
import axios from 'axios';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';



const EditProfile = () => {
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;
    const geocodeApiKey = process.env.NEXT_PUBLIC_GEOCODE_API_KEY;
    let authToken = JSON.parse(sessionStorage.getItem("authToken"));
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const preloadedValues = {
        lastName: user.lastName,
        firstName: user.firstName,
        profile: user.profile,
        number: user.number,
        road: user.road,
        city: user.city,
        postCode: user.postCode
    };
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: preloadedValues });
    watch();

    const geocodeAddress = async (number, road, postCode, city) => {
        const geocodeUrl = `http://api.positionstack.com/v1/forward?access_key=${geocodeApiKey}&query=${number} ${road} ${postCode} ${city}&country=FR`;

        try {
            const res = await axios.get(geocodeUrl);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    };

    const registerUser = async (data) => {
        let geocode = await geocodeAddress(data.number, data.road, data.postCode, data.city);
        let userNewInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: user.email,
            password: data.password,
            profile: data.profile,
            number: data.number,
            road: data.road,
            postCode: data.postCode,
            city: data.city,
            latitude: geocode.data[0].latitude,
            longitude: geocode.data[0].longitude
        };
        reset();

        axios.put(`${springBootApi}/api/v1/accounts/${user.id}`, userNewInfo, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })
            .then(() => {
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(userNewInfo));
                setUser(userNewInfo);

                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setShowFailureModal(true);
                setTimeout(() => {
                    setShowFailureModal(false);
                }, 2000);
            });
    };


    return (
        <div>
            <section className="h-100 h-custom gradient-custom-2">
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100 mb-5">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-5" style={{ background: 'lavender' }}>
                                                    <h3 className="fw-bold mb-5">Identité</h3>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">
                                                            <div className="form-outline">
                                                                <label htmlFor="lastName">Nom</label>
                                                                <input type="text" id="lastName" className={`form-control form-control-md ${errors.lastname ? 'is-invalid' : ''}`}
                                                                    {...register('lastName', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.lastName && errors.lastName.type == "required" && <span className="badge bg-danger">Le nom est requis</span>}
                                                                {errors.lastName && errors.lastName.type == "minLength" && <span className="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">
                                                            <div className="form-outline">
                                                                <label htmlFor="firstName">Prénom</label>
                                                                <input type="text" id="firstName" className={`form-control form-control-md ${errors.firstname ? 'is-invalid' : ''}`}
                                                                    {...register('firstName', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.firstName && errors.firstName.type == "required" && <span className="badge bg-danger">Le prénom est requis</span>}
                                                                {errors.firstName && errors.firstName.type == "minLength" && <span className="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="password">Mot de passe</label>
                                                            <input type="password" id="password" className={`form-control form-control-md ${errors.password ? 'is-invalid' : ''}`}
                                                                {...register('password', { required: true, minLength: 8 })}
                                                            />
                                                            {errors.password && errors.password.type == "required" && <span className="badge bg-danger">Le mot de passe est requis</span>}
                                                            {errors.password && errors.password.type == "minLength" && <span className="badge bg-warning">Huit caractères minimum</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="confirmPassword">Confirmation</label>
                                                            <input type="password" id="confirmPassword" className={`form-control form-control-md ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                                {...register('confirmPassword', { required: true, validate: value => value == watch('password') })}
                                                            />
                                                            {errors.confirmPassword && errors.confirmPassword.type == "required" && <span className="badge bg-danger">La confirmation est requise</span>}
                                                            {errors.confirmPassword && errors.confirmPassword.type !== "required" && <span className="badge bg-warning">Les mots de passe doivent être identiques</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="email">Poste recherché</label>
                                                            <select className="form-select form-select-md" {...register('profile')}>
                                                                <option value="administration">Administration de systèmes d'information</option>
                                                                <option value="consultant">Conseil et maîtrise d'ouvrage en systèmes d'information</option>
                                                                <option value="defense">Défense et conseil juridique</option>
                                                                <option value="direction">Direction des systèmes d'information</option>
                                                                <option value="developpement">Etudes et développement informatique</option>
                                                                <option value="support">Expertise et support en systèmes d'information</option>
                                                                <option value="maintenance">Maintenance informatique et bureautique</option>
                                                                <option value="production">Production et exploitation de systèmes d'information</option>
                                                                <option value="redaction">Rédaction technique</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6" style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                                                <div className="p-5">
                                                    <h3 className="fw-bold mb-5">Adresse</h3>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-white">
                                                            <label htmlFor="number">Numéro</label>
                                                            <input type="text" id="number" className={`form-control form-control-md ${errors.number ? 'is-invalid' : ''}`}
                                                                {...register('number', { required: true, min: 1 })}
                                                            />
                                                            {errors.number && errors.number.type == "required" && <span className="badge bg-danger">Le numéro est requis</span>}
                                                            {errors.number && errors.number.type == "min" && <span className="badge bg-warning">Numéro supérieur à 0 attendu</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-white">
                                                            <label htmlFor="road">Nom de la voie</label>
                                                            <input type="text" id="road" className={`form-control form-control-md ${errors.road ? 'is-invalid' : ''}`}
                                                                {...register('road', { required: true, minLength: 2 })}
                                                            />
                                                            {errors.road && errors.road.type == "required" && <span className="badge bg-danger">La voie est requise</span>}
                                                            {errors.road && errors.road.type == "minLength" && <span className="badge bg-warning">Deux caractères minimum</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-5 mb-4 pb-2">
                                                            <div className="form-outline form-white">
                                                                <label htmlFor="postCode">Code postal</label>
                                                                <input type="text" id="postCode" className={`form-control form-control-md ${errors.postCode ? 'is-invalid' : ''}`}
                                                                    {...register('postCode', { required: true, min: 11111, max: 99999 })}
                                                                />
                                                                {errors.postCode && errors.postCode.type == "required" && <span className="badge bg-danger">Le code postal est requis</span>}
                                                                {errors.postCode && errors.postCode.type == "min" && <span className="badge bg-warning">Cinq chiffres attendus</span>}
                                                                {errors.postCode && errors.postCode.type == "max" && <span className="badge bg-warning">Cinq chiffres attendus</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 mb-4 pb-2">
                                                            <div className="form-outline form-white">
                                                                <label htmlFor="city">Ville</label>
                                                                <input type="text" id="city" className={`form-control form-control-md ${errors.city ? 'is-invalid' : ''}`}
                                                                    {...register('city', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.city && errors.city.type == "required" && <span className="badge bg-danger">Le code postal est requis</span>}
                                                                {errors.city && errors.city.type == "minLength" && <span className="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-grid gap-2 mt-4">
                                                        <button className="btn btn-lg btn-primary" type="submit">Modifier</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showSuccessModal && <SuccessModal message="Profil mis à jour !" />}
                                {showFailureModal && <FailureModal message="Erreur lors de la mise à jour" />}
                            </div>
                        </div>
                    </div>
                </form>
            </section>

        </div>
    );
};

export default EditProfile;