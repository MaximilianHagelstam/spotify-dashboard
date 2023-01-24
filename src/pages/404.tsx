import Image from "next/image";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen text-center">
      <div className="m-auto">
        <Image height={64} width={64} src="/logo.png" alt="Spotify Logo" />
        <h1 className="mt-12 font-bold text-5xl">Page not found</h1>
        <p className="mt-4 font-light">
          We can&lsquo;t seem to find the page you are looking for.
        </p>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="mt-8 rounded-full bg-white py-4 px-8 font-bold text-black hover:scale-105"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
