let balance = 0.0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.join-button').forEach(button => {
        button.addEventListener('click', handleJoin);
    });
});

function handleJoin(event) {
    const button = event.target;
    const taskElement = button.parentElement;
    const url = button.dataset.url;
    const statusElement = taskElement.querySelector('.status');

    // Open the Telegram URL in a new tab
    window.open(url, '_blank');

    // Check membership status
    setTimeout(() => {
        const userJoined = confirm('Did you join the channel?'); // This is a placeholder for actual Telegram API check

        if (userJoined) {
            statusElement.textContent = 'completed ✔️';
            taskElement.classList.add('completed');
            showPopup('Great! You got 5 ETB');
            balance += 5;
            updateBalance();
        } else {
            showPopup("Hmm, you aren't joined");
        }
    }, 5000); // Wait 5 seconds to simulate user joining the channel
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.remove('hidden');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000); // Hide popup after 3 seconds
}

function updateBalance() {
    console.log(`New balance: ${balance} ETB`);
    // Update balance display if needed
}