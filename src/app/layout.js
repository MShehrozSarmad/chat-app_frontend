import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./AuthLayout";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Chat-app",
	description: "simple messaging web app",
};

export default function RootLayout({ children }) {
	return (
		// <html lang="en" data-theme={theme}>
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthLayout>
					<Navbar />
					<Toaster position="top-center" reverseOrder={false} />
					{children}
				</AuthLayout>
			</body>
		</html>
	);
}
