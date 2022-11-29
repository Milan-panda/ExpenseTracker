export class UserAuthModel{
    constructor(
        public email:string, 
        private _token:string, 
        private _tokenExpirationDate:Date){}

    getToken(){
        if(this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}