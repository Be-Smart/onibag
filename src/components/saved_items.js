import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Addresses extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  renderItems() {
    const { addresses } = this.props;

    const items = addresses.map(address => {
      return (
        <tr key={address.id}>
          <td>{address.pickupAddr}</td>
          <td>{address.dropoffAddr}</td>
          <td>{address.distance} miles</td>
        </tr>
      );
    });

    return items;
  }

  render() {
    return (
      <div>
        <h2>Saved items</h2>
        <table>
          <thead>
            <tr>
              <th>Start point</th>
              <th>Endpoint</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => {
    return { addresses: state.data }
  }
, actions)(Addresses);
