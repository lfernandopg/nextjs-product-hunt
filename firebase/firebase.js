import { initializeApp } from 'firebase/app'
import firebaseConfig from './config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

class Firebase {

    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth();
        this.db = getFirestore(this.app);
        this.storage = getStorage(this.app);
    }

    async createUser(email, password) {
        return await createUserWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                return {
                    error : false,
                    message : "User created succeful",
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
        return await signInWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                return user
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
        return await updateProfile(this.auth.currentUser, {
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
                    message : "LogOut"
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