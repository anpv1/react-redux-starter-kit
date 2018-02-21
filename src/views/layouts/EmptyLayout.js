import React from 'react';
import NavBar from 'views/NavBar';

require('bulma/css/bulma.css');
require('font-awesome/css/font-awesome.min.css');
require('./main.css');

class EmptyLayout extends React.Component {
  render() {
    return (
      <div>
        <section className="section">{this.props.children}</section>
      </div>
    );
  }
}

export default EmptyLayout;
