import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {config} from './config';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
