import { fetchData } from './dataService.js';
import { populateSidebar, renderSchedule, toggleMenu } from './renderer.js';
import { setupNavigation } from './navigation.js';
import { setCurrentDayIndex } from './scheduleState.js';

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const data = await fetchData("data.json");
        const today = new Date().toISOString().split('T')[0];
        const latestDayIndex = findLatestDayIndex(data, today);
        setCurrentDayIndex(latestDayIndex !== -1 ? latestDayIndex : 0);
        renderSchedule(data);
        setupNavigation(data);
        populateSidebar(data);
    } catch (error) {
        // Handle errors
    }
});

document.addEventListener("DOMContentLoaded",() =>{
    const menuIcon = document.querySelector(".menu-icon");
    menuIcon.addEventListener('click',()=>{
        toggleMenu()
    })
})

function findLatestDayIndex(scheduleData, currentDate) {
    // Find the latest day with content
    for (let i = scheduleData.length - 1; i >= 0; i--) {
        if (scheduleData[i].date <= currentDate) {
            return i;
        }
    }
    return -1; // No content found
}
