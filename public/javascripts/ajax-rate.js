
// add an event listener for the change event
const radioButtons = document.querySelectorAll('input[type="radio"]');
for(const radioButton of radioButtons){
    radioButton.addEventListener('change', sendAjaxRequest);
}        

function sendAjaxRequest(e) {
    var postID = this.name.split('|||')[1]
    console.log(postID);
    if (this.checked) {
        document.querySelector('#output').innerText = `You selected ${this.value}`;
    }
}