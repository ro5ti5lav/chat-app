// lib/pusher.js
import Pusher from 'pusher-js';

const pusher = new Pusher('43a4418e55410193c240', {
    cluster: 'eu',
});

export default pusher;
