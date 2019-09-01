import axios from 'axios';

export default class BaseApiCaller {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Call the route, and return a promise which resolves on the network request completing
   *
   * @param {object} options Options for the query
   * @param {string} options.method GET, POST, PUT or DELETE
   * @param {string} options.path Request path, does not include the baseUrl
   * @param {object} options.params Payload for the request
   * @param {object} options.headers Headers for the request
   * 
   * @returns {Promise} Promise which resolves on network request complete
   */
  callRoute({ method, path, params = {}, headers = {}, absolute = false }) {
    let url = null;
    if (absolute) {
      url = path;
    } else {
      url = `${this.baseUrl}${path}`;
    }

    switch (method) {
      case 'GET':
        return axios.get(
          url, { params, headers: headers }
        );
      case 'POST':
        return axios.post(
          url, params, { headers: headers }
        );
      case 'PUT':
        return axios.put(
          url, params, { headers: headers }
        );
      case 'DELETE':
        return axios.delete(
          url, { headers: headers, data: params }
        );
      default:
        return new Promise((resolve, reject) => {
          resolve(false);
        });
    }
  }
}
