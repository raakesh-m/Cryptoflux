import { withAuth } from "next-auth/middleware"

// Only protect settings and other sensitive routes
export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow public access to dashboard and market routes
      const publicPaths = ['/dashboard', '/market', '/portfolio', '/exchange']
      const path = req.nextUrl.pathname
      if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
        return true
      }
      // Require authentication for other routes
      return !!token
    }
  }
})

// Configure which routes require authentication
export const config = {
  matcher: ['/settings/:path*']
} 