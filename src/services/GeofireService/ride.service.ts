import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ride } from './ride';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class RideService{

    dbRef: any;
    hits = new BehaviorSubject([])

    constructor(private db: AngularFireDatabase) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/rides');

    }


    RIDE: Ride[] = [
        {key:'0001',
            locations:[{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
            {coords:[11,0], id:'0001',name:'Bushaltestalle B9'}],
            destination:{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
            start_location:{coords:[11,0],id:'0001',name:'Bushaltestalle B9'},
            current_location:{coords:[11,0,3],id:'0001',name:'current'},
            car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 }, 
            creator:'0001',
            free_seats:1,
            members:['0002','0003'] 
        }
    ];


    getRide(id: string) {
        return {key:'0001',
        locations:[{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        {coords:[11,0], id:'0001',name:'Bushaltestalle B9'}],
        destination:{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 }, 
        start_location:{coords:[11,0],id:'0001',name:'Bushaltestalle B9'},
        current_location:{coords:[11,0,3],id:'0001',name:'current'},
        creator:'0001',
        free_seats:1,
        members:['0002','0003'] 
    }
    }

    getRideFromId(id: string): Observable<any>{
        return this.db.object(`rides/${id}`).take(1)
    }

    addRide(ride: Ride) {
        this.dbRef.database.ref(ride.key).set(ride);
        return true;
    }

    cancelRide(id: string){
        this.dbRef.database.ref(id).remove();
        return true;
    }

}