import firebase, { firebaseRef } from '../firebase';
import {
  FETCH_DATA
} from './types';

export function pushData(pickupAddr, dropoffAddr, distance) {
  return (dispatch) => {
    const data = {
      pickupAddr,
      dropoffAddr,
      distance
    };
    const addressesRef = firebaseRef.child('addresses').push(data);

    addressesRef.then(() => {
      dispatch( fetchData() );
    });
  };
}

export function fetchData() {
  return (dispatch) => {
    const addressesRef = firebaseRef.child('addresses');

    addressesRef.once('value')
      .then( snapshot => {
        const addr = snapshot.val() || {};
        const parsedAddr = [];

        Object.keys(addr).forEach( itemId => {
          parsedAddr.push({ id: itemId, ...addr[itemId] });
        });

        dispatch({ type: FETCH_DATA, payload: parsedAddr });
      });
  };
}
