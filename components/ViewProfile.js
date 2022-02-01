import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const ViewProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='text-center'>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{user.firstName} {user.lastName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                    <p className="card-text">
                        {user.number} {user.road} <br />
                        {user.postCode} {user.city}
                    </p>
                    <h6 className="text-primary">{(user.profile).toUpperCase()}</h6>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;