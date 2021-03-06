import decode from "jwt-decode";
import useReset from "./useReset";

export default () => {

    const authToken = localStorage.getItem("authToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    // if (!authToken || !refreshToken) return false;
    if (!authToken) return false;
    try {
        // const { exp } = decode(refreshToken)
        const { exp } = decode(authToken);

        if (exp < new Date().getTime() / 1000) {
            useReset();
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}