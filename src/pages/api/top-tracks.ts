import { NextApiRequest, NextApiResponse } from "next";
import { getTopTracks } from "../../lib/spotify";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const tracks = await getTopTracks();

  return res.status(200).json({ tracks });
};
