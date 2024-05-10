import { updateNavigationButtons } from  './navigation.js';
import { formatDate, extractVideoInfo } from './utils.js';
import { getCurrentDayIndex,setCurrentDayIndex } from './scheduleState.js';

export function renderSchedule(scheduleData) {
    const scheduleContainer = document.getElementById("schedule");
    const currentDayIndex = getCurrentDayIndex();
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

export function populateSidebar(scheduleData) {
    const dateList = document.getElementById("dateList");
    scheduleData.forEach((day, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = formatDate(new Date(day.date));
        listItem.addEventListener('click', () => {
            setCurrentDayIndex(index);
            renderSchedule(scheduleData);
            toggleMenu(); // Close the menu on mobile
            updateURL(day.date); // Update URL
        });
        dateList.appendChild(listItem);
    });
}

export function updateURL(date) {
    const newUrl = window.location.href.split('?')[0] + `?date=${date}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

export function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}