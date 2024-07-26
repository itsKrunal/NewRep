import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === '/login' || path == '/register';
    const token = request.cookies.get('token')?.value || '';

    if (!isPublic && (!token || isTokenExpired(token, path))) {
        // Redirect to login if the route is not public and token is missing or expired
        console.log("FAILED");
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

const isTokenExpired = (token: any, path: any) => {
    try {
        //@ts-ignore
        const decodedToken = jwt.decode(token, 'PIKACHU');
        //@ts-ignore
        return decodedToken && decodedToken.exp * 1000 < Date.now();
    } catch (error: any) {
        console.error('Error decoding token:', error.message);
        return true; // Consider token expired on decoding error
    }
};

export const config = {
    matcher: ['/', '/survey-form'],
};