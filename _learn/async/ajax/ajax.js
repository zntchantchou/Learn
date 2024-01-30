// browser needed for access to XMLHttpRequest object
xhr = new XMLHttpRequest();
let url = "https://api.chucknorris.io/jokes/random";

xhr.open('GET', url, true)
xhr.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		console.log('response', this.responseText);
	}
}
xhr.send();
console.log('request send')
