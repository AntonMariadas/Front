import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const FailureModal = ({ message }) => {
    return (
        <div className="alert alert-dismissible alert-danger text-center mt-5">
            <strong>{message}  </strong>
            <FontAwesomeIcon icon={faTimes} />
        </div>
    );
};

export default FailureModal;