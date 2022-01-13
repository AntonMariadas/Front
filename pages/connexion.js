import Head from 'next/head';
import { useForm } from 'react-hook-form';

const connexion = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginUser = () => {
        alert('Salut didi');
    };

    return (
        <>
            <Head>
                <title>Connexion</title>
                <meta name="job informatique" content="connexion" />
            </Head>
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="login2.svg" className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">

                            <form onSubmit={handleSubmit(loginUser)}>
                                <div className="form-floating mb-3">
                                    <h2 className="fw-bold">Login</h2>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className={`form-control text-center ${errors.email ? 'is-invalid' : ''}`} id="email"
                                        {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && errors.email.type == "required" && <span class="badge bg-danger">L'email est requis</span>}
                                    {errors.email && errors.email.type == "pattern" && <span class="badge bg-warning">Vérifiez votre email</span>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className={`form-control text-center ${errors.password ? 'is-invalid' : ''}`} id="password"
                                        {...register('password', { required: true })} />
                                    <label htmlFor="password">Mot de passe</label>
                                    {errors.password && errors.password.type == "required" && <span class="badge bg-danger">Le mot de passe est requis</span>}
                                </div>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-lg btn-primary" type="submit">OK</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default connexion;