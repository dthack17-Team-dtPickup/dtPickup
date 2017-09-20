import {Car} from './car';
import {Locations} from '../GeofireService/location';
import {Route} from '../GeofireService/route';
export class Profile{

    id:string;
    company:string;
    name:string;
    first_name:string;
    rating:number;
    car:Car;
    default_start:Locations;
    routes:Route[];

}