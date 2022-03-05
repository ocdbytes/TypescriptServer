import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<string>("accessTokenPrivateKey")
const publicKey = config.get<string>("accessTokenPublicKey")


export function signJwt(object : Object, options? : jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

export function verifyJwt(token:string){
    try {
        const decoded = jwt.verify(token,publicKey);
        {
            valid : true;
            expired : false;
            decoded;
        }
    } catch (error:any) {
        {
            valid : false;
            expired : error.message === "jwt expired";
            decoded : null;
        }
    }
}