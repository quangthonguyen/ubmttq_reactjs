import io from 'socket.io-client';
import feathers from '@feathersjs/client';
// import $ from 'jquery';
// import rest from '@feathersjs/rest-client';
// import Axios from 'axios';

// const socket = io('localhost:3030');
// const socket = io('https://ubmttq.herokuapp.com/');
const socket = io('https://restapiubmt.herokuapp.com/');
const featherClient = feathers();

featherClient.configure(feathers.socketio(socket, { timeout: 300000 }));
featherClient.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

// const restClient = rest('localhost:3030');
// featherClient.configure(restClient.axios(Axios));
// const restClient = rest('http://localhost:3030');
// featherClient.configure(restClient.jquery($));

// featherClient.service('vbd').on('created', message => {
//   // if (message.nguoiThucHien === user['_id']) {
//   console.log('socket', message);
//   // dispatch({ type: 'USER_ADD_QLCV', payload: message });
//   // }
// });

export default featherClient;
