import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ride } from './ride';
import { Observable } from 'rxjs/Observable';
import { GeoService } from './geofire.service'
import 'rxjs/add/operator/take';
import { ProfileService } from '../ProfileService/profile.service';

@Injectable()
export class RideService{

    
    profileService: ProfileService;
    dbRef: any;
    hits = new BehaviorSubject([])
    items: FirebaseListObservable<any[]>;

    constructor(private db: AngularFireDatabase, private geoService: GeoService) {
        
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
            passengers:['0002','0003'],
            pickupTime: '20.09.2017, 09:00 Uhr',
            driverId:'0001',
            driver:{}

        },
        {key:'0002',
        locations:[{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        {coords:[11,0], id:'0001',name:'Bushaltestalle B9'}],
        destination:{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        start_location:{coords:[11,0],id:'0001',name:'Bushaltestalle B9'},
        current_location:{coords:[11,0,3],id:'0001',name:'current'},
        car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 }, 
        creator:'0001',
        free_seats:1,
        passengers:['0002','0003'],
        pickupTime: '20.09.2017, 09:00 Uhr',
        driverId:'0001',
        driver:{}

    },
    {key:'0003',
    locations:[{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
    {coords:[11,0], id:'0001',name:'Bushaltestalle B9'}],
    destination:{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
    start_location:{coords:[11,0],id:'0001',name:'Bushaltestalle B9'},
    current_location:{coords:[11,0,3],id:'0001',name:'current'},
    car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 }, 
    creator:'0001',
    free_seats:1,
    passengers:['0002','0003'],
    pickupTime: '20.09.2017, 09:00 Uhr',
    driverId:'0001',
    driver:{}

}
    ];


    getRide(id: string) {
        return  {key:'0001',
        locations:[{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        {coords:[11,0], id:'0001',name:'Bushaltestalle B9'}],
        destination:{coords:[11,0], id:'0001',name:'Bushaltestalle B9'},
        start_location:{coords:[11,0],id:'0001',name:'Bushaltestalle B9'},
        current_location:{coords:[11,0,3],id:'0001',name:'current'},
        car: { id: '0001', make: 'Opel', model: 'Astra', colour: 'blue', seats: 5 }, 
        creator:'0001',
        free_seats:1,
        passengers:['0002','0003'],
        pickupTime: '20.09.2017, 09:00 Uhr',
        driverId:'0001',
        driver:{}

    }

    }

    getRideFromId(id: string): Observable<any>{
        return this.db.object(`rides/${id}`).take(1)
    }

    addRidf(ride: Ride) {
        const itemObservable = this.dbRef;
        this.dbRef.database.ref(ride.key).set(ride).then;
        ride.locations.forEach(location => {
            this.geoService.setLocation(location.id,location.coords);
        });
        
        return true;
    }

    addRide(form_params){
        console.log(form_params)
    }


    cancelRide(id: string){
       
        let tempRide = this.dbRef.database.ref(id).once();
        
           
        
        const promise = this.dbRef.database.ref(id).remove();
        promise
        .then(_ => console.log('success'))
        .catch(err => console.log(err, 'You dont have access!'));
        return true;
    }

    getAcceptedRides(profileId: string) {
        let res = this.RIDE;
        let me = this;
        res.forEach(function(ride) {
            var driver = me.profileService.getProfile(ride.driverId);
            ride.driver = driver;
        });
        return res;
    }

    getCanceledRides(profileId: string) {
        return [];
    }

}
