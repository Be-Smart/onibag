import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

class Form extends Component {
  renderField(fields) {
    const {input, meta: {touched, error}, type, placeholder} = fields;

    return (
      <div>
        <input {...input} type={type} placeholder={placeholder} />
      </div>
    );
  }

  onFormSubmit({ pickup, dropoff }) {
    console.log(pickup, dropoff);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1>Addresses</h1>
        <form onSubmit={handleSubmit( this.onFormSubmit.bind(this) )}>
          <Field
            name='pickup'
            component={this.renderField}
            type='text'
            placeholder='Start point'
          />
          <Field
            name='dropoff'
            component={this.renderField}
            type='text'
            placeholder='Endpoint'
          />
          <button action='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null)(
  reduxForm({
    form: 'address'
  })(Form));
