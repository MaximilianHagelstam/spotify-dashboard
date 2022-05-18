import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar";
import navLinks from "./navLinks";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [router, isAuth]);

  return (
    <div className="min-h-full">
      <Navbar />

      <header>
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">
            {navLinks.map((navLink) => {
              if (navLink.href === router.pathname) {
                return navLink.name;
              } else {
                return;
              }
            })}
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
