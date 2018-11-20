import CryptoMD5 from 'crypto-md5';

class Utils {

    getUrlApiMavel(){
        return 'https://gateway.marvel.com/v1/public/';
    }

    GenerateKeys(){

        const publicKey = '6d373fd4ab2cf19d34126b379bfcaa25';
        const privateKey =  '10342adde8b813d874884ddec95e44ec8f5fdbbd';

        const ts = new Date().getTime();
        const hash = CryptoMD5(ts + privateKey + publicKey, 'hex');

        return {
            ts: ts,
            apikey: publicKey,
            hash: hash.toString()
        }
    }

}
export default new Utils();