import { auth } from "@/lib/auth/auth";
import { headers as getNextHeaders } from "next/headers";

export const getSession = async (request?: Request) => {
  try {
    if (request) {
      const reqHeaders = new Headers(request.headers);

      return await auth.api.getSession({
        headers: reqHeaders,
      });
    }

    const nextHeaders = await getNextHeaders();
    return await auth.api.getSession({
      headers: nextHeaders,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export const isLoggedIn = async (request?: Request): Promise<boolean> => {
  const session = await getSession(request);
  return !!session;
};

export const hasRole = async (
  role: string | string[],
  request?: Request,
): Promise<boolean> => {
  const session = await getSession(request);
  if (!session?.user?.role) return false;

  if (Array.isArray(role)) {
    return role.includes(session.user.role);
  }

  return session.user.role === role;
};

export const isAdmin = (req?: Request) => hasRole("ADMIN", req);
export const isTeacher = (req?: Request) => hasRole("TEACHER", req);
export const isStudent = (req?: Request) => hasRole("STUDENT", req);
