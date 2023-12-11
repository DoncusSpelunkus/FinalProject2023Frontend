import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";
import { Store } from "@ngxs/store";
import { getUsers } from "src/app/states/userManagement/user-actions";


@Injectable({
    providedIn: 'root'
})
export class UserManagementSocket {

    private hubConnection: signalR.HubConnection;
    private userSubject = new Subject<any>();
    private connectionEstablished = false;


    constructor(private store: Store) {
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
                    this.connectionEstablished = true;
                    await this.hubConnection.start();
                }
                catch (error) {
                    console.log(error)
                    this.connectionEstablished = false;
                    return
                }
                // we describe the event we want to listen to and what we want to do when we get the event
                this.hubConnection.on("UserListUpdate", (data) => {
                    this.userSubject.next(data);
                });
                this.store.dispatch(new getUsers());
                
            }
            catch (error) {
                console.log(error)
            }
            this.requestUsers();
        }
    }

    public terminateConnection() {
        this.hubConnection.stop();
        this.connectionEstablished = false;
    }

    public getUsers() {

        return this.userSubject.asObservable();
    }

    private requestUsers() {
        this.hubConnection.invoke("RequestUsers");
    }
}
