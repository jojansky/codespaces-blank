let scheduleData = []; // Initial empty schedule data

export async function initializeScheduleData() {
    // Fetch schedule data from the json file
    try {
        const response = await fetch("data.json");
        scheduleData = await response.json();
    } catch (error) {
        console.error("Error fetching schedule data:", error);
    }
}

export function getScheduleData() {
    return scheduleData;
}

export function findLatestDayIndex(currentDate) {
    for (let i = scheduleData.length - 1; i >= 0; i--) {
        if (scheduleData[i].date <= currentDate) {
            return i;
        }
    }
    return -1; // No content found
}

export function getScheduleLength(){
    return scheduleData.length;
}