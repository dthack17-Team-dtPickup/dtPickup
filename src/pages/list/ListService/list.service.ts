import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { GeoService } from "../../../services/GeofireService/geofire.service";

@Injectable()
export class RideListService {

    constructor(private db: AngularFireDatabase, private geofire: GeoService){

    }

    getRides(location: Array<any>, to: Object, radius: number){
        const locations = this.geofire.getLocations(radius, location);
        // ... to code 

    }

    

}