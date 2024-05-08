// Function to toggle the flyout menu
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    // Load schedule data from JSON file
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Populate the sidebar with dates
            populateSidebar(data);
            // Find the index of the latest day with content
            const today = new Date().toISOString().split('T')[0];
            const latestDayIndex = findLatestDayIndex(data, today);
            currentDayIndex = latestDayIndex !== -1 ? latestDayIndex : 0;
            renderSchedule(data);
            setupNavigation(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function populateSidebar(scheduleData) {
    const dateList = document.getElementById("dateList");
    scheduleData.forEach((day, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = formatDate(new Date(day.date));
        listItem.addEventListener('click', () => {
            currentDayIndex = index;
            renderSchedule(scheduleData);
            toggleMenu(); // Close the menu on mobile
            updateURL(day.date); // Update URL
        });
        dateList.appendChild(listItem);
    });
}

function updateURL(date) {
    const newUrl = window.location.href.split('?')[0] + `?date=${date}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}


let currentDayIndex = 0;

// document.addEventListener("DOMContentLoaded", function () {
//     // Load schedule data from JSON file
//     fetch("data.json")
//         .then(response => response.json())
//         .then(data => {
//             // Find the index of the latest day with content
//             const today = new Date().toISOString().split('T')[0];
//             const latestDayIndex = findLatestDayIndex(data, today);
//             currentDayIndex = latestDayIndex !== -1 ? latestDayIndex : 0;
//             renderSchedule(data);
//             setupNavigation(data);
//         })
//         .catch(error => console.error("Error fetching data:", error));
// });

function findLatestDayIndex(scheduleData, currentDate) {
    // Find the latest day with content
    for (let i = scheduleData.length - 1; i >= 0; i--) {
        if (scheduleData[i].date <= currentDate) {
            return i;
        }
    }
    return -1; // No content found
}

function renderSchedule(scheduleData) {
    const scheduleContainer = document.getElementById("schedule");
    const currentDay = scheduleData[currentDayIndex];
    if (!currentDay) {
        scheduleContainer.innerHTML = "<p>No content available.</p>";
        return;
    }
    const date = new Date(currentDay.date);
    const formattedDate = formatDate(date);
    const videoEmbedUrl = `https://www.youtube.com/embed/${currentDay.videoId}`;

    scheduleContainer.innerHTML = `
        <h3>${formattedDate}</h3>
        <div class="video-container">
            <iframe width="560" height="315" src="${videoEmbedUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h4>Additional Content:</h4>
        <ul>
            ${currentDay.additionalContent.map(content => `<li><a href="${content.link}" target="_blank">${content.title}</a></li>`).join('')}
        </ul>
    `;

    updateNavigationButtons(scheduleData);
}

function formatDate(date) {
    // Format date as "Month Day, Year"
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function updateNavigationButtons(scheduleData) {
    const prevDayBtn = document.getElementById("prevDayBtn");
    const nextDayBtn = document.getElementById("nextDayBtn");

    prevDayBtn.disabled = currentDayIndex === 0;
    nextDayBtn.disabled = currentDayIndex === scheduleData.length - 1;
}

function setupNavigation(scheduleData) {
    const prevDayBtn = document.getElementById("prevDayBtn");

    prevDayBtn.addEventListener("click", () => {
        if (currentDayIndex > 0) {
            currentDayIndex--;
            renderSchedule(scheduleData);
        }
    });

    const nextDayBtn = document.getElementById("nextDayBtn");
    nextDayBtn.addEventListener("click", () => {
        if (currentDayIndex < scheduleData.length - 1) {
            currentDayIndex++;
            renderSchedule(scheduleData);
        }
    });
}
