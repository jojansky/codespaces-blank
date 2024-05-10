export function extractVideoInfo(videoUrl) {
    // YouTube URL parsing logic here
    const regex = /[?&]v=([^&#]+).*[?&]t=([^&#]+)/;
    const match = videoUrl.match(regex);
    const videoId = match && match[1] ? match[1] : "";
    const timeSignature = match && match[2] ? match[2] : "0"; // Default to 0 if no time signature found
    return { videoId, timeSignature };
}
export function formatDate(date) {
    // Format date as "Month Day, Year"
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}