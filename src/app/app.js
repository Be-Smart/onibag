import React, { Component } from 'react';
import Form from '../components/address_form';
import Addresses from '../components/saved_items';

export default class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <Addresses />
      </div>
    );
  }
}
