function download() {
  axios.post('http://localhost:3001/upload/file/download', {
    filename: "e86b04e2-574a-4ad5-9119-958f851335ec_report_detail_ticket (1).xls"
  },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZWVjNDE2LTQ5M2MtNDE2Ny1hZTY1LTVmZDVmYmRkNmFjZSIsInVzZXJuYW1lIjoiZGltYXNhcHJpbGlhbnN5YWh6IiwidGVuYW50IjoiVGVsa29tc2VsIER1bmlhIiwicGljIjoiRGltYXMgQXByaWxpYW5zeWFoIiwiYnVja2V0IjoidGVsa29tc2VsZHVuaWEiLCJpYXQiOjE1NjM3MDYzODMsImV4cCI6MTU2NDMxMTE4M30.3m9AC1CofYlDQeGDm7QtRl2EMD6l-Wvi1iJ5h4cII9k'
      }
    }).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
    })
}

// `upload` iterates through all files selected and invokes a helper function called `retrieveNewURL`.
function upload() {
  // Get selected files from the input element.
  var files = document.querySelector("#selector").files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // Retrieve a URL from our server.
    retrieveNewURL(file, (file, url, data) => {
      // Upload the file to the server.
      uploadFile(file, url, data);
    });
  }
}

function retrieveNewURL(file, cb) {
  axios.get('http://localhost:3001/upload/file/upload', {
    params: {
      name: file.name
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1ZWVjNDE2LTQ5M2MtNDE2Ny1hZTY1LTVmZDVmYmRkNmFjZSIsInVzZXJuYW1lIjoiZGltYXNhcHJpbGlhbnN5YWh6IiwidGVuYW50IjoiVGVsa29tc2VsIER1bmlhIiwicGljIjoiRGltYXMgQXByaWxpYW5zeWFoIiwiYnVja2V0IjoidGVsa29tc2VsZHVuaWEiLCJpYXQiOjE1NjM3MDYzODMsImV4cCI6MTU2NDMxMTE4M30.3m9AC1CofYlDQeGDm7QtRl2EMD6l-Wvi1iJ5h4cII9k'
    }
  }).then((response) => {
    const url = response.data.data.url
    const data = response.data
    // console.log(response.data)
    cb(file, url, data);
  }).catch((error) => {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  })
}

function uploadFile(file, url, data) {
  console.log("file", file);
  if (document.querySelector('#status').innerText === 'No uploads') {
    document.querySelector('#status').innerHTML = '';
  }

  let options = {
    headers: {
      'Content-Type': file.type
    }
  }

  axios.put(url, file, options).then((response) => {
    console.log(data)
    return data
  }).catch((error) => {
    console.log(error);
  })
}
