import axios from "axios";

export const axiosInst = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: true,  //allow sending cookies in every request
});
