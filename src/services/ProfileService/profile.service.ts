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

    PROFILES: Profile[] = [
        { id: '0001', name: 'Rüdiger', rating: 4, car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 } }
    ];



    getProfile(id: string) {
        return { id: '0001', name: 'Rüdiger', rating: 4, car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 } };

    }

    getProfileFromId(id: string): Observable<any>{
        return this.db.object(`users/${id}`).take(1)
    }

    addProfile(profile: Profile) {
        this.db.object;
        return true;
    }

    getProfiles() {
        return this.PROFILES;
    }

}

