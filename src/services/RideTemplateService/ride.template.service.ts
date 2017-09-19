import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RideTemplate } from './RideTemplate';
import 'rxjs/add/operator/take';

@Injectable()
export class RideTemplateService {

    dbRef: any;
    hits = new BehaviorSubject([])

    constructor(private db: AngularFireDatabase) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/ridetemplates');
    }

    RIDETEMPLATES: RideTemplate[] = [
        { id: '0001', profileId: '0001', isDriver: true, startpoint: "Sandstraße 13, Wachtberg", endpoint: "Landgrabenweg 151, Bonn" },
        { id: '0002', profileId: '0001', isDriver: false, startpoint: "Sandstraße 13, Wachtberg", endpoint: "Landgrabenweg 151, Bonn" }
    ];

    getRideTemplates(profileId: string) {
        return this.RIDETEMPLATES;
    }

}

