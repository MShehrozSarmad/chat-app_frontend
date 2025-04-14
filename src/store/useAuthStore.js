import { axiosInst } from "@/lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
	authUser: null,
	isSigingup: false,
	isLoggingin: false,
	isUpdatingProfie: false,

	isSigningup: true,
	isSigningin: true,
	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const res = await axiosInst.get("/auth/check-auth");
			set({ authUser: res.data });
		} catch (error) {
			console.log("error in check auth", error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		try {
			const res = await axiosInst.post("/auth/signup", data);
			set({ authUser: res.data });
			toast.success("Account created successfully");
		} catch (error) {
			console.log("error signing up", error);
			toast.error(error.response.data.message);
		}
	},

	signin: async (data) => {
		try {
			const res = await axiosInst.post("/auth/signin", data);
			set({ authUser: res.data });
			toast.success("Signed in successfully");
		} catch (error) {
			console.log("error signing in", error);
			toast.error(error.response.data.message);
		}
	},

	logout: async () => {
		try {
			const res = await axiosInst.post("/auth/signout");
			set({ authUser: null });
			toast.success("Sign out successfull");
		} catch (error) {
			console.log("error signing out", error);
			toast.error(error.response.data.message);
		}
	},

	updateProfiePic: async (data) => {
		try {
			console.log("api fired");
			const res = await axiosInst.put("/auth/update_profile", data);
			set({ authUser: res.data });
			toast.success("profile pic updated");
		} catch (error) {
			console.log("error updating profile picture", error);
			toast.error(error.response.data.message);
		}
	},
}));
