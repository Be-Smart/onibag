import React, { Component } from 'react';
import Form from '../components/address_form';
import Addresses from '../components/saved_items';

import './app.sass'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Form />
        <Addresses />
      </div>
    );
  }
}
