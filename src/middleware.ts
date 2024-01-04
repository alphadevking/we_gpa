import { withAuth } from "next-auth/middleware";

export { default } from 'next-auth/middleware';

// export default withAuth({
//     callbacks: {
//         authorized: async ({ req, token }) => {
//             if (req.nextUrl.pathname.startsWith("/admin")) return token?.role === "admin";
//             return !!token;
//         }
//     }
// });

/**
 * Represents a configuration object.
 * @property {string[]} matcher - An array of strings representing different URL patterns.
 */
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/gpa-calculator/:path*',
        '/cgpa-calculator/:path*',
    ]
};
