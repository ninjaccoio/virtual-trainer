import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {config} from './config';

const Firebase = initializeApp(config.firebaseConfig);

export const auth = getAuth(Firebase);
export default Firebase;
