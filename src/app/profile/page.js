"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useActionState, useState } from "react";

const Page = () => {
	const { updateProfiePic, authUser } = useAuthStore();
	const [profilePic, setProfilePic] = useState(null);

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				console.log("fired");
				resolve(reader.result);
			};
			reader.onerror = reject;
		});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setProfilePic(URL.createObjectURL(file));
		}
	};

	const [error, submitAction, isPending] = useActionState(
		async (prevState, formData) => {
			const file = formData.get("profile_pic");
			const base64Image = await fileToBase64(file);
			setProfilePic(base64Image);
			await updateProfiePic({ profile_pic: base64Image });
			return null;
		},
		null
	);

	return (
		<div className=" w-full h-[100vh] flex justify-center items-center">
			{/* <p>profile Page</p> */}
			<img
				src={profilePic || authUser?.profile_pic}
				alt="Profile"
				className="size-32 rounded-full object-cover border-4 "
			/>
			<form action={submitAction} className="flex flex-col">
				<label htmlFor="profile_pic">Profile Picture</label>
				<input type="text" name="name" id="name" />
				<input
					type="file"
					name="profile_pic"
					id="profile_pic"
					onChange={handleFileChange}
					// required
				/>
				<button
					className="btn btn-soft btn-accent"
					type="submit"
					disabled={isPending}
				>
					Upload
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default Page;
