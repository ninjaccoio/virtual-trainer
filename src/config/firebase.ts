import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {config} from './config';

const Firebase = initializeApp(config.firebaseConfig);

export const Providers = {
    google: new GoogleAuthProvider()
};

export const auth = getAuth(Firebase);
export default Firebase;
