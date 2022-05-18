interface Image {
  height: number;
  url: string;
  width: number;
}

export default interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: Image[];
  name: string;
}
