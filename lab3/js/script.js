// Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#pass").addEventListener("click", suggestPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

// Functions

displayStates(); // Immediately call display states

// Display city name and longitude/latitude from ZIP
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    // Check if the zip code not found message should appear
    if (data.city == null) {
        document.querySelector("#zipError").innerHTML = "Zip code not found!";
        document.querySelector("#zipError").className = "bg-danger text-white";
    } else {
        document.querySelector("#zipError").innerHTML = "";
    }

    // Display the city, latitude, longitude. Will display "undefined" if the zip code is not found
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

// Display list of state codes
async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();

    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option> Select a State... </option>";
    for (let i = 0; i < data.length; i++) {
        stateList.innerHTML += `<option> ${data[i].usps} </option>`;
    }
}

// Display counties from state selection
async function displayCounties() {
    let state = document.querySelector("#state").value;

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select a County... </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// Check username availability
async function checkUsername() {
    let username = document.querySelector("#username").value;

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = "Available!";
        usernameError.className = "bg-success text-white";
    } else {
        usernameError.innerHTML = "Unavailable!";
        usernameError.className = "bg-danger text-white";
    }
}

// Suggest a randomly generated password of length 10
async function suggestPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=10";
    let response = await fetch(url);
    let data = await response.json();

    let pwd = document.querySelector("#suggestedPwd");
    pwd.innerHTML = "Suggested password: " + data.password;
    pwd.className = "bg-info text-white";
}

// Username and password validation
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#pass").value;
    let retypePassword = document.querySelector("#rePass").value;

    let usernameError = document.querySelector("#usernameError");
    let passWordError = document.querySelector("#passwordError");
    if (username.length == 0) {
        usernameError.innerHTML = "Username required!";
        usernameError.className = "bg-danger text-white";
        isValid = false;
    }

    if (password.length < 6) {
        passwordError.innerHTML = "Password must have at least 6 characters!";
        passwordError.className = "bg-danger text-white";
        isValid = false;
    }

    if (password !== retypePassword) {
        passwordError.innerHTML = "The passwords in both boxes must match!";
        passwordError.className = "bg-danger text-white";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}