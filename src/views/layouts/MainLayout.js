import React from 'react';
import NavBar from 'views/NavBar';

require('bulma/css/bulma.css');
require('font-awesome/css/font-awesome.min.css');
require('./main.css');

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <section className="section">{this.props.children}</section>
      </div>
    );
  }
}

export default MainLayout;
