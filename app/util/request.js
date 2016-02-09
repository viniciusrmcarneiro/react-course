import axios from 'axios';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default (new (function(){
    const header = {};
    const {config,} = process.env;
    const instance = axios.create({
      baseURL: config.apiURL,
      // timeout: 1000,
      // headers: {'X-Custom-Header': 'foobar'}
    });

    this.setHeader = function(header){
    };

    this.get = function(url){
        return Promise.resolve();
    };

    this.put = function(url, body){
        return instance.put(url, body);
    };

    this.post = function(url, body){
        return instance.post(url, body)
            .then((response) => response.data);
    };

})());
