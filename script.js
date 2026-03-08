// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "main.html";
    } else {
        alert("Invalid username or password.");
    }
}


// api and global variables
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let issues = [];
let activeFilter = "all";

// load issues
window.onload = function () {
    loadIssues();

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = issues
                .filter(issue => issue.title.toLowerCase().includes(term))
                .filter(issue => activeFilter === "all" ? true : issue.status === activeFilter);
            displayIssues(filtered);
            updateCount(filtered.length);
        });
    }
};

// featch
async function loadIssues() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        issues = result.data;
        displayIssues(issues);
        updateCount(issues.length);
    } catch (err) {
        console.error("Error fetching issues:", err);
        document.getElementById("issues-container").innerHTML = "<p class='text-gray-500'>Unable to load issues.</p>";
    }
}

// display issues
function displayIssues(data) {
    const container = document.getElementById("issues-container");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p class='text-gray-500'>No issues found.</p>";
        return;
    }

    data.forEach(issue => {
        const borderColor = issue.status === "open" ? "border-green-400" : "border-purple-500";

        let priorityColor = "";
        if (issue.priority === "high") priorityColor = "bg-red-100 text-red-500";
        else if (issue.priority === "medium") priorityColor = "bg-yellow-100 text-yellow-600";
        else priorityColor = "bg-purple-100 text-purple-500";

        const statusCircle = issue.status === "open"
            ? '<img src="assets/Open-Status.png" alt="Open" class="w-5 h-5">'
            : '<img src="assets/Closed.png" alt="Closed" class="w-5 h-5">';

        const card = document.createElement("div");
        card.className = `bg-white rounded-lg shadow-sm p-5 border-t-4 ${borderColor} hover:shadow-md transition cursor-pointer`;

        card.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                ${statusCircle}
                <span class="px-3 py-1 text-xs rounded-full ${priorityColor}">${issue.priority}</span>
            </div>
            <h3 onclick="getIssue('${issue.id}')"class="font-semibold text-lg cursor-pointer text-blue-600">
            ${issue.title}
            </h3>          
            <p class="text-sm text-gray-500 mb-1">${issue.description.slice(0, 80)}...</p>
            <div class="flex flex-col items-start justify-start gap-1 mt-2 mb-2">
  ${
    issue.labels
      .map(label => {
        // Label er color ebong icon mapping
        const labelMap = {
          "bug": { color: "bg-red-100 text-red-600", icon: "🐞" },
          "enhancement": { color: "bg-green-100 text-green-600", icon: "✨" },
          "help wanted": { color: "bg-blue-100 text-blue-600", icon: "❓" },
          "question": { color: "bg-purple-100 text-purple-600", icon: "❔" }
        };

        const { color, icon } = labelMap[label.trim()] || { color: "bg-gray-100 text-gray-600", icon: "🔖" };

        return `<span class="px-2 py-1 rounded text-xs ${color}">${icon} ${label}</span>`;
      })
      .join('')
  }
</div>
            <hr class="mb-4 text-[#E5E7EB]">
            <div class="flex flex-col justify-between text-sm text-gray-500">
                <span>${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;

        card.onclick = () => openModal(issue);
        container.appendChild(card);
    });
}


async function getIssue(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

const result = await res.json();

const issue = result.data;


// text data

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDescription").innerText = issue.description;

document.getElementById("modalStatus").innerText = issue.status;

document.getElementById("modalPriority").innerText = issue.priority;

document.getElementById("modalAuthor").innerText = issue.author;

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString();


// labels show

const labelsContainer = document.getElementById("modalLabels");

labelsContainer.innerHTML = "";

issue.labels.forEach(label => {

labelsContainer.innerHTML +=
`<span class="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">${label}</span>`;

});


// modal open

document.getElementById("issueModal").showModal();

}
// filter issues
function filterIssues(status) {
    activeFilter = status;

    let filteredIssues = status === "all"
        ? issues
        : issues.filter(issue => issue.status === status);

    displayIssues(filteredIssues);
    updateCount(filteredIssues.length);

    const buttons = ["all", "open", "closed"];
    buttons.forEach(btn => {
        const el = document.getElementById(`${btn}-filter-btn`);
        if (el) {
            if (btn === status) {
                el.classList.add("bg-[#4A00FF]", "text-white");
                el.classList.remove("bg-gray-100", "text-[#323B49]");
            } else {
                el.classList.remove("bg-[#4A00FF]", "text-white");
                el.classList.add("bg-gray-100", "text-[#323B49]");
            }
        }
    });
}

// update count
function updateCount(count) {
    const countEl = document.getElementById("issue-count");
    if (countEl) countEl.textContent = `${count} Issues`;
}


// open modal

