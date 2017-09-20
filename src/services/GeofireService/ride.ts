import {Locations} from './location';
import {Car} from '../ProfileService/car';

export interface Ride {
    key:string;
    locations:Locations;
    current_location?:Location;
    creator:Object;
    free_seats:number;
    passengers:string[];
    car:Car;
    pickupTime: string;
    date: any
    


}