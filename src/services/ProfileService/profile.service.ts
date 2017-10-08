import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Profile } from './profile';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';



@Injectable()
export class ProfileService {

    apiUrl = 'http://localhost:3000/api';
    data: any;
    dbRef: any;
    hits = new BehaviorSubject([])

    constructor(private http: Http, private db: AngularFireDatabase) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/users');

    }



    getProfile(id: string) {


        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        //console.log("data: "+this.data);

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            console.log(this.apiUrl + '/profiles/' + id);
            this.http.get(this.apiUrl + '/profiles/' + id)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data.result;
                    resolve(this.data);
                });

            
        });

        /* if (id == '0001'){
         return { id: '0001', first_name:'Thorsten', company:'Deutsche Telekom AG',  name: 'Schmidt', rating: 4, 
         car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 }, 
         default_start:{
             coords:[0,1],
             id:'1337',
             name:'Haupstraße 36'
         },
         routes:[] 
 
         */

    }

    /*
    if (id == '0002') {
        return {
            id: '0001', first_name: 'Andreas', company: 'Telekom IT', name: 'Keller', rating: 4,
            car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 },
            default_start: {
                coords: [0, 1],
                id: '1337',
                name: 'Haupstraße 36'
            },
            routes: []
    
        }
    }
    
    return {
        id: '0001', first_name: 'Stefan', company: 'Deutsche Telekom AG', name: 'Mayer', rating: 4,
        car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 },
        default_start: {
            coords: [0, 1],
            id: '1337',
            name: 'Haupstraße 36'
        },
        routes: []
    
    }
        }
    
        */
    getProfileFromId(id: string): Observable<any> {
        return this.db.object(`users/${id}`).take(1)
    }

    addProfile(profile: Profile) {

    }


}

