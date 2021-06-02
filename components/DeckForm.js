import PropTypes from 'prop-types';
import React from 'react';

export const DeckForm = (props) => {
  const { fetchDeck, ...rest } = props;
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetchDeck(input);
    setError(result?.message);
    setTimeout(() => setError(null), 5000);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} {...rest}>
      <div>
        <label>
          URL to fetch deck: &nbsp;
          <input
            placeholder="my-friends-site.com/api/deck"
            required
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>
      <span className={'error'}>{error}</span>
    </form>
  );
};

DeckForm.propTypes = {
  fetchDeck: PropTypes.func
};
