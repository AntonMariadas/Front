import Head from 'next/head';
import { useForm } from 'react-hook-form';


const inscription = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const registerUser = () => {
        alert('Salut didi');
    };

    return (
        <>
            <Head>
                <title>Inscription</title>
                <meta name="job informatique" content="inscription" />
            </Head>

            <section className="h-100 h-custom gradient-custom-2">
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
                            <div className="col-12">
                                <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-0">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <h3 className="fw-bold mb-5">Identité</h3>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 pb-2">
                                                            <div className="form-outline">
                                                                <label htmlFor="lastname">Nom</label>
                                                                <input type="text" id="lastname" className={`form-control form-control-md ${errors.lastname ? 'is-invalid' : ''}`}
                                                                    {...register('lastname', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.lastname && errors.lastname.type == "required" && <span class="badge bg-danger">Le nom est requis</span>}
                                                                {errors.lastname && errors.lastname.type == "minLength" && <span class="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4 pb-2">
                                                            <div className="form-outline">
                                                                <label htmlFor="firstname">Prénom</label>
                                                                <input type="text" id="firstname" className={`form-control form-control-md ${errors.firstname ? 'is-invalid' : ''}`}
                                                                    {...register('firstname', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.firstname && errors.firstname.type == "required" && <span class="badge bg-danger">Le prénom est requis</span>}
                                                                {errors.firstname && errors.firstname.type == "minLength" && <span class="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="email">Email</label>
                                                            <input type="text" id="email" className={`form-control form-control-md ${errors.email ? 'is-invalid' : ''}`}
                                                                {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                                            />
                                                            {errors.email && errors.email.type == "required" && <span class="badge bg-danger">L'email est requis</span>}
                                                            {errors.email && errors.email.type == "pattern" && <span class="badge bg-warning">Format incorrect</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="password">Mot de passe</label>
                                                            <input type="password" id="password" className={`form-control form-control-md ${errors.password ? 'is-invalid' : ''}`}
                                                                {...register('password', { required: true, minLength: 8 })}
                                                            />
                                                            {errors.password && errors.password.type == "required" && <span class="badge bg-danger">Le mot de passe est requis</span>}
                                                            {errors.password && errors.password.type == "minLength" && <span class="badge bg-warning">Huit caractères minimum</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="confirmPassword">Confirmation</label>
                                                            <input type="password" id="confirmPassword" className={`form-control form-control-md ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                                {...register('confirmPassword', { required: true, validate: value => value == watch('password') })}
                                                            />
                                                            {errors.confirmPassword && errors.confirmPassword.type == "required" && <span class="badge bg-danger">La confirmation est requise</span>}
                                                            {errors.confirmPassword && errors.confirmPassword.type !== "required" && <span class="badge bg-warning">Les mots de passe doivent être identiques</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline">
                                                            <label htmlFor="email">Poste recherché</label>
                                                            <select class="form-select form-select-md">
                                                                <option value="M1801">Administration de systèmes d'information</option>
                                                                <option value="M1806">Conseil et maîtrise d'ouvrage en systèmes d'information</option>
                                                                <option value="K1903">Défense et conseil juridique</option>
                                                                <option value="M1803">Direction des systèmes d'information</option>
                                                                <option value="M1805">Etudes et développement informatique</option>
                                                                <option value="M1802">Expertise et support en systèmes d'information</option>
                                                                <option value="I1401">Maintenance informatique et bureautique</option>
                                                                <option value="M1810">Production et exploitation de systèmes d'information</option>
                                                                <option value="H1207">Rédaction technique</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6" style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px', background: 'lavender' }}>
                                                <div className="p-5">
                                                    <h3 className="fw-bold mb-5">Adresse</h3>

                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-white">
                                                            <label htmlFor="number">Numéro</label>
                                                            <input type="text" id="number" className={`form-control form-control-md ${errors.number ? 'is-invalid' : ''}`}
                                                                {...register('number', { required: true, min: 1 })}
                                                            />
                                                            {errors.number && errors.number.type == "required" && <span class="badge bg-danger">Le numéro est requis</span>}
                                                            {errors.number && errors.number.type == "min" && <span class="badge bg-warning">Numéro supérieur à 0 attendu</span>}
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 pb-2">
                                                        <div className="form-outline form-white">
                                                            <label htmlFor="road">Nom de la voie</label>
                                                            <input type="text" id="road" className={`form-control form-control-md ${errors.road ? 'is-invalid' : ''}`}
                                                                {...register('road', { required: true, minLength: 2 })}
                                                            />
                                                            {errors.road && errors.road.type == "required" && <span class="badge bg-danger">La voie est requise</span>}
                                                            {errors.road && errors.road.type == "minLength" && <span class="badge bg-warning">Deux caractères minimum</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-5 mb-4 pb-2">
                                                            <div className="form-outline form-white">
                                                                <label htmlFor="postCode">Code postal</label>
                                                                <input type="text" id="postCode" className={`form-control form-control-md ${errors.postCode ? 'is-invalid' : ''}`}
                                                                    {...register('postCode', { required: true, min: 11111, max: 99999 })}
                                                                />
                                                                {errors.postCode && errors.postCode.type == "required" && <span class="badge bg-danger">Le code postal est requis</span>}
                                                                {errors.postCode && errors.postCode.type == "min" && <span class="badge bg-warning">Cinq chiffres attendus</span>}
                                                                {errors.postCode && errors.postCode.type == "max" && <span class="badge bg-warning">Cinq chiffres attendus</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 mb-4 pb-2">
                                                            <div className="form-outline form-white">
                                                                <label htmlFor="city">Ville</label>
                                                                <input type="text" id="city" className={`form-control form-control-md ${errors.city ? 'is-invalid' : ''}`}
                                                                    {...register('city', { required: true, minLength: 2 })}
                                                                />
                                                                {errors.city && errors.city.type == "required" && <span class="badge bg-danger">Le code postal est requis</span>}
                                                                {errors.city && errors.city.type == "minLength" && <span class="badge bg-warning">Deux caractères minimum</span>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="d-grid gap-2 mt-4">
                                                        <button class="btn btn-lg btn-primary" type="submit">Envoyer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default inscription;