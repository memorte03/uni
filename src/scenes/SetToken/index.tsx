import React, { useState } from 'react';
import { useHistory } from 'react-router';

function SetToken() {
  const history = useHistory();
  const [token, setToken] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem('token', token);
    history.push('/');
  };

  const handleTokenInput = (e: any) => {
    setToken(e.target.value);
  };

  return (
    <div id="set-token-center">
      <div id="set-token-wrapper">
            <h1 className="typography--page-header">
              Enter your github token
</h1>

            <form>
            <div style={{ padding: '2rem 0' }}>
                    <input
              className="input"
              onChange={handleTokenInput}
                  type="text"
              value={token}
              />
                </div>

            <button
            className="btn btn--green"
              onClick={handleSubmit}
              type="submit"
          >
            Submit token
          </button>
        </form>
        </div>
      </div>
  );
}

export default SetToken;
