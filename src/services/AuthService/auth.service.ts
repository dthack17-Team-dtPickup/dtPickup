import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase  } from "angularfire2/database";
import * as firebase from 'firebase/app'

//import { userCredentials } from "../../models/auth.models";
import { Observable } from 'rxjs/Observable'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthService {
  
  private user: Observable<firebase.User>;
  private authState: firebase.User = null

  constructor(public auth: AngularFireAuth , private db: AngularFireDatabase) {

    this.user = auth.authState;
    this.user.subscribe(auth => this.authState = auth);
    //auth.authState.subscribe(auth => this.authState = auth )
  }

  // returns true if User is logged in 
  get authenticated (): boolean {
      return this.authState !== null;
  }

  //return firebase User Object if User is logged in
  get currentUser (): firebase.User{
    return this.authenticated ? this.authState : null;
  }
  
  //if user logged in returns uid of logged in user
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserAnonymous(): boolean{
    return this.authenticated ? this.authState.isAnonymous : false
  }

  get currentUserDisplayName(): string{
    if(!this.authenticated) { return 'Guest' }

    else if(this.currentUserAnonymous) { return 'Anonymer User'}

    else { 
      return this.authState.displayName || 'User'
    }
  }

  //social Sign in 

  googleLogin(){
    return this.socialSignIn(new firebase.auth.GoogleAuthProvider())
  }

  facebookLogin(){
    return this.socialSignIn(new firebase.auth.FacebookAuthProvider())
  }

  twitterLogin(){
    return this.socialSignIn(new firebase.auth.TwitterAuthProvider())
  }

  private socialSignIn(provider): firebase.Promise<any>{
    return this.auth.auth.signInWithPopup(provider)
                         .then(res => console.log(res))
                         .catch(err => console.log(err))
  }

/*  loginWithMail(credentials: userCredentials) {
    let promise = new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => { resolve(true) })
      .catch((err) => {
        reject(err)
      })
    })
    return promise;
  }*/

  emailLogin(email:string, password:string){
       
      this.auth.auth.signInWithEmailAndPassword(email, password)
                    .then( res => {return res})
                    .catch(err => {return err})

  }

  signinWithMail() {

  }

/*  private updateUserData(): void{
    //path in fbase db
    const path = `users/${this.currentUserId}`;
    const data = {
      name: this.currentUserDisplayName,
      email: this.currentUser.email
    }

    //update firedb entry with new data
    this.db.object(path).update(data)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))

  }*/

  logout(){
      this.auth.auth.signOut()
  }

  createUserWithMail(user) {
    let promise = new Promise((resolve, reject) => {
      this.auth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
        // once the user is created the userProfile will be updated with the username 
        this.auth.auth.currentUser.updateProfile({
          displayName: user.username,
          photoURL: ''
        }).then(() => {


          this.db.object(`/users/${this.auth.auth.currentUser.uid}`).set({

            uid: this.auth.auth.currentUser.uid,
            displayName: this.auth.auth.currentUser.displayName,
            photoUrl: 'https://api.adorable.io/avatars/' + this.auth.auth.currentUser.displayName,
            participation: {},
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => { reject(err) })

          //set initial following value
          this.db.object(`/following/${this.auth.auth.currentUser.uid}`).set({0: false})
            .then()
            .catch((err) => { reject(err) })


          //set initial follower value
          this.db.object(`/followers/${this.auth.auth.currentUser.uid}`).set({0: false})
            .then()
            .catch((err) => { reject(err) })

        }).catch((err) => { reject(err) })
      }).catch((err) => { reject(err) })
    })

    return promise;
  }
}