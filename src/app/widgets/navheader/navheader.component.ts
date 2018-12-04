import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  searchText: any = null;
  countries: any[] = [];
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTap(ev){
    this.searchText = ev.target.value;
    this.valueChange.emit({search:this.searchText, results: this.countries});
    console.log(ev.target.value);
  }

}
