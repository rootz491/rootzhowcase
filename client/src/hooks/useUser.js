import decode from "jwt-decode";
import useAuth from "./useAuth";

export default () => {
    try {
        const auth = useAuth();
        if (auth) {
            const token = localStorage.getItem("authToken");
            const data = decode(token);
            return data;
        }
    } catch (error) {
        return false
    }
}