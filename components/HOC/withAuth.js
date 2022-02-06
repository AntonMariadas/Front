import { useRouter } from "next/router";
import { useContext } from 'react';
import AuthContext from "../../context/AuthContext";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { authToken } = useContext(AuthContext);

        if (typeof window !== "undefined") {
            const router = useRouter();

            if (!authToken) {
                router.replace("/");
                return null;
            }

            return <WrappedComponent {...props} />;
        }

        return null;
    };
};

export default withAuth;