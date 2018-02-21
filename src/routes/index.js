import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './config';

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          const { layout: Layout, component: Component } = route;
          return (<Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={(props) => {
                if (!route.loginRequired || isAuthenticated) {
                  document.title = route.title || 'Welcome';
                  return (<Layout><Component {...props} /></Layout>);
                }
                return (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />);
              }
            }
          />);
        })}
      </Switch>
    </Router>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Routes);
