import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  words?: string[];
  message?: string;
}

const findWords = (letters: string, words: Set<string>): string[] => {
  const result = new Set<string>();

  const recursiveHelper = (
    letters: string,
    curr: string,
    words: Set<string>
  ) => {
    if (words.has(curr)) {
      result.add(curr);
    }

    if (letters.length === 0) {
      return;
    }

    for (let i = 0; i < letters.length; i++) {
      recursiveHelper(
        letters.slice(0, i) + letters.slice(i + 1),
        curr + letters[i],
        words
      );
    }
  };

  for (let i = 0; i < letters.length; i++) {
    recursiveHelper(
      letters.slice(0, i) + letters.slice(i + 1),
      letters[i],
      words
    );
  }

  return Array.from(result);
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(400).send({
      message: `Expected POST request, recieved ${req.method} request`,
    });
    return;
  }

  if (req.body.letters === undefined) {
    res.status(400).send({ message: "Missing 'letters' parameter" });
    return;
  }

  const letters = req.body.letters;

  // make sure letters length is 6 and only consists of alpha characters
  if (letters.length !== 6 || /[^a-zA-Z]/.test(letters)) {
    res.status(400).send({
      message: "Parameter 'letters' expected to be 6 alphabetic characters",
    });
    return;
  }

  res.status(200).json({ words: findWords(letters, new Set<string>()) });
};

export default handler;
