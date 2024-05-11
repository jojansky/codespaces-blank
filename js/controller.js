// controller.js

import { renderSchedule } from './renderer.js';
import { setupNavigation ,updateNavigationButtons} from './navigation.js';
import { getScheduleData, findLatestDayIndex,getScheduleLength } from './scheduleModel.js';
import { getCurrentDayIndex, setCurrentDayIndex } from './scheduleState.js';
import { initializeScheduleData } from './scheduleModel.js';
import { populateSidebar,updateURL } from './sidebar.js';

export async function initializeController() {
    // Fetch schedule data and initialize controller
    try {
        await initializeScheduleData();
        const today = new Date().toISOString().split('T')[0];
        const latestDayIndex = findLatestDayIndex(today);
        const scheudleData = getScheduleData()
        setCurrentDayIndex(latestDayIndex !== -1 ? latestDayIndex : 0);
        render();
        populateSidebar(scheudleData);
        setupNavigation(getScheduleLength());// Initial setup of Navigation
    } catch (error) {
        // Handle errors
    }
}
``
export function render(day) {
    const scheduleData = getScheduleData();
    const currentDayIndex = getCurrentDayIndex();
    const currentDay = scheduleData[currentDayIndex];
    renderSchedule(currentDay);
    updateNavigationButtons(scheduleData.length)
    if (day === undefined) {
        updateURL(currentDay.date)
    }else {
        updateURL(day)
    }
}
