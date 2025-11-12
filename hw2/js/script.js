// Homework 2 US Geography Quiz JavaScript File (Brandon Evans)

// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz); // runs upon clicking "submit quiz"

// Global variables
let score;
let attempts = localStorage.getItem("total_attempts"); // Use local storage to store number of attempts

// Shuffle multiple choice answers (Q4/Q5)
shuffleAnswers();

// Functions
function shuffleAnswers() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }

    let q5ChoicesArray = ["Texas", "Alaska", "California", "Montana"];
    q5ChoicesArray = _.shuffle(q5ChoicesArray);
    for (let i = 0; i < q5ChoicesArray.length; i++) {
        document.querySelector("#q5Choices").innerHTML += ` <input type="radio" name="q5" id= "${q5ChoicesArray[i]}" value="${q5ChoicesArray[i]}"> <label for="${q5ChoicesArray[i]}"> ${q5ChoicesArray[i]}</label>`;
    }
}

function isFormValid() {
    let isValid = true;
    if (document.querySelector("#q1").value == "" || document.querySelector("#q2").value == "") { // Ideally we should be validating every form question. Since it was not specified in the rubric, I have just decided to only check for the first two.
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "One or more questions were not answered.<br>Please make sure you are answering every question before submitting.";
    }

    return isValid;
}

function gradeQuiz() {
    // Set score to 0
    score = 0;
    
    console.log("Grading quiz…");
    document.querySelector("#validationFdbk").innerHTML = ""; // Reset validation feedback

    if (!isFormValid()) {
        return;
    } 

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);

    let q2Response = document.querySelector("#q2").value;
    console.log(q2Response);

    let q4Response = document.querySelector("input[name=q4]:checked").value;
    console.log(q4Response);

    let q5Response = document.querySelector("input[name=q5]:checked").value;
    console.log(q5Response);

    let q6Response = document.querySelector("#q6").value;
    console.log(q6Response);

    let q8Response = document.querySelector("#q8").value;
    console.log(q8Response);

    let q9Response = document.querySelector("#q9").value;
    console.log(q5Response);

    let q10Response = document.querySelector("input[name=q10]:checked").value;
    console.log(q10Response);

    // Grading Question 1
    if (q1Response == "sacramento") {
        // Correct
        correct(1, 10);
    } else {
        // Incorrect
        incorrect(1);
    }

    // Grading Question 2
    if (q2Response == "mo") {
        // Correct
        correct(2, 10);
    } else {
        // Incorrect
        incorrect(2);
    }

    // Grading Question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        // Correct
        correct(3, 10);
    } else {
        // Incorrect
        incorrect(3);
    }

    // Grading Question 4
    if (q4Response == "Rhode Island") {
        // Correct
        correct(4, 10);
    } else {
        // Incorrect
        incorrect(4);
    }

    // Grading Question 5
    if (q5Response == "Alaska") {
        // Correct
        correct(5, 10);
    } else {
        // Incorrect
        incorrect(5);
    }

    // Grading Question 6
    if (q6Response == 50) {
        // Correct
        correct(6, 10);
    } else {
        // Incorrect
        incorrect(6);
    }

    // Grading Question 7
    if (document.querySelector("#TX").checked && document.querySelector("#NewMexico").checked && document.querySelector("#Arizona").checked && document.querySelector("#CA").checked && !document.querySelector("#Louisiana").checked) {
        // Correct
        correct(7, 10);
    } else {
        // Incorrect
        incorrect(7);
    }

    // Grading Question 8
    if (q8Response == 13) {
        // Correct
        correct(8, 10);
    } else {
        // Incorrect
        incorrect(8);
    }

    // Grading Question 9
    if (q9Response == "9ca") {
        // Correct
        correct(9, 10);
    } else {
        // Incorrect
        incorrect(9);
    }

    // Grading Question 10
    if (q10Response == "False") {
        // Correct
        correct(10, 10);
    } else {
        // Incorrect
        incorrect(10);
    }

    // Color code the total score messages and add congratulatory message if score > 80
    if (score > 80) {
        document.querySelector("#totalScore").innerHTML = `Total score: ${score}/100<br>Wow, you really know your stuff!`;
        document.querySelector("#totalScore").className = "text-success";
    } else {
        document.querySelector("#totalScore").innerHTML = `Total score: ${score}/100`;
        document.querySelector("#totalScore").className = "text-danger";
    }

    document.querySelector("#totalAttempts").innerHTML = `Total attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}

function correct(index, points) { // I added a points parameter in case we ever want to make certain questions worth more or less points
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark (Correct Answer)'>";
    score += points;
}

function incorrect(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='x mark (Incorrect Answer)'>";
}



