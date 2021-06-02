import db from '../../db/db.json';
import Cors from 'cors';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

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
    name: "Luke's Deck",
    deck: db.deck
  });
};
