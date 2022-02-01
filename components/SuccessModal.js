import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const SuccessModal = ({ message }) => {
    return (
        <div className="alert alert-dismissible alert-success text-center mt-5">
            <strong>{message}  </strong>
            <FontAwesomeIcon icon={faCheck} />
        </div>);
};

export default SuccessModal;