import jwtDecode from 'jwt-decode'
import { Auth } from './Auth'
import {default as K} from '../Model/Constants'


export class Http { 

    accessToken: string
    authorization: string

    constructor (accessToken: string) {
        this.accessToken = accessToken
        this.authorization = `Bearer ${this.accessToken}`
    }

    get<T> ( path: string, params?: QueryParams) : Promise<T> {

        return new Promise ( (resolve,reject) => {
          this.checkJwt(this.accessToken)
            .then((val) => {
              if (val) {
                console.log (`${K.server}${path}${addiction}`)
                fetch(`${K.server}${path}${addiction}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: this.authorization,
                    },
                }).then((response) => response.json())
                  .then((values: T) => {
                    resolve(values);
                  })
                .catch((error) => {
                   reject(error);
                 });

              } else {
                let auth = new Auth();
                console.log('refresh token')
                auth.refresh().then( (val) => {
                  this.accessToken = val
                    this.get <T> (path, params).then ( (values) => {
                      resolve(values)
                    })
                });
              }
            })
            .catch((error) => {
              console.log (error)
            });

          let addiction = "";
          if (params != null) {
            addiction += "?";
            for (let key in params) {
              addiction += key + "=" + params[key] + "&";
            }
          }

        } )
    }

    async checkJwt ( token: string) : Promise<boolean> {
        
        return new Promise ( (resolve,reject) => { 

            let data: DecodedToken = jwtDecode(token)
            if (Math.floor((new Date).getTime() / 1000) > data.exp) { 
                resolve(false)
            } else {
                resolve(true)
            }
        })
    }

}




export interface QueryParams {
    [key: string]: string;
}

export interface DecodedToken {
    exp: any
    ext: number
    name: string
    id: string
}