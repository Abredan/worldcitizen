import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  searchText: any = null;
  countries: any[] = [];
  @Output() valueChange = new EventEmitter();

  constructor(private countryService: CountryService) { }

  ngOnInit() {
  }

  onTap(ev){
    this.searchText = ev.target.value;
    if(this.searchText.length>1){
      this.countryService.getCountryByName(this.searchText)
      .then((countries:any[])=>{
          this.countries = countries;
          this.valueChange.emit({search:this.searchText, countries: this.countries});
        }).catch((error:any)=>{
          this.countries = [];
          this.valueChange.emit({search:this.searchText, countries: this.countries});
        });
    }
  }


}
