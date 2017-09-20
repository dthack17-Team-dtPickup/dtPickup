import {Location} from './location.1';
import {Car} from '../ProfileService/car';

export class Ride1 {
    key:string;
    locations:Location[];
    destination:Location;
    start_location:Location;
    current_location:Location;
    creator:string;
    free_seats:number;
    passengers:string[];
    car:Car;
    driverId:string;
    driver:object;
    pickupTime: string;

    


}