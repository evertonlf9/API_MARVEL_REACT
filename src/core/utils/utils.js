import CryptoMD5 from 'crypto-md5';

class Utils {

    getUrl(options) {
		const { offset, name, title, exactMatch, sortName, limit, type, id } = Object.assign({
			offset: 0,
			name: '',
			title: '',
			exactMatch: false,
			sortName: '',
			limit: 20,
		}, options);

        const keys = this.GenerateKeys();
		let url = `${type}?ts=${keys.ts}&apikey=${keys.apikey}&hash=${keys.hash}&offset=${offset}&orderBy=${sortName}&limit=${limit}`;

		if (name) {
			if (exactMatch) { url += `&name=${name}`; }
			else { url += `&nameStartsWith=${name}`; }
		}
		
		if (title) {
			if (exactMatch) { url += `&title=${title}`; }
			else { url += `&titleStartsWith=${title}`; }
		}
		
		if (id) {
			url =  `${type}/${id}?ts=${keys.ts}&apikey=${keys.apikey}&hash=${keys.hash}`;
		}

		return url;
	}

    GenerateKeys() {

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