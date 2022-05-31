import {Timestamp} from 'firebase/firestore';

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Timestamp;
}
