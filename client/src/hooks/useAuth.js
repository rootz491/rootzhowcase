import decode from "jwt-decode";
import useReset from "./useReset";

export default async () => {

    const authToken = localStorage.getItem("authToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    // if (!authToken || !refreshToken) return false;
    if (!authToken) return false;
    try {
        // const { exp } = decode(refreshToken)
        const { exp } = await decode(authToken)

        if (exp < new Date().getTime() / 1000) {
            useReset();
            return false;
        } 
    } catch (error) {
        return false;
    }
    return true;
}