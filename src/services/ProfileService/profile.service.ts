import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Profile } from './profile';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class ProfileService {

    dbRef: any;
    hits = new BehaviorSubject([])

    constructor(private db: AngularFireDatabase) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/users');

    }



    getProfile(id: string) {
        if (id == '0001'){
        return { id: '0001', first_name:'Thorsten', company:'Deutsche Telekom AG',  name: 'Schmidt', rating: 4, 
        car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 }, 
        default_start:{
            coords:[0,1],
            id:'1337',
            name:'Haupstraße 36'
        },
        routes:[] 

    }
}
if (id == '0002'){
    return { id: '0001', first_name:'Andreas', company:'Telekom IT',  name: 'Keller', rating: 4, 
    car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 }, 
    default_start:{
        coords:[0,1],
        id:'1337',
        name:'Haupstraße 36'
    },
    routes:[] 

}
}

return { id: '0001', first_name:'Stefan', company:'Deutsche Telekom AG',  name: 'Mayer', rating: 4, 
car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 }, 
default_start:{
    coords:[0,1],
    id:'1337',
    name:'Haupstraße 36'
},
routes:[] 

}
    }

    getProfileFromId(id: string): Observable<any>{
        return this.db.object(`users/${id}`).take(1)
    }

    addProfile(profile: Profile) {
        this.db.database.ref('/profile').push(profile).then((snap) => {
            console.log(snap)
            const key = snap.key 
            
         })
    }


}

