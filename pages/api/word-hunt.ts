import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  words: string[];
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ words: ["sog, dog"] });
};

export default handler;
