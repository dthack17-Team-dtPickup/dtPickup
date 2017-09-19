import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Profile } from './profile';


@Injectable()
export class ProfileService {

    dbRef: any;
    hits = new BehaviorSubject([])
  
    constructor(private db: AngularFireDatabase) {
      /// Reference database location for GeoFire
      this.dbRef = this.db.list('/profiles');
     
     }

    PROFILES:Profile[] = [
        {id: '0001', name: 'Rüdiger', rating: 4, car:{ id: '0001', make:'Opel', model:'Astra', colour: 'blue', seats:5} }
    ];



 getProfile(id: string){
return {id: '0001', name: 'Rüdiger', rating: 4, car:{ id: '0001', make:'Opel', model:'Astra', colour: 'blue', seats:5} };

 }


addProfile(profile:Profile){
 return true;
}

getProfiles(){
    return this.PROFILES;
}

}

