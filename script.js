
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQa0cF83eWEvIo4F5pPiucxOEHPpE3puE",
    authDomain: "foam-data.firebaseapp.com",
    databaseURL: "https://foam-data-default-rtdb.firebaseio.com",
    projectId: "foam-data",
    storageBucket: "foam-data.appspot.com",
    messagingSenderId: "614460737916",
    appId: "1:614460737916:web:db5c015d55c6a37e6a7cf9",
    measurementId: "G-9Y0VJ72MVS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

window.submitData = function() {
    var name = document.getElementById('name').value;
    var fname = document.getElementById('fname').value;
    var email = document.getElementById('email').value;

    if (name && fname && email) {
        const newDataRef = push(ref(db, 'formData'));
        set(newDataRef, {
            name: name,
            fname: fname,
            email: email
        }).then(() => {
            alert("Data successfully sent to Firebase!");
            document.getElementById('name').value = '';
            document.getElementById('fname').value = '';
            document.getElementById('email').value = '';
        }).catch((error) => {
            console.error("Error writing new data to Firebase Database: ", error);
        });
    } else {
        alert("Please fill all fields");
    }
};

function loadData() {
    const dataRef = ref(db, 'formData');
    onValue(dataRef, (snapshot) => {
        const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing table rows

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const newRow = table.insertRow();

            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.textContent = childData.name;
            cell2.textContent = childData.fname;
            cell3.textContent = childData.email;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = function() {
                remove(ref(db, 'formData/' + childSnapshot.key));
            };
            cell4.appendChild(removeButton);
        });
    });
}

// Load data on page load
window.onload = function() {
    loadData();
};