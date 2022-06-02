import Image from "next/image";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen text-center">
      <div className="m-auto">
        <Image height={64} width={64} src="/logo.png" alt="Spotify Logo" />

        <h1 className="text-5xl font-bold mt-12">Page not found</h1>

        <p className="font-light mt-4">
          We can&lsquo;t seem to find the page you are looking for.
        </p>

        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-white text-black font-bold py-4 px-8 rounded-full mt-8 hover:scale-105"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
