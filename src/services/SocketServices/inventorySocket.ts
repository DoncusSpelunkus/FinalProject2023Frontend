import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InventorySocket {

    private hubConnection: signalR.HubConnection;
    private productSubject = new Subject<any>();
    private locationSubject = new Subject<any>();
    private productLocationSubject = new Subject<any>();


    constructor() {
        if (localStorage.getItem("auth") != null) {
            this.establishConnection();
        }
    }

    public establishConnection() { // We establish a connection with a socket defined by our enbironment file
        try {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(environment.inventorySocketUrl, {
                    accessTokenFactory: () => {
                        return localStorage.getItem("auth") || '';
                    }
                })
                .build();

            this.hubConnection.start().then(() => console.log("MainSocket started"));
            

            // we describe the event we want to listen to and what we want to do when we get the event
            this.hubConnection.on("ProductListUpdate", (data) => {
                this.productSubject.next(data);
                console.log(data);
            });

            this.hubConnection.on("LocationListUpdate", (data) => {
                this.locationSubject.next(data);
                console.log(data)
            });

            this.hubConnection.on("ProductLocationListUpdate", (data) => {
                this.productLocationSubject.next(data);
                console.log(data)
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    public terminateConnection() {
        this.hubConnection.stop();
    }

    // We return the subject as an observable so we can subscribe to it
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