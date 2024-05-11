import { render } from "./controller.js";
import { setCurrentDayIndex } from "./scheduleState.js";
import { formatDate } from "./utils.js";

export function populateSidebar(scheduleData) {
    const dateList = document.getElementById("dateList");
    scheduleData.forEach((day, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = formatDate(new Date(day.date));
        listItem.addEventListener('click', () => {
            setCurrentDayIndex(index);
            toggleMenu(); // Close the menu on mobile
            render(day.date);
        });
        dateList.appendChild(listItem);
    });
    setupMenuItem();
}

export function updateURL(date) {
    const newUrl = window.location.href.split('?')[0] + `?date=${date}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

export function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

function setupMenuItem() {
    const menuItem = document.querySelector('.menu-icon');
    menuItem.addEventListener('click',() => toggleMenu());
}