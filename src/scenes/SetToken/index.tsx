import React, { useState } from 'react';
import { useHistory } from 'react-router';

const SetToken = () => {
  const history = useHistory();
  const [token, setToken] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem('token', token);
    history.push('/');
  };

  const handleTokenInput = ( e: any) => {
    setToken(e.target.value);
  }

  return (
    <div id='set-token-center'>
      <div id='set-token-wrapper'>
        <h1 className={'typography--page-header'}>Enter your github token</h1>
        <form>
          <div style={{ padding: '2rem 0' }}>
            <input type='text' className='input' value={token} onChange={handleTokenInput}/>
          </div>
          <button type='submit' className='btn btn--green' onClick={handleSubmit}>
            Submit token
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetToken;
