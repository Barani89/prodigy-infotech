document.addEventListener('DOMContentLoaded', (event) => {
    loadContacts();
});

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let contactsList = document.getElementById('contacts');
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
            <div class="actions">
                <button onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
        contactsList.appendChild(li);
    });
}

function addContact() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    if (name && phone && email) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, phone, email });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } else {
        alert('Please fill all fields.');
    }
}

function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let contact = contacts[index];
    let newName = prompt('Enter new name:', contact.name);
    let newPhone = prompt('Enter new phone number:', contact.phone);
    let newEmail = prompt('Enter new email address:', contact.email);

    if (newName && newPhone && newEmail) {
        contacts[index] = { name: newName, phone: newPhone, email: newEmail };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    } else {
        alert('Please fill all fields.');
    }
}

function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}
