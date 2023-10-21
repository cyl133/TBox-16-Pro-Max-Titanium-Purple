// Retrieve the scheduled time from local storage (if previously set)
const scheduledTimeInput = document.getElementById('scheduled-time');
const savedScheduledTime = localStorage.getItem('scheduledTime');
if (savedScheduledTime) {
    scheduledTimeInput.value = savedScheduledTime;
}

// Handle the save button click
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
    // Get the user-selected scheduled time
    const newScheduledTime = scheduledTimeInput.value;
    
    // Save the scheduled time to local storage
    localStorage.setItem('scheduledTime', newScheduledTime);
    
    // Display a status message to confirm the save
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = 'Scheduled time saved!';
    setTimeout(() => {
        statusMessage.textContent = '';
    }, 3000); // Clear the status message after 3 seconds
});
