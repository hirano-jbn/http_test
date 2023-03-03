import { Component, OnInit } from '@angular/core';
import { SiteService } from './site.service';
import { Site } from './site.model'
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  siteName: string = "";
  siteURL: string = "";
  sites:Site[] = [];
  updateId: string = "";
  updateName: string = "";
  updateURL: string = "";
  deleteId: string = "";

  constructor(private siteService: SiteService){

  }

  ngOnInit(): void {
    this.siteService.getSites().subscribe(
      (data: Site[]) =>{
        this.sites = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createData(){
    if(this.siteName === "" || this.siteURL === "") return;

    const siteInfo: Site = {
      name:this.siteName,
      url: this.siteURL
    }

    this.siteService.createSites(siteInfo).subscribe(
      (data: Site) => {
        this.sites.push(data);

        this.siteName = "";
        this.siteURL = "";
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateData(){
    if(this.updateId === null || this.updateName ==="" || this.updateURL ==="") return;

    const siteInfo: Site = {
      name:this.updateName,
      url: this.updateURL
    }

    this.siteService.updateSite(this.updateId, siteInfo).subscribe(
      (data: Site) => {
        const index = this.sites.findIndex(site => site.id === data.id);
        this.sites[index] = {
          id: data.id,
          name: data.name,
          url: data.url
        };
        // 処理が終わったら初期化
        this.updateId = "";
        this.updateName = "";
        this.updateURL = "";
      },
      (err) => {
        console.log(err)
      }
    );
  }

  deleteData(){
    if(this.deleteId === ""){ 
      console.log("test1")
      return;
    }

    this.siteService.deleteSite(this.deleteId).subscribe(() => {
      console.log(this.deleteId)
      // 入力されたdeleteIdがsitesの中にあればインデックス番号をindexに入れる
      const index = this.sites.findIndex(site => site.id === Number(this.deleteId));
      // 配列から削除
      this.sites.splice(index, 1);
      // deleteIdを初期化
      this.deleteId = "";
    },
    (err) => {
      console.log(err);
    }
    );
  }



}
