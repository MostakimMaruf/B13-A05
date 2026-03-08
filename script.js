function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
       window.location.href = "main.html";
    } else {
        alert("Invalid username or password.");
    }
}







const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let issues = [];

window.onload = function () {
    loadIssues();
};

async function loadIssues() {

    const res = await fetch(API_URL);
    const result = await res.json();

    issues = result.data;  

    console.log(issues);   

    displayIssues(issues);
}
function displayIssues(data) {
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    data.forEach(issue => {

        // Top border color based on status
        const borderColor = issue.status === "open" 
            ? "border-green-400" 
            : "border-purple-500";

        // Priority badge color
        let priorityColor = "";
        if(issue.priority === "high") priorityColor = "bg-red-100 text-red-500";
        else if(issue.priority === "medium") priorityColor = "bg-yellow-100 text-yellow-600";
        else if(issue.priority === "low") priorityColor = "bg-purple-100 text-purple-500";

        // Status circle (green for open, purple for closed)
        const statusCircle = issue.status === "open"
            ? '<img src="assets/Open-Status.png" alt="Open" class="">'
            : '<img src="assets/Closed.png" alt="Closed" class="">';

        // Card HTML
        const card = `
        <div class="shasow-sm p-2 space-x-1">
        <div class="bg-white rounded-lg shadow-sm p-5 border-t-4 ${borderColor} hover:shadow-md transition">

            <div class="flex justify-between items-center mb-3">
                ${statusCircle}  <!-- Status Circle -->

                <span class="px-3 py-1 text-xs rounded-full ${priorityColor}">
                    ${issue.priority}
                </span>
            </div>

            <h3 class="font-semibold text-lg text-[#1F2937] mb-2">
                ${issue.title}
            </h3>

            <p class="text-sm text-gray-500 mb-4">
                ${issue.description.slice(0,80)}...
            </p>

            <div class="flex gap-2 flex-wrap mb-4">
                <span class="text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded">
                    ${issue.label}
                </span>
            </div>

            <hr class="mb-4 text-[#E5E7EB]">

            <div class="flex flex-col justify-between text-sm text-gray-500">
                <span>${issue.author}</span>
                <span>${issue.createdAt}</span>
            </div>

        </div>
        
        
        </div>
        `;

        

        container.innerHTML += card;
    });
}


function filterIssues(status) {
    let filteredIssues;

    if (status === "all") {
        filteredIssues = issues;
    } else {
        filteredIssues = issues.filter(issue => issue.status === status);
    }

    // Update the count dynamically
    const countElement = document.getElementById("issue-count");
    countElement.textContent = `${filteredIssues.length} Issues`;

    // Display the issues
    displayIssues(filteredIssues);

    // Update active button styles
    document.getElementById("all-filter-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("all-filter-btn").classList.add("bg-gray-100", "text-[#323B49]");

    document.getElementById("open-filter-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("open-filter-btn").classList.add("bg-gray-100", "text-[#323B49]");

    document.getElementById("closed-filter-btn").classList.remove("bg-[#4A00FF]", "text-white");
    document.getElementById("closed-filter-btn").classList.add("bg-gray-100", "text-[#323B49]");

    const activeBtn = document.getElementById(status + "-filter-btn");
    if(activeBtn) {
        activeBtn.classList.add("bg-[#4A00FF]", "text-white");
        activeBtn.classList.remove("bg-gray-100", "text-[#323B49]");
    }
}