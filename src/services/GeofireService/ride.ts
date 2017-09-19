import {Location} from './location';

export class Ride {
    key:string;
    locations:Location[];
    destination:Location;
    start_location:Location;
    current_location:Location;
    creator:string;
    free_seats:number;
    members:string[];
    


}