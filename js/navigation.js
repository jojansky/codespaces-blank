import { getCurrentDayIndex,setCurrentDayIndex } from "./scheduleState.js";
import { render } from './controller.js'

export function setupNavigation(datalength) {
    const prevDayBtn = document.getElementById("prevDayBtn");
    prevDayBtn.addEventListener("click", () => {
        const currentDayIndex = getCurrentDayIndex();
        if (currentDayIndex > 0) {
            setCurrentDayIndex(currentDayIndex-1);
            render();
        }
    });

    const nextDayBtn = document.getElementById("nextDayBtn");
    nextDayBtn.addEventListener("click", () => {
        const currentDayIndex = getCurrentDayIndex();
        if (currentDayIndex < datalength - 1) {
            setCurrentDayIndex(currentDayIndex+1)
            render();
        }
    });
}

export function updateNavigationButtons(datalength) {
    const prevDayBtn = document.getElementById("prevDayBtn");
    const nextDayBtn = document.getElementById("nextDayBtn");

    const currentDayIndex = getCurrentDayIndex();
    prevDayBtn.disabled = currentDayIndex === 0;
    nextDayBtn.disabled = currentDayIndex === datalength - 1;
}