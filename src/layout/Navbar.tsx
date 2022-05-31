import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { classNames } from "../lib/helpers";
import LogoutButton from "./LogoutButton";
import navLinks from "./navLinks";

const Navbar = () => {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Image
                  height={32}
                  width={32}
                  src="/logo.png"
                  alt="Spotify Dashboard"
                />
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className={classNames(
                          router.pathname === link.href
                            ? "font-bold"
                            : "text-gray-text hover:text-white transition ease-in-out",
                          "px-3 text-sm"
                        )}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <LogoutButton />
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as="a"
                  href={link.href}
                  className={classNames(
                    router.pathname === link.href
                      ? "font-bold"
                      : "text-gray-text hover:text-white transition ease-in-out",
                    "px-3 text-sm"
                  )}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-hover">
              <div className="block px-3 py-2 my-1">
                <LogoutButton />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
