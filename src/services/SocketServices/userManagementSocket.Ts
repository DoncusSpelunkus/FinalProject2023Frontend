import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserManagementSocket {

    private hubConnection: signalR.HubConnection;
    private userSubject = new Subject<any>();


    constructor() {
        if (localStorage.getItem("auth") != null) {
            this.establishConnection();
        }
    }

    public establishConnection() { // We want to run this method on a later stage to insure token avaliability
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.userManagementSocketUrl, {
                accessTokenFactory: () => {
                    return localStorage.getItem("auth") || '';
                }
            })
            .build();

        this.hubConnection.start().then(() => console.log("MainSocket started"));



        this.hubConnection.on("ProductListUpdate", (data) => {
            this.userSubject.next(data);
            console.log(data);
        });

        this.hubConnection.on("LocationListUpdate", (data) => {
            this.userSubject.next(data);
            console.log(data)
        });

        this.hubConnection.on("ProductLocationListUpdate", (data) => {
            this.userSubject.next(data);
            console.log(data)
        });
    }

    public terminateConnection() {
        this.hubConnection.stop();
    }

    public getUsers() {
        return this.userSubject.asObservable();
    }
}
