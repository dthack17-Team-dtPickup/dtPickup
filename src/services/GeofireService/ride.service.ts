import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ride } from './ride';
import { Ride1 } from './ride.1';
import { Observable } from 'rxjs/Observable';
import { GeoService } from './geofire.service'
import 'rxjs/add/operator/take';
import { ProfileService } from '../ProfileService/profile.service';
import { AuthService } from "../AuthService/auth.service";

@Injectable()
export class RideService {


    profileService: ProfileService;
    dbRef: any;
    hits = new BehaviorSubject([])
    items: FirebaseListObservable<any[]>;
    ride : Array<any>;

    RIDE:Ride1[] = [{
               key: '0001',
               locations: [{ coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' }],
               destination: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               start_location: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               current_location: { coords: [11, 0, 3], id: '0001', name: 'current' },
               car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 },
               creator: '0001',
               free_seats: 1,
               passengers: ['0002', '0003'],
               pickupTime: '20.09.2017, 09:00 Uhr',
               driverId: '0001',
               driver: {}
   
           }, 
           {
               key: '0002',
               locations: [{ coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' }],
               destination: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               start_location: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               current_location: { coords: [11, 0, 3], id: '0001', name: 'current' },
               car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 },
               creator: '0001',
               free_seats: 1,
               passengers: ['0002', '0003'],
               pickupTime: '20.09.2017, 07:00 Uhr',
               driverId: '0002',
               driver: {}
   
           },
           {
               key: '0003',
               locations: [{ coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' }],
               destination: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               start_location: { coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
               current_location: { coords: [11, 0, 3], id: '0001', name: 'current' },
               car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'blue', seats: 5 },
               creator: '0001',
               free_seats: 1,
               passengers: ['0002', '0003'],
               pickupTime: '20.09.2017, 08:00 Uhr',
               driverId: '0003',
               driver: {}
   
           }
        
    ];

    constructor(private db: AngularFireDatabase, private auth: AuthService, private geoService: GeoService, profileService: ProfileService) {

        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/rides');
        this.profileService = profileService;
        //this.getAvailableRides()


    }


  


    getRide(id: string) {
        return {
            key: '0001',
            locations: [{ coords: [11, 0], id: '0001', name: 'Bushaltestalle B9' },
            { coords: [11, 0], id: '0001', name: 'Rheinaue' }],
            destination: { coords: [11, 0], id: '0001', name: 'Bonn Landgabenweg' },
            start_location: { coords: [11, 0], id: '0001', name: 'Wachtberg' },
            current_location: { coords: [11, 0, 3], id: '0001', name: 'current' },
            car: { id: '0001', make: 'VW', model: 'eGolf', colour: 'white', seats: 5 },
            creator: '0001',
            free_seats: 1,
            passengers: ['0002', '0003'],
            pickupTime: '20.09.2017, 09:00 Uhr',
            driverId: '0001',
            driver: {}

        }

    }

    getRideFromId(id: string): Observable<any> {
        console.log("getRideFromId called with id: " + id);
        return this.db.object(`rides/${id}`).take(1)
    }


    addRide(form_params: any) {

        const location = this.createLocationArr(form_params)
        const aggregated_form = this.aggregateForm(form_params)
        //const aggregated_form = this.aggregateForm(form_params, location)
        this.db.database.ref(`/rides`).push({[this.auth.currentUserId] : aggregated_form})
            .then((snap) => {
                const key = snap.key
                this.geoService.setLocation(key, location)
                this.setUserRide(key)
            })

    }

    setUserRide(rideId){
        this.db.list(`users/${this.auth.currentUserId}/ride_templates`).push({ [rideId] : true})
    }

    updateActiveRide(rideId){
        this.db.list(`users/${this.auth.currentUserId}/ride_templates`).push({[rideId] : true})
    }

    //helper functions
    createLocationArr(form_params) {
        const lat = form_params.start_location.geometry.location.lat
        const lng = form_params.start_location.geometry.location.lng
        const location = [lat, lng]

        return location
    }

    aggregateForm(form_params) {
        return {
            locations: {
                start_location: form_params.start_location,
                destination_location: form_params.destination_location
            },
            creator_id: this.auth.currentUserId, 
            creator: {
                displayName: this.auth.currentUserDisplayName,
                _id: this.auth.currentUserId
            },
            free_seats: 4,
            car:{
                make:'VW',
                model:'eGolf',
                colour:'white',
                seats: 5
            },
            pickupTime: form_params.time,
            date: form_params.date
        }
    }


    cancelRide(id: string) {
        console.log("cancelRide called with id: " + id);
        let tempRide = this.db.database.ref(id).once;



        const promise = this.db.database.ref('/rides/' + id).remove();
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

    getAvailableRides(){
        this.getStartLocation(this.auth.currentUserId)
            .switchMap(ride => {
                if(ride != [])
                return this.geoService.getLocations(5, this.rideToStartLocation(ride))
            } ).subscribe(x => console.log(x))
        
    }

    //he;per function 
    rideToStartLocation(ride){
        console.log(ride)
        const lng = ride.locations.start_location.geometry.location.lng
        const lat = ride.locations.start_location.geometry.location.lat
        return [lat, lng]
    }
    joinRide(id: string){

    }

    getCanceledRides(profileId: string) {
        return [];
    }

    getStartLocation(of_user_id: string){
        return this.db.list(`/rides/${of_user_id}`).take(1);
    }
}
