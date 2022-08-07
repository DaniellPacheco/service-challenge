const url = 'http://127.0.0.1:8000/api/pessoas';

const elementPeopleTable = document.querySelector('#people-table');
const personPage = document.querySelector('#person');
const personContainer = document.querySelector('#personContainer');

// Create Person
const submitCreatePerson = document.querySelector('#submitPerson');
console.log(submitCreatePerson);

// Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search);
const personId = urlSearchParams.get("id");

async function getAllPeople () {
    const result = await fetch(url);
    const people = await result.json();

    writeTable(people);
}

function writeTable (people) {
    people.forEach(person => {
        const personHTML = `
            <tr>
                <td>${person.fullname}</td>
                <td>${person.cpf}</td>
                <td>${person.nickname}</td>
                <td>${person.gender}</td>
                <td>${person.phone}</td>
                <td>${person.address}</td>
                <td>${person.note}</td>
                <td>${person.image}</td>
                <td>
                    <a href="./pessoa.html?id=${person.id}">Editar</a>
                    <a id="deletePerson" href="/${person.id}">Deletar</a>
                    
                </td>
            </tr>
        `;

        elementPeopleTable.innerHTML = elementPeopleTable.innerHTML + personHTML;
    })
}

async function postPerson(person) {
    const response = await fetch(url, {
        method: "POST",
        body: person,
        header: {
            "Content-type": "application/json"
        },
    });
}

async function getPerson(id) {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    const inputFullname = document.createElement("input");
    inputFullname.setAttribute('class', 'inputField');
    const inputCPF = document.createElement("input");
    inputCPF.setAttribute('class', 'inputField');
    const inputNickname = document.createElement("input");
    inputNickname.setAttribute('class', 'inputField');
    const inputGender = document.createElement("input");
    inputGender.setAttribute('class', 'inputField');
    const inputPhone = document.createElement("input");
    inputPhone.setAttribute('class', 'inputField');
    const inputAddress = document.createElement("input");
    inputAddress.setAttribute('class', 'inputField');
    const inputNote = document.createElement("input");
    inputNote.setAttribute('class', 'inputField');
    const inputImage = document.createElement("input");
    inputImage.setAttribute('class', 'inputField');

    inputFullname.value = data.fullname;
    inputCPF.value = data.cpf;
    inputNickname.value = data.nickname;
    inputGender.value = data.gender;
    inputPhone.value = data.phone;
    inputAddress.value = data.address;
    inputNote.value = data.note;
    inputImage.value = data.image;

    personContainer.appendChild(inputFullname);
    personContainer.appendChild(inputCPF);
    personContainer.appendChild(inputNickname);
    personContainer.appendChild(inputGender);
    personContainer.appendChild(inputPhone);
    personContainer.appendChild(inputAddress);
    personContainer.appendChild(inputNote);
    personContainer.appendChild(inputImage);
}

if(!personId) {
    getAllPeople();
} else {
    getPerson(personId);
}

