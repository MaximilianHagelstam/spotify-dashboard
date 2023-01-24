import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "../lib/classNames";
import LogoutButton from "./LogoutButton";
import navLinks from "./navLinks";

const Navbar = () => {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" style={{ lineHeight: 0 }}>
                  <Image
                    height={32}
                    width={32}
                    src="/logo.png"
                    alt="Logo"
                    className="cursor-pointer"
                  />
                </Link>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={classNames(
                          router.pathname === link.href
                            ? "font-bold"
                            : "text-gray-text transition ease-in-out hover:text-white",
                          "px-3 text-sm"
                        )}
                      >
                        {link.name}
                      </Link>
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
                <Disclosure.Button className="text-gray-400 hover:text-gray-900 inline-flex items-center justify-center rounded-md p-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className=" inline-block pl-4 pt-2">
              {navLinks.map((link) => (
                <div key={link.name} className="mb-3">
                  <Disclosure.Button
                    as="a"
                    href={link.href}
                    className={classNames(
                      router.pathname === link.href
                        ? "font-bold"
                        : "text-gray-text transition ease-in-out hover:text-white",
                      "text-sm"
                    )}
                  >
                    {link.name}
                  </Disclosure.Button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-hover">
              <div className="my-1 block px-3 py-2">
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
