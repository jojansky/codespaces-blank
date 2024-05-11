import { formatDate, extractVideoInfo } from './utils.js';
import { getCurrentDayIndex,setCurrentDayIndex } from './scheduleState.js';
import { render } from './controller.js';

export function renderSchedule(currentDay) {
    const scheduleContainer = document.getElementById("schedule");
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

}
