import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    if (
      token?.role === "teacher" &&
      !(req.nextUrl.pathname.endsWith("/teacher-table") || req.nextUrl.pathname.endsWith("/student-table"))
    ) {
      const url = new URL("/dashboard/select-semester", req.nextUrl).href;
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (token?.role === "admin") return true;

        if (token?.role === "student" && !req.nextUrl.endsWith("student-table"))
          return false;
      },
    },
  },
);

export const config = {
  matcher: [
    "/schedule/:path*",
    "/management/:path*",
    "/dashboard/:path/all-program",
    "/dashboard/:path/all-timeslot",
    "/dashboard/:path/teacher-table",
  ],
};
