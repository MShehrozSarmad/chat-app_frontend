import { axiosInst } from "@/lib/axios";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
	messages: [],
	selectedUser: null,
	users: [],

	getUsers: async () => {
		try {
			const res = await axiosInst.get("/message/users");
			set({ users: res.data });
		} catch (error) {
			console.log("error getting users", error);
			toast.error(error.response.data.message);
		}
	},

	messages: async (userId) => {
		try {
			const res = await axiosInst.get(`/message/${userId}`);
			set({ messages: res.data });
		} catch (error) {
			console.log("error getting messages", error);
		}
	},

	sendMessage: async (msg) => {
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInst.post(
				`/messages/send/${selectedUser._id}`,
				msg
			);
			set({ messages: [...messages, res.data] });
		} catch (error) {
			toast.error(error.response.data.message);
		}
	},
}));
