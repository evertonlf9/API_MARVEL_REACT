import axios from 'axios';

class Http {
	constructor() {
		this.instanceAxios = axios.create({
			baseURL: 'https://gateway.marvel.com/v1/public/'
		});
	}

	getInstanceAxios () {
		return {...this.instanceAxios};
	}

	getData(data, type, callback) {
		const promisse = [];
        if(data && typeof data !== 'string') {
          data.forEach(url => {
			  console.log(url)
            promisse.push(this.getInstanceAxios().get(url))
          });
        }else if(data) {
			console.log(data)
          promisse.push(this.getInstanceAxios().get(data));
        }

        Promise.all(promisse).then((results) => {
			results = results.map((resp) => resp.data); 
			callback && callback(type, results);
		});      
	}
	
	_getData(data, type) {
		const promisse = [];
        if(data && typeof data !== 'string') {
          data.forEach(url => {
			url = url.replace('http://', 'https://');
            promisse.push(this.getInstanceAxios().get(url))
          });
        }else if(data) {
			data = data.replace('http://', 'https://');	
          	promisse.push(this.getInstanceAxios().get(data));
        }          
		
		return new Promise((resolve, reject) => 
			Promise.all(promisse).then((results) => {
				results = results.map((resp) => resp.data);
				resolve({data: results, type: type});
			}).catch((err) => reject(err))
		);
	}

	get(url, headers) {
		let configs = {};

		configs.headers = {
			...headers
		};

		return new Promise((resolve, reject) => this.instanceAxios.get(url, configs)
			.then(resolve)
			.catch(err => {
				reject("Erro - Tente novamente mais tarde");
			})
		);
	}

	post(url, data, headers) {
		let configs = {};

		configs.headers = {
			...headers
		};

		return new Promise((resolve, reject) => this.instanceAxios.post(url, data || {}, configs)
			.then(resolve)
			.catch(err => {
				reject("Erro - Tente novamente mais tarde");
			})
		);
	}

	put(url, data, headers) {
		let configs = {};

		configs.headers = {
			...headers
		};

		return new Promise((resolve, reject) => this.instanceAxios.put(url, data || {}, configs)
			.then(resolve)
			.catch(err => {
				reject("Erro - Tente novamente mais tarde");
			})
		);
	}

	delete(url, headers, data) {
		let configs = {};

		configs.headers = {
			...headers
		};

		return new Promise((resolve, reject) => this.instanceAxios.delete(url, configs, data || {})
			.then(resolve)
			.catch(err => {
				reject("Erro - Tente novamente mais tarde");
			})
		);
	}
}

export default new Http();