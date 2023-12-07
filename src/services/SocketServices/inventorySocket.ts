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
    private connectionEstablished = false;


    constructor() {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        if (localStorage.getItem("auth") != null) {
            try {
                if (this.connectionEstablished == true) { return; }
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(environment.inventorySocketUrl, {
                        accessTokenFactory: () => {
                            return localStorage.getItem("auth") || '';
                        }
                    })
                    .build();
                try {
                    await this.hubConnection.start().then(() => console.log("Inventory socket started"));
                    this.connectionEstablished = true;
                }
                catch (error) {
                    console.log(error)
                    return
                }
                // we describe the event we want to listen to and what we want to do when we get the event
                this.hubConnection.on("ProductListUpdate", (data) => {
                    this.productSubject.next(data);
                });

                this.hubConnection.on("LocationListUpdate", (data) => {
                    this.locationSubject.next(data);
                });

                this.hubConnection.on("ProductLocationListUpdate", (data) => {
                    this.productLocationSubject.next(data);
                });

                this.hubConnection.onclose(async () => {
                    this.connectionEstablished = false;
                    await this.establishConnection();
                });
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    public terminateConnection() {
        this.hubConnection.stop();
        this.connectionEstablished = false;
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