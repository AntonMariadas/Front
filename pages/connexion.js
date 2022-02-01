import axios from 'axios';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import FailureModal from '../components/FailureModal';
import { useRouter } from 'next/router';


const connexion = () => {
    const router = useRouter();
    const [showFailureModal, setShowFailureModal] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { isAuthenticated, setIsAuthenticated, setUser, setAuthToken } = useContext(AuthContext);
    const springBootApi = process.env.NEXT_PUBLIC_SPRINGBOOT_API;


    const getUserInfo = async (email, authToken) => {
        try {
            const res = await axios.get(`${springBootApi}/api/v1/accounts/user?email=${email}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    };

    const loginUser = async (data) => {
        let loginInfo = {
            email: data.email,
            password: data.password
        };

        if (isAuthenticated) {
            return;
        }

        try {
            const res = await axios.post(`${springBootApi}/api/v1/accounts/login`, loginInfo);
            sessionStorage.removeItem("authToken");
            sessionStorage.setItem("authToken", JSON.stringify(res.data.jwtToken));

            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.setItem("isAuthenticated", JSON.stringify(true));

            let connectedUser = await getUserInfo(data.email, res.data.jwtToken);
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(connectedUser));

            setUser(connectedUser);
            setIsAuthenticated(true);
            setAuthToken(res.data.jwtToken);
            reset();

            if (connectedUser.role === "USER") {
                router.push('/jobs');
            }
            else if (connectedUser.role === "ADMIN") {
                router.push('/administration');
            }
        }
        catch (err) {
            console.log(err);
            setShowFailureModal(true);
            setTimeout(() => {
                setShowFailureModal(false);
            }, 2000);
        }
    };

    return (
        <>
            <Head>
                <title>Connexion</title>
                <meta name="job informatique" content="connexion" />
            </Head>
            <section className="vh-100 py-5">
                <div className="container h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="login2.svg" className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">

                            <form onSubmit={handleSubmit(loginUser)}>
                                <div className="form-floating mb-3">
                                    <h2 className="fw-bold">Connexion</h2>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className={`form-control text-center ${errors.email ? 'is-invalid' : ''}`} id="email"
                                        {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && errors.email.type == "required" && <span className="badge bg-danger">L'email est requis</span>}
                                    {errors.email && errors.email.type == "pattern" && <span className="badge bg-warning">Vérifiez votre email</span>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className={`form-control text-center ${errors.password ? 'is-invalid' : ''}`} id="password"
                                        {...register('password', { required: true })} />
                                    <label htmlFor="password">Mot de passe</label>
                                    {errors.password && errors.password.type == "required" && <span className="badge bg-danger">Le mot de passe est requis</span>}
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-lg btn-primary" type="submit">OK</button>
                                </div>

                                {showFailureModal && <FailureModal message="Echec de la connexion" />}
                            </form>

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default connexion;