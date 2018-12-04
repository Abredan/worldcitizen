import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  BASE_URL: string = "https://restcountries.eu/rest/";
  VERSION: string = "v2";

  constructor(private http: HttpClient) { }

  /**
   * Recupère tous les pays de la base de données
   * @returns Promise
   */
  all(){
    return this.http.get(this.BASE_URL+this.VERSION+"/all").toPromise();
  }

  /**
   * Recupère La liste des pays filtré par le nom du pays
   * @param name Nom du pays
   * @returns Promise
   */
  getCountryByName(name: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/name/"+name).toPromise();
  }

  /**
   * Recupère La liste des pays filtré par le nom complet du pays
   * @param name Nom du pays
   * @returns Promise
   */
  getCountryByFullName(name: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/name/"+name+'?fullText=true').toPromise();
  }

  /**
   * Recupère un pays identifié par un code
   * @param code Code du pays
   * @returns Promise
   */
  getCountryByCode(code: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/alpha/"+code).toPromise();
  }

  /**
   * Recupère une liste de pays identifié par leurs codes respectifs
   * @param codes Code du pays
   * @returns Promise
   */
  getCountryByListOfCode(codes: string[]){
    return this.http.get(this.BASE_URL+this.VERSION+"/alpha/?code="+codes.join(';')).toPromise();
  }

  /**
   * Recupère une liste de pays identifié par la monnaie
   * @param currency Code de la monnaie. Ex:cop
   * @returns Promise
   */
  getCountryByCurrency(currency: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/currency/"+currency).toPromise();
  }

  /**
   * Recupère une liste de pays identifié par la langue
   * @param language Code de la Langue. Ex:fr
   * @returns Promise
   */
  getCountryByLanguage(language: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/lang/"+language).toPromise();
  }

  /**
   * Recupère une liste ou un pays identifié(s) par le nom de la capital
   * @param capital Nom de la capitale. Ex:Paris
   * @returns Promise
   */
  getCountryByCapitalName(capital: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/capital/"+capital).toPromise();
  }

  /**
   * Recupère une liste ou un pays identifié(s) par l'indicatif
   * @param callingcode Indicatif. Ex:225
   * @returns Promise
   */
  getCountryByCallingCode(callingcode: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/callingcode/"+callingcode).toPromise();
  }

  /**
   * Recupère une liste ou un pays identifié(s) par region
   * @param region Nom de la region. Ex:america
   * @returns Promise
   */
  getCountryByRegion(region: string){
    return this.http.get(this.BASE_URL+this.VERSION+"/region/"+region).toPromise();
  }
}
