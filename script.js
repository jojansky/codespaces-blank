let currentDayIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Load schedule data from JSON file
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Find the index of the latest day with content
            const today = new Date().toISOString().split('T')[0];
            const latestDayIndex = findLatestDayIndex(data, today);
            currentDayIndex = latestDayIndex !== -1 ? latestDayIndex : 0;
            renderSchedule(data);
            setupNavigation(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});

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
    const videoEmbedUrl = `https://www.youtube.com/embed/${currentDay.videoId}`;

    scheduleContainer.innerHTML = `
        <h3>${currentDay.date}</h3>
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
