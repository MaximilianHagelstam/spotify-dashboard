interface Followers {
  href?: string;
  total: number;
}

interface Image {
  height?: number;
  url: string;
  width?: number;
}

export default interface User {
  country: string;
  display_name: string;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
}
