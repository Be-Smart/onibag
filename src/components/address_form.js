import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';
import * as actions from '../actions';

import './styles_form.sass';

class Form extends Component {
  constructor() {
    super();
    this.state = { pickup: {}, dropoff: {}, err: '', success: '' };
  }

  validate() {
    const {pickup, dropoff} = this.state;

    if (!pickup.label || !dropoff.label) {
      return true;
    }

    return false;
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
      this.props.pushData(pickup.label, dropoff.label, distance);
      this.setState({
        pickup: {},
        dropoff: {},
        success: 'New record successfully added'
      });
    } else {
      this.setState({
        pickup: {},
        dropoff: {},
        err: 'Too far apart! Distance must be less 20 miles'
      });

      console.log(distance, 'Fail');
    }

    this._pickup.clear();
    this._dropoff.clear();
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
    const { err, success } = this.state;

    return (
      <div className='form-wrap'>
        <h2>Addresses</h2>
        {err ? <p className='alert alert-danger'>{err}</p> : null}
        {success ? <p className='alert alert-success'>{success}</p> : null}
        <form onSubmit={ this.onFormSubmit.bind(this) }>
          <Geosuggest
            ref={el => this._pickup = el}
            inputClassName='form-control'
            placeholder='Pick Up'
            onFocus={() => this.setState({ ...this.state, err: '', success: '' })}
            onSuggestSelect={ value => this.setState({ pickup: value }) }
          />
          <Geosuggest
            ref={el => this._dropoff = el}
            inputClassName='form-control'
            placeholder='Drop Off'
            onFocus={() => this.setState({ ...this.state, err: '', success: '' })}
            onSuggestSelect={ value => this.setState({ dropoff: value }) }
          />
          <button
            action='submit'
            className='btn btn-primary'
            disabled={this.validate()}
          > Submit </button>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(Form);
