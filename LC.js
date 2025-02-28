document.addEventListener("DOMContentLoaded", () => {
    loadProblems();
});

let problems = [];

function addProblem() {
    const title = document.getElementById("problemTitle").value.trim();
    const difficulty = document.getElementById("problemDifficulty").value;

    if (title === "") {
        alert("Please enter a problem title.");
        return;
    }

    const problem = { title, difficulty, solved: false };
    problems.push(problem);
    saveProblems();
    displayProblems();

    document.getElementById("problemTitle").value = "";
}

function markSolved(index) {
    problems[index].solved = true;
    saveProblems();
    displayProblems();
}

function displayProblems() {
    const problemList = document.getElementById("problemList");
    problemList.innerHTML = "";

    problems.forEach((problem, index) => {
        const li = document.createElement("li");
        li.classList.toggle("solved", problem.solved);
        li.innerHTML = `
            <span>${problem.title} - <strong>${problem.difficulty}</strong></span>
            ${!problem.solved ? `<button class="mark-solved" onclick="markSolved(${index})">Mark Solved</button>` : ""}
        `;
        problemList.appendChild(li);
    });
}

function saveProblems() {
    localStorage.setItem("problems", JSON.stringify(problems));
}

function loadProblems() {
    const storedProblems = localStorage.getItem("problems");
    if (storedProblems) {
        problems = JSON.parse(storedProblems);
        displayProblems();
    }
}
