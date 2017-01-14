import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';

class Form extends Component {
  constructor() {
    super();
    this.state = { pickup: {}, dropoff: {} };
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {pickup, dropoff} = this.state;
    const { lat: latPickup, lng: lngPickup } = pickup.location;
    const { lat: latDropoff, lng: lngDropoff } = dropoff.location;
    const coords = [latPickup, lngPickup, latDropoff, lngDropoff];

    const distance = this.calcCrow(coords).toFixed(1);

    if (distance <= 20) {
      console.log(distance, 'Success');
    } else {
      console.log(distance, 'Fail');
    }
  }

  calcCrow([lat1, lon1, lat2, lon2]) {
    const R = 3959; // mi
    const dLat = this.toRad(lat2-lat1);
    const dLon = this.toRad(lon2-lon1);
    const latStart = this.toRad(lat1);
    const latEnd = this.toRad(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latStart) * Math.cos(latEnd);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d;
  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Addresses</h1>
        <form onSubmit={ this.onFormSubmit.bind(this) }>
          <Geosuggest
            placeholder='Pick Up'
            onSuggestSelect={ value => this.setState({ pickup: value }) }
          />
          <Geosuggest
            placeholder='Drop Off'
            onSuggestSelect={ value => this.setState({ dropoff: value }) }
          />
          <button action='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null)(Form);
