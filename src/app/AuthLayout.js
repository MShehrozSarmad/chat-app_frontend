"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }) => {
	const { checkAuth, isCheckingAuth } = useAuthStore();
	const [themeLcl, setThemeLcl] = useState(null);
	const { theme } = useThemeStore();

	useEffect(() => {
		checkAuth();
		setThemeLcl(localStorage.getItem("chat-theme") || theme);
	}, [theme]);

	return isCheckingAuth ? (
		<main
			className="flex items-center justify-center h-screen"
			data-theme={themeLcl}
		>
			<Loader className="size-10 animate-spin" />
		</main>
	) : (
		<main data-theme={themeLcl}>{children}</main>
	);
};

export default AuthLayout;
