import { useRouter } from "next/router";
import { useContext } from 'react';
import AuthContext from "../../context/AuthContext";

const withAdminRole = (WrappedComponent) => {
    return (props) => {
        const { authToken, user } = useContext(AuthContext);

        // vérifie si je suis bien coté client
        if (typeof window !== "undefined") {
            const router = useRouter();

            if (!authToken || user.role !== "ADMIN") {
                router.replace("/");
                return null;
            }

            return <WrappedComponent {...props} />;
        }

        // si je suis côté serveur
        return null;
    };
};

export default withAdminRole;