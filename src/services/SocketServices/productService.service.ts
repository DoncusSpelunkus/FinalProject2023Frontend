import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";





@Injectable({
    providedIn: 'root'
})
export class ProductSocket {

    private hubConnection: signalR.HubConnection;
    private productSubject = new Subject<any>();
    private locationSubject = new Subject<any>();
    private productLocationSubject = new Subject<any>();


    constructor() { }


    public establishConnection() { // We want to run this method on a later stage to insure token avaliability
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.socketUrl, {
                accessTokenFactory: () => {
                    return localStorage.getItem("auth");
                }
            })
            .build();
        this.hubConnection.start().then(() => console.log("MainSocket started"));

        this.hubConnection.on("ProductListUpdate", (data) => {
            this.productSubject.next(data);
        });

        this.hubConnection.on("LocationListUpdate", (data) => {
            this.locationSubject.next(data);
        });

        this.hubConnection.on("ProductLocationListUpdate", (data) => {
            this.productLocationSubject.next(data);
        });
    }

    public getProducts() {
        return this.productSubject.asObservable();
    }

    public getLocations() {
        return this.locationSubject.asObservable();
    }

    public getProductLocations() {
        return this.productLocationSubject.asObservable();
    }





}