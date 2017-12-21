import axios from 'axios';

const makeRequest =
  async (url, method = 'GET', auth = null, bodyData = null) => {
    const opts = { method, url };

    if (auth) opts.headers = { 'Authorization': `Bearer ${auth}` };

    if (bodyData) opts.data = bodyData;

    const response = await axios(opts)
      .then(data => data.data)
      .catch(error => {
        console.warn(error);
        return error;
      });

    return response;
}

export { makeRequest };
