import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { AuthSelectors } from "src/app/states/auth/auth-selector";
import { getShipments } from "src/app/states/shipment/shipment-actions";

@Injectable({
    providedIn: 'root'
})
export class ShipmentSocket {

    private hubConnection: signalR.HubConnection;
    @Select(AuthSelectors.getToken) token$: Observable<string>;
    private shipmentSubject = new Subject<any>();


    constructor(private store: Store) {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        let token = "";
        await this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
            token = data;
        })
        try {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(environment.shipmentSocketUrl, {
                    accessTokenFactory: () => {
                        return token;
                    }
                })
                .withAutomaticReconnect()
                .build();
            try {
                await this.hubConnection.start();
            }
            catch (error) {
                console.log(error)
            }
            this.hubConnection.on("ShipmentListUpdate", (data) => {
                this.shipmentSubject.next(data);
            });
        }
        catch (error) {
            console.log(error)
        }
        this.initialize();
    }

    private initialize() {
        this.store.dispatch(new getShipments());
        this.hubConnection.invoke("RequestShipment")
    }

    public terminateConnection() {
        this.hubConnection.stop();
    }

    // We return the subject as an observable so we can subscribe to it
    public getShipments() {
        return this.shipmentSubject.asObservable();
    }
}