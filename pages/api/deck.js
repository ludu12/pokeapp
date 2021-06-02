// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '../../db/db.json'

export default (req, res) => {
  res.status(200).json({
    name: "Luke\'s Deck",
    deck: db.deck
  });
};
