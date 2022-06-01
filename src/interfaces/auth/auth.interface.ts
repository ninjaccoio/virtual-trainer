import {Timestamp} from 'firebase/firestore';

export interface User {
    id: string;
    email: string;
    createdAt: Timestamp;
}
