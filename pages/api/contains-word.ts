import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

interface Data {
  result?: boolean;
  message?: string;
}

const words = new Set<string>();

(() => {
  for (const word of fs
    .readFileSync("./public/words.txt", "utf8")
    .split("\n")) {
    words.add(word.trim());
  }
})();

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(400).send({
      message: `Expected POST request, recieved ${req.method} request`,
    });
    return;
  }

  if (req.body.word === undefined) {
    res.status(400).send({ message: "Missing 'word' parameter" });
    return;
  }

  res.status(200).json({ result: words.has(req.body.word.toUpperCase()) });
};

export default handler;
