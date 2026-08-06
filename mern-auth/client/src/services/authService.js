import axiosInstance from "../utils/axiosInstance";

const register = (userData) => {

    return axiosInstance.post(
        "/auth/register",
        userData
    );

};

const login = (userData) => {

    return axiosInstance.post(
        "/auth/login",
        userData
    );

};

const getProfile = () => {

    return axiosInstance.get("/auth/profile");

};

export default {

    register,

    login,

    getProfile

};