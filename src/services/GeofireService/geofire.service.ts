import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GeoService {

  dbRef: any;
  geoFire: any;
  hits = new BehaviorSubject([])

  constructor(private db: AngularFireDatabase) {
    /// Reference database location for GeoFire
    this.dbRef = this.db.list('/locations');
    this.geoFire = new GeoFire(this.dbRef.$ref);
   }

   /// Adds GeoFire data to database
   /// key : RIDE ID 
   setLocation(key:string, coords: Array<number>) {
     this.geoFire.set(key, coords)
         .then(res => console.log('location succesfully updated'))
         .catch(err => console.log(err, 'error while updating'))
   }

   /// Queries database -> nearby locations
   /// result is mapped to Geofire
   /// coords lat lng'


/*  
    example Query 
    var geoQuery = geoFire.query({
    center: [10.38, 2.41],
    radius: 10.5
  });   

*/


   getLocations(radius: number, coords: Array<number>) {
    //geofire query
    return this.geoFire.query({
      center: coords,
      radius: radius
    })
   }
}