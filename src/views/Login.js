import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as authActions from 'actions/auth';
import Message from './elements/Message';

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    this.authActions = bindActionCreators(authActions, dispatch);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.isAuthenticated) {
      return (<Redirect to={from} />);
    }

    const errorElm = this.props.loginError ?
      (<Message onClose={this.authActions.onLoginClearError} title={this.props.loginError} type="danger" />)
      : null;

    return (
      <div className="container">
        <h3 className="title">Sign in</h3>
        {errorElm}
        <form onSubmit={(e) => { e.preventDefault(); this.authActions.onLoginClick(); }}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                required={true}
                placeholder="Email"
                value={this.props.email}
                disabled={this.props.ajaxLoading}
                onChange={(e) => { this.authActions.changeEmail(e.target.value); }}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                required={true}
                placeholder="Password"
                value={this.props.password}
                disabled={this.props.ajaxLoading}
                onChange={(e) => { this.authActions.changePassword(e.target.value); }}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" disabled={this.props.ajaxLoading} className="button is-success">
              Login
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

LoginView.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loginError: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  ajaxLoading: PropTypes.bool
};

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps)(LoginView);
