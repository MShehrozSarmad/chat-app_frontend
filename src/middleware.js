import { NextResponse } from "next/server";

const protectedRoutes = ["/", "/profile"];
const authRoutes = ["/signin", "/signup"];

export function middleware(request) {
	const authToken = request.cookies.get("jwt")?.value;
	// console.log(authToken);
	const { pathname } = request.nextUrl;

	if (authToken && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!authToken && protectedRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	return NextResponse.next();
}
