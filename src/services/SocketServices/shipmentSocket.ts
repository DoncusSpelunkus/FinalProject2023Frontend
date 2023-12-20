import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Observable, Subject } from "rxjs";
import { Select } from "@ngxs/store";
import { AuthSelectors } from "src/app/states/auth/auth-selector";

@Injectable({
    providedIn: 'root'
})
export class ShipmentSocket {

    private hubConnection: signalR.HubConnection;
    @Select(AuthSelectors.getToken) token$: Observable<string>;
    private shipmentSubject = new Subject<any>();
    private connectionEstablished = false;


    constructor() {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        let token = "";
        await this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
            token = data;
        })
        try {
            if (this.connectionEstablished == true) { return; }
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(environment.shipmentSocketUrl, {
                    accessTokenFactory: () => {
                        return token;
                    }
                })
                .build();
            try {
                this.connectionEstablished = true;
                await this.hubConnection.start();
            }
            catch (error) {
                console.log(error)
                this.connectionEstablished = false;
                return
            }
            // we describe the event we want to listen to and what we want to do when we get the event
            this.hubConnection.on("ShipmentListUpdate", (data) => {
                this.shipmentSubject.next(data);
                console.log(data)
            });

        }
        catch (error) {
            console.log(error)
        }

    }

    public terminateConnection() {
        this.hubConnection.stop();
        this.connectionEstablished = false;
    }

    // We return the subject as an observable so we can subscribe to it
    public getProducts() {
        return this.shipmentSubject.asObservable();
    }
}