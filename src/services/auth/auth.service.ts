import {auth, db} from '../../config/firebase';
import {createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {collection, addDoc, doc, Timestamp, getDoc, getDocs, setDoc} from 'firebase/firestore';
import logging from '../../config/logging';

import {User} from '../../interfaces/auth/auth.interface';
import {resultingClientExists} from 'workbox-core/_private';

class AuthService {
    async forgotPwd(email: string) {
        let result = {success: false, error: 'Errore non gestito'};

        await sendPasswordResetEmail(auth, email)
            .then(() => {
                result = {success: true, error: ''};
            })
            .catch((err) => {
                let result = {success: false, error: err};
            });

        return result;
    }

    async signInWithGoogle() {
        let result = {success: false, error: 'Errore non gestito', uid: ''};

        await signInWithPopup(auth, new GoogleAuthProvider())
            .then(async (res) => {
                result = {success: true, error: '', uid: res.user.uid};

                const user = await this.getUser(res.user.uid);

                if (!user?.exists()) await this.setUser(res.user.uid, res.user.email !== null ? res.user.email : '');
            })
            .catch((err) => {
                result = {success: false, error: err, uid: ''};
            });

        return result;
    }

    async login(email: string, password: string) {
        let result = {success: false, target: 'all', error: 'Errore non gestito', uid: ''};

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((usr) => {
                    result = {success: true, target: 'any', error: '', uid: usr.user.uid};
                })
                .catch((err) => {
                    switch (err.code) {
                        case 'auth/user-not-found':
                            result = {success: false, target: 'email', error: 'E-Mail non esistente', uid: ''};
                            break;
                        case 'auth/wrong-password':
                            result = {success: false, target: 'pwd', error: 'Password Errata', uid: ''};
                            break;

                        default:
                            result = {success: false, target: 'all', error: 'Errore non gestito default', uid: ''};
                    }
                });
        } catch (err) {
            logging.error(err);
        }

        return result;
    }

    async register(username: string, email: string, password: string) {
        await createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
            const userData: User = {
                id: res.user.uid,
                username: username,
                email: email,
                createdAt: Timestamp.fromDate(new Date())
            };

            const docRef = doc(collection(db, 'users'));
            await setDoc(docRef, userData).then(() => {
                logging.info('User Saved');
                sendEmailVerification(res.user).then(() => {
                    console.info('Email di verifica inviata');
                    return true;
                });
            });
        });

        return false;
    }

    async getUser(uid: string) {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    async setUser(uid: string, email: string, username: string = '') {
        const userData: User = {
            id: uid,
            username: username,
            email: email,
            createdAt: Timestamp.fromDate(new Date())
        };

        const docRef = doc(collection(db, 'users'));
        await setDoc(docRef, userData)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    logout() {
        signOut(auth);
    }
}

export default new AuthService();
