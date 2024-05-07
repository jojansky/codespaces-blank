document.addEventListener("DOMContentLoaded", function () {
    // Load schedule data from JSON file
    fetch("data.json")
        .then(response => response.json())
        .then(data => renderSchedule(data))
        .catch(error => console.error("Error fetching data:", error));
});

function renderSchedule(scheduleData) {
    const today = new Date().toISOString().split('T')[0];
    const scheduleContainer = document.getElementById("schedule");

    scheduleData.forEach(day => {
        const dayDate = day.date;
        const isPastDay = dayDate < today;
        const videoEmbedUrl = `https://www.youtube.com/embed/${day.videoId}`;

        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerHTML = `
            <h3>${dayDate}</h3>
            <iframe width="560" height="315" src="${isPastDay ? videoEmbedUrl : ''}" frameborder="0" allowfullscreen></iframe>
            ${isPastDay ? '' : '<p>Video will be available on this date.</p>'}
            <h4>Additional Content:</h4>
            <ul>
                ${day.additionalContent.map(content => `<li><a href="${content.link}" target="_blank">${content.title}</a></li>`).join('')}
            </ul>
        `;
        scheduleContainer.appendChild(dayElement);
    });
}