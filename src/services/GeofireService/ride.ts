import {Location} from './location';
import {Car} from '../ProfileService/car';

export class Ride {
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