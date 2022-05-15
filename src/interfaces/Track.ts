interface Image {
  height: number;
  url: string;
  width: number;
}

interface Album {
  name: string;
  release_date: string;
  total_tracks: number;
  images: Image[];
  id: string;
  external_urls: { spotify: string };
  Artists: Artist[];
}

interface Artist {
  external_urls: { spotify: string };
  id: string;
  name: string;
}

export default interface Track {
  popularity: number;
  name: string;
  id: string;
  external_urls: { spotify: string };
  explicit: boolean;
  duration_ms: number;
  artists: Artist[];
  album: Album;
}
