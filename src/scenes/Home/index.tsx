import React, { useState } from 'react';
import GistList from './GistList';
import { useHistory } from 'react-router-dom';
import Paginate from 'react-paginate';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const history = useHistory();

  const handleCreate = () => {
    history.push('/create');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/setToken');
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div id='body-inner-wrapper'>
      <div id='home-header'>
        <div id='home-header-left'>Sort by:</div>
        <div id='home-header-right'>
          <button className='btn' onClick={handleLogout}>
            Change token
          </button>
          <button className='btn btn--green' onClick={handleCreate}>
            Create Gist
          </button>
        </div>
      </div>
      <GistList key={currentPage} setPageCount={setPageCount} currentPage={currentPage} />
      {pageCount && (
        <div id='home-footer'>
          <Paginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'page-controls'}
            activeLinkClassName={'page-controls__active-btn'}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
