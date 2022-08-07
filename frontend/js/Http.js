export class Crud {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    
    async getAll(url) {
        let xhr = this.getXhr();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
        xhr.onload = function () {
            let people = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == "200") {
                console.table(people);
            } else {
                console.error(people);
            }
        }
        
        xhr.send(null);
    }

    async search(url, text) {
        let xhr = this.getXhr();

        xhr.open("GET", `${url}/search/${text}`, true);
        xhr.onload = function () {
            let people = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == "200") {
                console.table(people);
            } else {
                console.error(people);
            }
        }
        
        xhr.send(null);
    }

    async post(url, body) {
        let data = JSON.stringify(body)
        let xhr = this.getXhr();

        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
        xhr.onload = function() {
            let person = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == "201") {
                console.table(person);
            } else {
                console.error(person);
            }
        }
    
       xhr.send(data)
    }

    async put(url, id, body) {
        let data = JSON.stringify(body);
        let xhr = this.getXhr();

        xhr.open("PUT", `${url}/${id}`, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            let person = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == "200") {
                console.table(person);
            } else {
                console.error(person);
            }
        }

        xhr.send(data);
    }

    async delete(url, id) {
        let xhr = this.getXhr();

        xhr.open("Delete", `${url}/${id}`, true);
        xhr.onload = function () {
            let person = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status == "200") {
                console.table(person);
            } else {
                console.error(person);
            }
        }

        xhr.send(null);
    }

    getXhr() {
        return this.xhr;
    }
}