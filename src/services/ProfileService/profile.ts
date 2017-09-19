import {Car} from './car';
import {Location} from '../GeofireService/location';
export class Profile{

    id:string;
    company:string;
    name:string;
    first_name:string;
    rating:number;
    car:Car;
    default_start:Location;

}