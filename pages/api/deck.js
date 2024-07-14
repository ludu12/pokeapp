import db from '../../db/db.json';
import Cors from 'cors';

// Initialize the cors middleware
export const cors = (req, res) =>
  new Promise((resolve, reject) => {
    Cors({
      methods: ['GET'] // Allow GET
    })(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async (req, res) => {
  await cors(req, res);

  res.status(200).json({
    name: "Luke's rad deck!",
    deck: db.deck
  });
};
