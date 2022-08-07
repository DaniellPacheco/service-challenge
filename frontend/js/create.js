const url = "http://127.0.0.1:8000/api/pessoas"

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
if(myParam) {
    
    // Remove Form Elements
    const fieldset = document.querySelectorAll(".fieldset")
    fieldset.forEach(fieldset => {
        fieldset.remove();
    })
    
    const buttonField = document.querySelector(".buttonField")
    // buttonField.remove()

    
    const form = document.querySelector("#formField")
    fields = ["fullname", "cpf", "nickname", "gender", "phone", "address", "note", "image"]
    fieldsText = ["Nome Completo", "CPF", "Apelido", "Sexo", "Telefone", "Endereço", "Observação", "Imagem Pessoa"]
    fieldsType = ["text", "text", "text", "text", "text", "text", "text", "file"]

    for(let i = 0; i < fields.length; i++) {
        const fieldsetElement = document.createElement("fieldset")
        fieldsetElement.setAttribute("class", "fieldset")

        const labelElement = document.createElement("label")
        labelElement.innerHTML = fieldsText[i]
        labelElement.setAttribute("for", fields[i])
        labelElement.setAttribute("class", "fieldset-label")

        const inputElement = document.createElement("input")
        inputElement.setAttribute("type", fieldsType[i])
        inputElement.setAttribute("name", fieldsText[i])
        inputElement.setAttribute("id", fields[i])
        inputElement.setAttribute("class", "fieldset-input")
        
        form.appendChild(fieldsetElement)
        fieldsetElement.appendChild(labelElement)
        fieldsetElement.appendChild(inputElement)
    } 
   
    // const btnUpdate = document.createElement("button")
    const btnUpdate = document.createElement("button")
    btnUpdate.setAttribute("id", "btnUpdate")
    btnUpdate.innerHTML = "Atualizar"
    btnUpdate.setAttribute("class", "buttonField")

    const fieldsetElement = document.createElement("fieldset")
    fieldsetElement.setAttribute("class", "fieldset")
    fieldsetElement.appendChild(btnUpdate)

    form.appendChild(fieldsetElement)
     
    // Get Person
    getPerson(myParam)

    // Update Person
    btnUpdate.addEventListener('click', () => {
            
        const inputFullname = document.getElementById('fullname')
        const inputCpf = document.getElementById('cpf')
        const inputNickname = document.getElementById('nickname')
        const inputGender = document.getElementById('gender')
        const inputPhone = document.getElementById('phone')
        const inputAddress = document.getElementById('address')
        const inputNote = document.getElementById('note')
        const inputImage = document.getElementById('image')

        let personCotent = {
            "fullname": inputFullname.value,
            "cpf": inputCpf.value,
            "nickname": inputNickname.value,
            "gender": inputGender.value,
            "phone": inputPhone.value,
            "address": inputAddress.value,
            "note": inputNote.value,
            "image": inputImage.value
        }

        put(personCotent);




    })

    // Delete Person
    const btnDelete = document.getElementById('btnDelete');
    btnDelete.addEventListener('click', () => {
        deletePerson(myParam);
        console.log('pessoa deleta')
    })

} else {

    const btnRegister = document.getElementById('btnRegister');
    
    
    btnRegister.addEventListener('click', () => {
        event.preventDefault()
        console.log('alo')
        const inputFullname = document.getElementById('fullname')
        const inputCpf = document.getElementById('cpf')
        const inputNickname = document.getElementById('nickname')
        const inputGender = document.getElementById('gender')
        const inputPhone = document.getElementById('phone')
        const inputAddress = document.getElementById('address')
        const inputNote = document.getElementById('note')
        const inputImage = document.getElementById('image')

        let personCotent = {
            "fullname": inputFullname.value,
            "cpf": inputCpf,
            "nickname": inputNickname .value,
            "gender": inputGender.value,
            "phone": inputPhone.value,
            "address": inputAddress.value,
            "note": inputNote.value,
            "image": inputImage.value
        }


        post(personCotent)
    })

}



async function getPerson(id) {
    const result = await fetch(`${url}/${myParam}`);
    const person = await result.json();
    console.log(person)

    const inputFullname = document.getElementById('fullname')
    const inputCpf = document.getElementById('cpf')
    const inputNickname = document.getElementById('nickname')
    const inputGender = document.getElementById('gender')
    const inputPhone = document.getElementById('phone')
    const inputAddress = document.getElementById('address')
    const inputNote = document.getElementById('note')

    inputFullname.value = person.fullname;
    inputCpf.value = person.cpf;
    inputNickname.value = person.nickname;
    inputGender.value = person.gender;
    inputPhone.value = person.phone;
    inputAddress.value = person.address;
    inputNote.value = person.note;
}

async function deletePerson(id) {
    let xhr = new XMLHttpRequest();

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


async function put(body) {
    // let data = JSON.stringify(body);
    let data = body;

    let xhr = new XMLHttpRequest();

    xhr.open("PUT", `${url}/${myParam}`, true);
    xhr.setRequestHeader('Content-type', 'multipart/form-data; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
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


async function post(body) {
    let data = JSON.stringify(body)
    let xhr = new XMLHttpRequest();

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

// async function post(person) {
//     const response = await fetch(url, {
//         method: "POST",
//         body: person,
//         header: {
//             "Content-type": "application/json"
//         },
//     });
// }