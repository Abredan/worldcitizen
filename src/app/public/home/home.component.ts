import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import leaflet from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countries: any[] = [];
  searchText:string = null;

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  markerGroup: any;
  selector: string = '.countries-list';
  oldSelected: any = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.map = leaflet.map("map").fitWorld();
    this.markerGroup = leaflet.featureGroup();

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
  }

  queryCountries(results){
    console.log(results);
    this.countries = results.countries;
    this.searchText = results.searchText;
    if(this.countries.length)
      this.loadMarkers(this.countries);
    else
      this.markerGroup.clearLayers();
  }

  disableMarker(){
    if(this.oldSelected){
      this.oldSelected.setIcon(this.iconTemplate(this.oldSelected.options.label))           
                      .setZIndexOffset(0);
    }
    this.oldSelected = null;
  }

  pickOne(country: any){
    this.map.flyTo(country.latlng, 6, {duration:1});
    this.markerGroup.eachLayer(function (layer) {
      if(layer.options.reference === country.alpha3Code){
        layer.openPopup();
      }
    });
    setTimeout(()=>{
      this.router.navigateByUrl('/country/'+country.alpha3Code);
    },1200)
  }

  toggleMapItem(country: any){
    let that = this;
    if(this.oldSelected){
      this.oldSelected.setIcon(this.iconTemplate(this.oldSelected.options.label))
                      .setZIndexOffset(0);
    }
    this.markerGroup.eachLayer(function (layer) {
      if(layer.options.reference === country.alpha3Code){
        layer.setIcon(that.iconTemplate(layer.options.label, true))
        .setZIndexOffset(1000);
        that.oldSelected = layer;
      }
    });
  }

  iconTemplate(name: string, isactive:boolean = false){
    let className = (isactive)? 'marker is-active' : 'marker';
    return new leaflet.DivIcon({
      className: 'my-div-icon',
      html: '<div class="'+className+'" style="position:absolute;"><span class="my-div-span">'+name+'</span></div>'
    });
  }

  loadMarkers(countries: any[]) {
    this.markerGroup.clearLayers();
    countries.forEach(country => {
      if(country.latlng.length>1){
        let coords = country.latlng;
        let myIcon = this.iconTemplate(country.name);
        let marker: any = leaflet.marker([coords[0],coords[1]],{
          icon: myIcon,
          riseOnHover: false,
          riseOffset: 10000,
          reference: country.alpha3Code,
          label: country.name,
        }).on('click', (ev)=>{
          this.map.flyTo(country.latlng, 6, {zoom:6,duration:0.2});
          // this.router.navigateByUrl('/country/'+country.alpha3Code);

        });
        
        let popup = new leaflet.popup()
          .setLatLng([coords[0],coords[1]])
          .setContent(`<div class="markerview"><div class="item">
                        <img src="${country.flag}" alt="${country.nativeName}" width="100%">
                        <h5>${country.nativeName}<br>${country.capital.substr(0,25)} <br>
                        <span class="name">${country.subregion}</span></h5>
                        <span class="oneline"><ion-icon name="pin"></ion-icon> ${country.region}</span>
                      </div></div>`);
        marker.bindPopup(popup);

        this.markerGroup.addLayer(marker);
      }
    });
    this.map.addLayer(this.markerGroup);
    this.map.fitBounds(this.markerGroup.getBounds());
  }

}
