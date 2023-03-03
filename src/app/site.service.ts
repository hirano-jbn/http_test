import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable,map } from 'rxjs';
import { Site } from './site.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http:HttpClient) { }

  getSites():Observable<Site[]>{
    return this.http.get<Site[]>
    ('http://localhost:3000/sites');
  }

  getSite(id: string):Observable<Site>{
    return this.http.get<Site>
    ('http://localhost:3000/sites');
  }

  createSites(siteInfo: Site):Observable<Site>{
    const body = JSON.stringify(siteInfo);
    return this.http.post<Site>
    ('http://localhost:3000/sites', body, httpOptions);
  }

  updateSite(id: string, siteInfo: Site):Observable<Site>{
    const body = JSON.stringify(siteInfo);
    return this.http.put<Site>
    ('http://localhost:3000/sites/' + id, body, httpOptions)
  }

  deleteSite(id: string){
    console.log("test2" + id)
    return this.http.delete('http://localhost:3000/sites/' + id);
  }


}
