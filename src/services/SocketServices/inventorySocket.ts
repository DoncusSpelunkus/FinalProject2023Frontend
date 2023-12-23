import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { getItems } from "src/app/states/inventory/product-actions";
import { EntityTypes } from "src/constants/product-types";
import { AuthSelectors } from "src/app/states/auth/auth-selector";

@Injectable({
    providedIn: 'root'
})
export class InventorySocket {

    private hubConnection: signalR.HubConnection;

    private productSubject = new Subject<any>();
    private locationSubject = new Subject<any>();
    private productLocationSubject = new Subject<any>();
    private brandSubject = new Subject<any>();
    private typeSubject = new Subject<any>();

    @Select(AuthSelectors.getToken) token$: Observable<string>;


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
                .withUrl(environment.inventorySocketUrl, {
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
                console.log(data)
            });

            this.hubConnection.on("BrandListUpdate", (data) => {
                this.brandSubject.next(data);
            });

            this.hubConnection.on("TypeListUpdate", (data) => {
                this.typeSubject.next(data);
            });
        }
        catch (error) {
            console.log(error)
        }

        this.InitializeData();
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

    public getBrands() {
        return this.brandSubject.asObservable();
    }

    public getTypes() {
        return this.typeSubject.asObservable();
    }

    private InitializeData() { // Probably not the best way to do this but it works
        for (let i = 1; i <= 5; i++) {
            this.hubConnection.invoke("Request", {
                "RequestType": i
            });
            this.store.dispatch(new getItems(EntityTypes[i]));
        }

    }
}