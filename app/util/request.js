export default (new (function(){
	const header = {};
	
	this.setHeader = function(header){
	};

	this.get = function(url){
		return Promise.resolve();
	};

	this.post = function(url, {email, password}){
		if (url == 'auth/login'){
			if (email == 'test@test.com' && password == '123'){
				return Promise.resolve({token: '123'});
			}
			return Promise.resolve({});
		}

		throw new Error(url);
	};

})());