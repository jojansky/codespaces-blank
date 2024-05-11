import { renderSchedule } from "./renderer.js";
import { getCurrentDayIndex,setCurrentDayIndex } from "./scheduleState.js";

export function setupNavigation(scheduleData) {
    const prevDayBtn = document.getElementById("prevDayBtn");
    prevDayBtn.addEventListener("click", () => {
        const currentDayIndex = getCurrentDayIndex();
        if (currentDayIndex > 0) {
            setCurrentDayIndex(currentDayIndex-1);
            renderSchedule(scheduleData);
        }
    });

    const nextDayBtn = document.getElementById("nextDayBtn");
    nextDayBtn.addEventListener("click", () => {
        const currentDayIndex = getCurrentDayIndex();
        if (currentDayIndex < scheduleData.length - 1) {
            setCurrentDayIndex(currentDayIndex+1)
            renderSchedule(scheduleData);
        }
    });
}

export function updateNavigationButtons(scheduleData) {
    const prevDayBtn = document.getElementById("prevDayBtn");
    const nextDayBtn = document.getElementById("nextDayBtn");

    const currentDayIndex = getCurrentDayIndex();
    prevDayBtn.disabled = currentDayIndex === 0;
    nextDayBtn.disabled = currentDayIndex === scheduleData.length - 1;
}