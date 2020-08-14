/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="container container-table">
        <div className="row vertical-center-row">
          <div className="text-center col-md-4 col-sm-4 col-xs-12 col-md-offset-4 server-error-page">
            <div className="number-404"> 404 </div>
            <div className="content-404"> Page not found </div>
          </div>
        </div>
      </div>
    );
  }
}
