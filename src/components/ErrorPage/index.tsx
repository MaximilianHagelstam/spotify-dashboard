import { removeCookies } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen text-center">
      <div className="m-auto">
        <Image height={64} width={64} src="/logo.png" alt="Spotify Logo" />
        <h1 className="text-5xl font-bold mt-12">Oops</h1>
        <p className="font-light mt-4">There was an error loading this page.</p>
        <button
          onClick={() => {
            removeCookies("token");
            router.reload();
          }}
          className="bg-white text-black font-bold py-4 px-8 rounded-full mt-8 hover:scale-105"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
