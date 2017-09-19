import { Component, NgZone, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { BehaviorSubject } from "rxjs/";

@Component({
  selector: 'page-find-shop',
  templateUrl: 'find-location.subpage.html',
})

export class FindLocationPage  implements OnInit{
    autocompleteItems;
    autocomplete;

    service = new google.maps.places.AutocompleteService();
    geocoder = new google.maps.Geocoder() ;
    placeholder: BehaviorSubject<string> = new BehaviorSubject('');
    only_cities: boolean;
    @ViewChild('ionSearchbar') searchbar: ElementRef;
    
    constructor(public viewCtrl: ViewController, private zone: NgZone, private renderer: Renderer2, private elementRef: ElementRef, private params: NavParams) {
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }

    ngOnInit(){
        this.only_cities = this.params.get('limitToCities') 
        this.placeholder.next(this.only_cities ? 'Stadt eingeben' : 'Adresse eingeben')
    }


    chooseItem(location: any) {
        this.viewCtrl.dismiss(this.geocodeToGeometry(location));
    }

    geocodeToGeometry(location){
        this.geocoder.geocode({'placeId':location.place_id}, (results, status) => {
            if((status as any) === 'OK'){
                if(results[0]){
                    // get lat and lng values
                    
                    const lat = results[0].geometry.location.lat()
                    const lng = results[0].geometry.location.lng()
                    //set lat and lng values
                    location['geometry'] = {location: {lat: lat, lng: lng}}
                    location['formatted_address'] = results[0].formatted_address
                    console.log('have set lat and lng: ', {location: {lat: lat, lng: lng}})
                }   
            }
        })

        return location
    }

    dismissView(){
        this.viewCtrl.dismiss()
    }

    updateSearch() {

        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let me = this;
        const query = (this.only_cities) ? { input: this.autocomplete.query, componentRestrictions: { country: 'DE' }, types: ['(cities)'] } 
                                         : { input: this.autocomplete.query, componentRestrictions: { country: 'DE' } }
        this.service.getPlacePredictions(query, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(() => {
                if (predictions) {
                    predictions.forEach((prediction) => {
                        me.autocompleteItems.push(prediction);
                    });
                }
            });
        });
    }

}
