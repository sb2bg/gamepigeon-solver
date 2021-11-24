import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

interface Data {
  words?: string[];
  error?: string;
}

const words = new Set(
  fs.readFileSync("./public/words.txt", "utf8").split(/\s+/)
);

const findAnagrams = (letters: string): string[] => {
  const result = new Set<string>();

  const recursiveHelper = async (letters: string, curr: string) => {
    if (words.has(curr)) {
      result.add(curr);
    }

    if (letters.length === 0) {
      return;
    }

    for (let i = 0; i < letters.length; i++) {
      recursiveHelper(
        letters.slice(0, i) + letters.slice(i + 1),
        curr + letters[i]
      );
    }
  };

  for (let i = 0; i < letters.length; i++) {
    recursiveHelper(letters.slice(0, i) + letters.slice(i + 1), letters[i]);
  }

  return Array.from(result);
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const [gameType, letters] = req.query.params;

  if (letters === undefined) {
    res.status(400).json({ error: "'letters' parameter missing" });
    return;
  }

  switch (gameType) {
    case "anagrams":
      if (letters.length !== 6 || !/^[a-zA-Z]{6}$/.test(letters)) {
        res
          .status(400)
          .json({ error: "letters expected to be 6 alpha characters" });
        return;
      }

      res.status(200).json({
        words: findAnagrams(letters),
      });
      break;
    default:
      res.status(400).json({
        error: "Unknown API route",
      });
  }
};

export default handler;
