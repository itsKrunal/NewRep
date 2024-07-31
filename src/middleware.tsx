import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === '/login' || path == '/register';
    const token = request.cookies.get('token')?.value || '';
    
    console.log("INININ")
    if (!isPublic) {
        //@ts-ignore
        if (!token || isTokenExpired(token)) {
            console.log("FAILED: No token or token expired");
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
        
        const isAdminPath = path == '/reports/survey-report';
        console.log("THIS IS MY PATH", path, isAdminPath);
        //@ts-ignore
        const decodedToken = jwt.decode(token, 'PIKACHU');
        if (isAdminPath && (!decodedToken || !decodedToken.user.role || decodedToken.user.role !== 'Admin')) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
         }

        //     console.log("FAILED: No role or role is not admin");
        // }
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
    matcher: ['/', '/survey-form', '/reports/:path*'],
};