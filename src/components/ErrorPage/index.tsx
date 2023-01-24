import { removeCookies } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen text-center">
      <div className="m-auto">
        <Image height={64} width={64} src="/logo.png" alt="Logo" />
        <h1 className="mt-12 font-bold text-5xl">Oops</h1>
        <p className="mt-4 font-light">There was an error loading this page.</p>
        <button
          onClick={() => {
            removeCookies("token");
            router.reload();
          }}
          className="mt-8 rounded-full bg-white py-4 px-8 font-bold text-black hover:scale-105"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
