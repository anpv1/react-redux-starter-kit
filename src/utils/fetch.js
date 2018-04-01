export function fetchData({jwt = null, url, method = 'GET', data = null}){
  var options = {method: method, headers: {}};
  if(jwt){
    options.headers.authorization = jwt;
  }
  if(data){
    options.headers['content-type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  return fetch(`${API_BASE_URL}${url}`, options)
  .then((response) => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Network response was not ok');
  })
  .then(result => (result))
  .catch((error) => {
    throw error;
  });
}
