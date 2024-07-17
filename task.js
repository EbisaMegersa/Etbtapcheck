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

    // Wait for a moment to allow the user to join the channel
    setTimeout(() => {
        const user = window.Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            checkMembership(user.id)
                .then(isMember => {
                    if (isMember) {
                        statusElement.textContent = 'completed ✔️';
                        taskElement.classList.add('completed');
                        showPopup('Great! You got 5 ETB');
                        balance += 5;
                        updateBalance();
                    } else {
                        showPopup("Hmm, you aren't joined");
                    }
                })
                .catch(error => {
                    console.error('Error checking membership:', error);
                    showPopup('Failed to check membership');
                });
        } else {
            showPopup('Unable to get Telegram user info.');
        }
    }, 5000); // Wait 5 seconds to simulate user joining the channel
}

function checkMembership(userId) {
    return fetch('/check-membership', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
        .then(response => response.json())
        .then(data => data.isMember);
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