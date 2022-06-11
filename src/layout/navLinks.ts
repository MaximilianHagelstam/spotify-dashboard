interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Dashboard", href: "/" },
  { name: "Top Tracks", href: "/top-tracks" },
  { name: "Top Artists", href: "/top-artists" },
  { name: "About", href: "/about" },
];

export default navLinks;
