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
    const videoUrl = currentDay.videoUrl;

    // Extract the YouTube video ID and time signature from the URL
    const { videoId, timeSignature } = extractVideoInfo(videoUrl);
    const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${timeSignature}`;

    const title = currentDay.title;
    const additionalNotes = currentDay.additionalNotes || "";

    scheduleContainer.innerHTML = `
        <h3>${formattedDate}</h3>
        <h2>${title}</h2>
        <div class="video-container">
            <iframe width="560" height="315" src="${videoEmbedUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="additional-notes">
            <h4>Additional Notes:</h4>
            ${additionalNotes}
        </div>
    `;

    updateNavigationButtons(scheduleData);
}

function extractVideoInfo(videoUrl) {
    // Extract the YouTube video ID and time signature from the URL
    const regex = /[?&]v=([^&#]+).*[?&]t=([^&#]+)/;
    const match = videoUrl.match(regex);
    const videoId = match && match[1] ? match[1] : "";
    const timeSignature = match && match[2] ? match[2] : "0"; // Default to 0 if no time signature found
    return { videoId, timeSignature };
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
