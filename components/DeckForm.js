import React from 'react';

export const DeckForm = (props) => {
  const { fetchDeck } = props;
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetchDeck(input);
    setError(result)
    setTimeout(() => setError(null), 5000)
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        URL to fetch deck: &nbsp;
        <input placeholder="my-friends-site.com/api/deck" required value={input} disabled={loading} onChange={(e) => setInput(e.target.value)} />
      </label>
      <input type="submit" value="Submit" disabled={loading}/>
    </form>
  );
};
