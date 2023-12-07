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
    private connectionEstablished = false;


    constructor() {
        this.establishConnection();
    }

    public async establishConnection() { // We establish a connection with a socket defined by our enbironment file
        if (localStorage.getItem("auth") != null) {
            try {
                if (this.connectionEstablished == true) { return; }
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(environment.userManagementSocketUrl, {
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
                this.hubConnection.on("UserListUpdate", (data) => {
                    this.userSubject.next(data);
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

    public getUsers() {
        return this.userSubject.asObservable();
    }
}
