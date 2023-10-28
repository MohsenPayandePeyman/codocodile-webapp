
// add an event listener for the change event
const radioButtons = document.querySelectorAll('input[type="radio"]');
for(const radioButton of radioButtons){
    radioButton.addEventListener('change', sendAjaxRequest);
}        

function sendAjaxRequest(e) {
    var postID = this.name.split('|||')[1];
    var rating = this.value;
    console.log(postID);
    if (this.checked) {
        document.querySelector('#output').innerText = `You selected ${this.value}`;
    }
    function makeRequest(url, data) {
        httpRequest = new XMLHttpRequest();
  
        if (!httpRequest) {
          alert("Giving up :( Cannot create an XMLHTTP instance");
          return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open("GET", url);
        httpRequest.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded",
        );
        httpRequest.send({post: postID, rate: rating});
      }
  
      function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
          } else {
            console.log("There was a problem with the request.");
          }
        }
      }
}