import { Injectable } from "@angular/core";
import { environment } from "src/enviroment";
import * as signalR from "@aspnet/signalr";
import { Subject } from "rxjs";
import { Store } from "@ngxs/store";
import { ClearUser } from "src/app/states/auth/auth-action";

@Injectable({
    providedIn: 'root'
})
export class AuthSocket {

    private hubConnection: signalR.HubConnection;

    private user = new Subject<any>();

    private connectionEstablished = false;


    constructor(private store: Store) {
        let state = localStorage.getItem("Auth")
        if(state != null){
            JSON.parse(state).token != null ? this.getUserConnection(JSON.parse(state).token) : null
        }
    }



    public async getUserConnection(token: string) { // We establish a connection with a socket defined by our enbironment file
        console.log(token)
        if (token != null) {
            try {
                if (this.connectionEstablished == true) { return; }
                this.hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl(environment.authSocketUrl, {
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
                    this.connectionEstablished = false;
                    return
                }
                this.hubConnection.on("UserUpdate", (data) => {
                    this.user.next(data);
                });
                this.hubConnection.on("UserDelete", () => {
                    this.store.dispatch(new ClearUser());
                });
            }
            catch (error) {
                console.log(error)
            }
            this.initialize();
        }
    }

    public getMe() {
        return this.user.asObservable();
    }

    private initialize() {
        this.hubConnection.invoke("RequestMe");
    }

    public terminateConnection() {
        this.user = new Subject<any>();
        if (this.hubConnection != null) {
            this.hubConnection.stop();
            this.connectionEstablished = false;
        }
    }
}
