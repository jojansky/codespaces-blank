import { initializeController } from './controller.js';

document.addEventListener("DOMContentLoaded", async function () {
    try {
        await initializeController();
        console.log("initialized");
    } catch (error) {
        // Handle errors
    }
});
