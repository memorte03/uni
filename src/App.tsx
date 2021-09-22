import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { ProjectContext } from '~/ProjectContext';
import Create from '~/scenes/Create';
import Edit from '~/scenes/Edit';
import Home from '~/scenes/Home';
import Preview from '~/scenes/Preview';
import SetToken from '~/scenes/SetToken';
import WorkspaceSettingsProvider from '~/WorkspaceSettingsContext';

const App = () => {
  const isAuthorized = !!localStorage.getItem('token');

  return (
    <>
      <WorkspaceSettingsProvider>
        <ProjectContext.Provider value={{ projectID: 1 }}>
          <div id="body-wrapper">
            <Router>
              {!isAuthorized && <Redirect to="/setToken" />}
              <Switch>
                <Route exact path="/setToken">
                  <SetToken />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/preview/:id">
                  <Preview />
                </Route>
                <Route path="/edit/:id">
                  <Edit />
                </Route>
                <Route path="/create">
                  <Create />
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
