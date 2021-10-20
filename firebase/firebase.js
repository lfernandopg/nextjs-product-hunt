import app from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebaseConfig from './config'

class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig)
        this.app = app;
        this.auth = this.app.auth();
        this.db = this.app.firestore();
        this.storage = this.app.storage();
    }

    async createUser(email, password) {
        return await this.auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return {
                error : false,
                message : "User created successful",
                user,

            }
        })
        .catch(error => {
            throw {
                error : true,
                code : error.code,
                message : error.message
            }
        })
    }

    async authUser(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return {
                error : false,
                message : "User logged in successful",
                user
            }
        })
        .catch(error => {
            throw {
                error : true,
                code : error.code,
                message : error.message
            }
        })
    }

    async updateUser(profile) {
        return await this.auth.currentUser.updateProfile({
            ...profile
        }).then(() => {
            return {
                error : false,
                message : "Updated Profile"
            }
        }).catch((error) => {
            throw {
                error : true,
                code : error.code,
                message : error.message
            }
        });
    }

    async signOut() {
        return await this.auth.signOut()
            .then(() => {
                return {
                    error : false,
                    message : "User logged out successful"
                }
            }).catch((error) => {
                throw {
                    error : true,
                    code : error.code,
                    message : error.message
                }
            });
    }
}

const firebase = new Firebase();

export default firebase