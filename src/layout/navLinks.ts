interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Top Tracks", href: "/top-tracks" },
  { name: "Top Artists", href: "/top-artists" },
  { name: "Playlist Analyser", href: "/playlist-analyser" },
];

export default navLinks;
