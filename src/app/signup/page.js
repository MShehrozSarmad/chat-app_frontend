"use client";

import AuthImagePattern from "@/components/AuthImagePattern";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const Page = () => {
	const [showPass, setShowPass] = useState(false);
	const { signup, authUser } = useAuthStore();
	const router = useRouter();

	const [error, submitAction, isPending] = useActionState(
		async (prevState, formData) => {
			const name = formData.get("name");
			const email = formData.get("email");
			const password = formData.get("password");
			await signup({ name, email, password });
			return null;
		},
		null
	);

	useEffect(() => {
		if (authUser) {
			router.push("/");
		}
	}, [authUser]);

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div
								className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
							>
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">
								Create Account
							</h1>
							<p className="text-base-content/60">
								Get started with your free account
							</p>
						</div>
					</div>

					<form
						action={submitAction}
						className="flex flex-col justify-center items-center space-y-6"
					>
						<label className="input validator">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</g>
							</svg>
							<input
								type="input"
								required
								placeholder="name"
								name="name"
								minLength="3"
								maxLength="30"
								title="Only letters, numbers or dash"
							/>
						</label>
						<label className="input validator">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<rect
										width="20"
										height="16"
										x="2"
										y="4"
										rx="2"
									></rect>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
								</g>
							</svg>
							<input
								type="email"
								name="email"
								placeholder="mail@site.com"
								required
							/>
						</label>
						<div className="validator-hint hidden">
							Enter valid email address
						</div>

						<label className="input validator">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
									<circle
										cx="16.5"
										cy="7.5"
										r=".5"
										fill="currentColor"
									></circle>
								</g>
							</svg>
							<input
								type="password"
								required
								placeholder="Password"
								name="password"
								minLength="8"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
							/>
						</label>
						<p className="validator-hint hidden">
							Must be more than 8 characters, including
							<br />
							At least one number
							<br />
							At least one lowercase letter
							<br />
							At least one uppercase letter
						</p>

						<button
							className="btn btn-soft btn-accent"
							type="submit"
							disabled={isPending}
						>
							Send
						</button>
						{error && <p>{error}</p>}
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link href="/signin" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
};

export default Page;
