import { formatDate, extractVideoInfo } from './utils.js';

export function renderSchedule(currentDay) {
    const scheduleContainer = document.getElementById("schedule");
    if (!currentDay) {
        scheduleContainer.innerHTML = "<p>No content available.</p>";
        return;
    }
    const date = new Date(currentDay.date);
    const formattedDate = formatDate(date);
    const videoUrl = currentDay.videoUrl;

    const title = currentDay.title;
    const additionalNotes = currentDay.additionalNotes || "";
    const additionalLinks = getAdditionalLinks(currentDay);

    scheduleContainer.innerHTML = `
        <h3>${formattedDate}</h3>
        <h2>${title}</h2>
        <div class="video-container">
            <iframe width="560" height="315" src="${getYTEmbedURL(videoUrl)}" frameborder="0" allowfullscreen></iframe>
        </div>
        ${(additionalNotes !== "")?`<div class="additional-notes">
            <h4>Additional Notes:</h4>
            ${additionalNotes}
        </div>`:``}
        ${additionalLinks}
    `;
}

function getAdditionalLinks(currentDay){
    let additionalLinks
    if (currentDay && currentDay.additionalLinks && currentDay.additionalLinks.length > 0) {
        additionalLinks =`
        <div class="additional-links">
            <h4>Additional Links:</h4>
            <ul>
                ${currentDay.additionalLinks.map(link => `
                    <li>
                        ${link.type === "youtube" ? `<div class="video-container"><iframe width="560" height="315" src="${getYTEmbedURL(link.url)}" frameborder="0" allowfullscreen></iframe></div>` : `<a href="${link.url}" target="_blank">${link.title}</a>`}
                    </li>
                `).join('')}
            </ul>
        </div>`
    }else {
        additionalLinks = ""
    }

    return additionalLinks

}

function getYTEmbedURL(videoUrl){
        // Extract the YouTube video ID and time signature from the URL
        console.log(videoUrl);
        const { videoId, timeSignature } = extractVideoInfo(videoUrl);
        const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${timeSignature}`;
        console.log(videoEmbedUrl,videoId,timeSignature)
        return videoEmbedUrl
}