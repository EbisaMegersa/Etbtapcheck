let balance = 0.0;
const incrementValue = 0.003;

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let username = user.username || user.first_name || 'Unknown';
        if (username.length > 10) {
            username = username.substring(0, 10) + '...';
        }
        document.getElementById('username-value').innerText = username;

        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }
        updateDisplay();
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('main-img').addEventListener('click', (event) => {
    const mainImg = document.getElementById('main-img');
    
    // Add the tapped effect
    mainImg.classList.add('tapped');
    
    setTimeout(() => {
        mainImg.classList.remove('tapped');
    }, 300); // Match this duration with the CSS transition time

    createFloatingText(event.clientX, event.clientY, '+0.003 ETB');

    balance += incrementValue;
    updateDisplay();

    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
    }
});

document.getElementById('tap').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('boost').addEventListener('click', () => {
    showPopup("በቅርብ ቀን!\nComing Soon!");
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup("Referall link ለማግኘት ይሄንን step ይከታተሉ!\n1 ቦቱን /start ይበሉት\n2 ቻናላችንን ይቀላቀሉ \n3 የሚመጣዉን ጥያቄ በመመለስ ወደ ቦቱ ዉስጥ ይግቡ\n4 ከዛ ጓደኞችዎን ይጋብዙ ሚለውን Button በመጫን የርሶን መጋበዣ link ማግኘት ትችላላችሁ!");
});

function createFloatingText(x, y, text) {
    const floatingText = document.createElement('div');
    floatingText.innerText = text;
    floatingText.style.position = 'absolute';
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.color = '#ffffff';
    floatingText.style.fontSize = '24px';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.zIndex = '1000';
    floatingText.style.transition = 'all 1s ease-out';
    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.style.transform = 'translateY(-50px)';
        floatingText.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        floatingText.remove();
    }, 1050);
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message;
    popup.classList.remove('hidden');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}

function updateDisplay() {
    document.getElementById('balance-value').innerText = balance.toFixed(4);
}