import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const socket = io('https://ubmttq.herokuapp.com/');
const featherClient = feathers();

featherClient.configure(feathers.socketio(socket, { timeout: 300000 }));
featherClient.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);
// featherClient.service('vbd').on('created', message => {
//   // if (message.nguoiThucHien === user['_id']) {
//   console.log('socket', message);
//   // dispatch({ type: 'USER_ADD_QLCV', payload: message });
//   // }
// });

export default featherClient;
