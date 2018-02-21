import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navActions from 'actions/nav';
import LogoImg from './images/logo.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    this.actions = bindActionCreators(navActions, dispatch);
  }

  render() {
    const offlineElm = this.props.isOnline ?
      (<span className="tag is-success"><i className="fa fa-wifi" /></span>) :
      (<span className="tag is-danger"><i className="fa fa-warning" /></span>);

    const logoutElement = this.props.isAuthenticated ? (
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control" title="Sign out">
            <button onClick={this.actions.onLogoutClick} className="button is-danger">
              <span id="sign-out-btn">{this.props.userName}</span>
              <span className="icon">
                <i className="fa fa-sign-out" />
              </span>
            </button>
          </p>
        </div>
      </div>
    ) : null;

    const nameElm =
      this.props.isAuthenticated ? (
        <div className="navbar-item">
          <div className="tags has-addons">
            {offlineElm}
            <span className="tag is-dark">
              Network
            </span>
          </div>
        </div>
      ) : null;

    const activeClass = this.props.isNavActive ? ' is-active' : '';

    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img alt="Jubelio" src={LogoImg} />
          </Link>
          <div
            role="button"
            tabIndex={0}
            className={`navbar-burger burger${activeClass}`}
            onClick={this.actions.toggleNav}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="mainNavBar" className={`navbar-menu${activeClass}`}>
          <div className="navbar-end">
            {nameElm}
            <Link className="navbar-item" to="/">
              <span className="icon">
                <i className="fa fa-home" />
              </span>
              <span>Home</span>
            </Link>
            <Link className="navbar-item" to="/shopping">
              <span className="icon">
                <i className="fa fa-shopping-cart" />
              </span>
              <span>Shopping</span>
            </Link>
            <Link className="navbar-item" to="/checkout">
              <span className="icon">
                <i className="fa fa-cc" />
              </span>
              <span>Payment</span>
            </Link>
            {logoutElement}
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func,
  isNavActive: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isOnline: PropTypes.bool,
  userName: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    isOnline: state.offline.isOnline,
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName,
    isNavActive: state.nav.isActive
  };
};

export default connect(mapStateToProps)(NavBar);
