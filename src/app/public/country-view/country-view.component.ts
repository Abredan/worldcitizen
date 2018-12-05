import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css']
})
export class CountryViewComponent implements OnInit {

  countryCode: string;
  country: any = null;

  constructor(private countryService: CountryService, 
    private progress: NgProgress,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get("countryCode");
    this.progress.ref().start();
    this.countryService.getCountryByCode(this.countryCode)
    .then((country:any)=>{
        this.country = country;
        this.country.translations = Object.values(country.translations).filter( this.uniqueName );
        // console.log(this.country.translations);
        this.countryService.getCountryByListOfCode(this.country.borders, ['name'])
          .then((cs:any[])=>{
            this.country.borders = cs.map((cnt:any)=> cnt.name);
            this.progress.ref().complete();
          }).catch((error)=>{
            this.progress.ref().complete();
          });
      })
      .catch((error)=>{
        this.progress.ref().complete();
        this.router.navigateByUrl('');
      });
  }

  uniqueName(value, index, self) { 
    return self.indexOf(value) === index;
  }

}
