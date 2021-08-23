import React, { useState } from 'react';
import { ProjectContext } from '~/ProjectContext';
import WorkspaceSettingsProvider from '~/WorkspaceSettingsContext';
import Home from '~/scenes/Home';
import Create from '~/scenes/Create';
import Edit from '~/scenes/Edit';
import SetToken from '~/scenes/SetToken';
import Preview from '~/scenes/Preview';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  const isAuthorized = !!localStorage.getItem('token');

  return (
    <>
      <WorkspaceSettingsProvider>
        <ProjectContext.Provider value={{ projectID: 1 }}>
          <div id='body-wrapper'>
            <Router>
              {!isAuthorized && <Redirect to="/setToken" />}
              <Switch>
                <Route exact path='/setToken'>
                  <SetToken/> 
                </Route>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/preview/:id'>
                  <Preview />
                </Route>
                <Route path='/edit/:id'>
                  <Edit />
                </Route>
                <Route path='/create'>
                  <Create/>
                </Route>
              </Switch>
            </Router>
          </div>
        </ProjectContext.Provider>
      </WorkspaceSettingsProvider>
    </>
  );
};

export default App;
