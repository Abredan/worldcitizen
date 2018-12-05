import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  searchText: any = null;
  countries: any[] = [];
  @Output() valueChange = new EventEmitter();
  @Input() hide: boolean;

  constructor(private countryService: CountryService, 
    public progress: NgProgress) { }

  ngOnInit() {
    this.all();
  }

  onTap(ev){
    this.searchText = ev.target.value;
    if(this.searchText.length>1){
      this.all(this.searchText);
    }else{
      this.all();
    }
  }

  all(keywords: string = null){
    this.progress.ref().start();
    this.countryService.all()
      .then((countries:any[])=>{
        if(!keywords)
          this.countries = this.shuffle(countries).slice(0,50);
        else{
          this.countries = countries.filter((country:any)=>{
            return country.name.toLowerCase().indexOf(keywords.toLowerCase())==0 ||
              country.alpha3Code.toLowerCase().indexOf(keywords.toLowerCase())==0 ||
              country.capital.toLowerCase().indexOf(keywords.toLowerCase())==0 ||
              country.callingCodes[0].toLowerCase().indexOf(keywords.toLowerCase())==0 ||
              country.region.toLowerCase().indexOf(keywords.toLowerCase())==0;
            });
          }
          this.valueChange.emit({search:this.searchText, countries: this.countries});
          this.progress.ref().complete();        
        }).catch((error:any)=>{
          this.countries = [];
          this.valueChange.emit({search:this.searchText, countries: this.countries});
          this.progress.ref().complete();
        });
  }

  shuffle(arr) {
      let ctr = arr.length;
      let temp;
      let index;

      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
      }
      return arr;
  }


}
