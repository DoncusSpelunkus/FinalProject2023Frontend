import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { getUsers } from "src/app/states/userManagement/user-actions";
import { AuthSelectors } from "src/app/states/auth/auth-selector";


@Injectable({
    providedIn: 'root'
})
export class UserManagementSocket {

    private hubConnection: signalR.HubConnection;
    private userSubject = new Subject<any>();
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
                .withUrl(environment.userManagementSocketUrl, {
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

    public terminateConnection() {
        this.hubConnection.stop();
    
    }

    public getUsers() {

        return this.userSubject.asObservable();
    }

    private requestUsers() {
        this.hubConnection.invoke("RequestUsers");
    }
}
