const elementPeopleTable = document.querySelector('#people-table');

async function getAllPeople (url) {
    const result = await fetch(url);
    const people = await result.json();

    writeTable(people);
}

function writeTable (people) {
    people.forEach(person => {
        const personHTML = `
            <tr class="table-body-row">
                <td class="table-tbody-row-data">${person.fullname}</td>
                <td class="table-tbody-row-data">${person.cpf}</td>
                <td class="table-tbody-row-data">${person.nickname}</td>
                <td class="table-tbody-row-data">${person.gender}</td>
                <td class="table-tbody-row-data">${person.phone}</td>
                <td class="table-tbody-row-data">${person.address}</td>
                <td class="table-tbody-row-data">${person.note}</td>
                <td class="table-tbody-row-data">
                    <a href="./create_person.html?id=${person.id}"><img class="btn-action" src="./img/edit.svg"></a>
                </td>
            </tr>
        `;

        elementPeopleTable.innerHTML = elementPeopleTable.innerHTML + personHTML;
    })
}

getAllPeople("http://127.0.0.1:8000/api/pessoas");


const btnDeletePerson = document.querySelector('#deletePerson');

console.log(btnDeletePerson)


