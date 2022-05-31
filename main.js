//AXIOS GLOBAL
axios.defaults.headers.common['X-Auth-Tocken'] = 
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODk wIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh';

// GET REQUEST
function getTodos() {
//   axios({
//     method: 'get',
//     url: 'https://jsonplaceholder.typicode.com/todos',
//     params:{
//       _limit: 5
//     }
//   })
//     .then(res => showOutput(res))
//     .catch(err => console.log(err));
// }


//need not to write get as, by default axios is get
// axios
//     .get('https://jsonplaceholder.typicode.com/todos',{
//       params:{_limit: 5}
// })
//   .then(res => showOutput(res))
//   .catch(err => console.log(err));
// }

axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}



// POST REQUEST
function addTodo() {
  // axios({
  //       method: 'post',
  //       url: 'https://jsonplaceholder.typicode.com/todos',
  //       data:{
  //         title: 'The To-Do list',
  //         completed:false
  //       }
  //     })
  //       .then(res => showOutput(res))
  //       .catch(err => console.log(err));
  // }

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'The To-Do list',
    completed:false
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}


// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'Updated to-do',
    completed:true
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}


// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData(){
  axios.all([
  axios.get('https://jsonplaceholder.typicode.com/todos'),
  axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
    .then(res => {
      console.log(res[0]);
      console.log(res[1]);
      console.log(res[2]);
    })
      .catch(err => console.log(err));
  }

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometocken'
    }
  }  

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'The To-Do list',
    completed:false
  },
    config
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Heklo World'
    },
    transformResponse: axios.default.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response) {
      //Server respond with a status with other than200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status === 404){
        alert('Error: Page Not Found');
      }
    } else if(err.request){
      //Request was made out but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
    
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    cancelToken: source.token
  })
  .then(res=> showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  }
});

  if(true) {
    source.cancel('Request canceled');
  }
}
// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request send to ${config.url} 
  at ${new Date().getTime()}`
  );

  return config;

},
error => {
  return Promise.reject(error);
}
);


// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
