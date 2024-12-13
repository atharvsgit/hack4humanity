function adjustFontSize(action) {
    const body = document.body;
    let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (action === 'increase') {
        body.style.fontSize = (currentSize + 1) + 'px';
    } else if (action === 'decrease') {
        body.style.fontSize = (currentSize - 1) + 'px';
    }
}

function setLightMode() {
    document.body.className = 'light-mode';
}

function setDarkMode() {
    document.body.className = 'dark-mode';
}

function autoScrollContent() {
    const content = document.querySelector('.content');
    const scrollAmount = content.offsetWidth / 3; 
    let scrollLeft = 0;

    setInterval(() => {
        scrollLeft += scrollAmount;
        if (scrollLeft >= content.scrollWidth - content.offsetWidth) {
            scrollLeft = 0; 
        }
        content.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
    }, 4000); 
}

let previousScrollPosition = window.pageYOffset;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > previousScrollPosition) {
        header.style.transform = 'translateY(-100%)'; // Hide header
    } else {
        header.style.transform = 'translateY(0)'; // Show header
    }
    previousScrollPosition = currentScrollPosition;
});

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    chatbot.style.display = 'flex';
    chatbotToggle.style.display = 'none';
}

function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    chatbot.style.display = 'none';
    chatbotToggle.style.display = 'block';
}

function sendMessage() {
    const messages = document.getElementById('chatbot-messages');
    const textInput = document.getElementById('chatbot-text');
    const userMessage = textInput.value.trim();

    if (userMessage) {
        const userBubble = document.createElement('div');
        userBubble.textContent = userMessage;
        userBubble.style.background = '#007bff';
        userBubble.style.color = '#fff';
        userBubble.style.padding = '10px';
        userBubble.style.margin = '5px 0';
        userBubble.style.borderRadius = '10px';
        userBubble.style.alignSelf = 'flex-end';
        messages.appendChild(userBubble);
        messages.scrollTop = messages.scrollHeight;

        textInput.value = '';
        setTimeout(() => {
            const botBubble = document.createElement('div');
            botBubble.textContent = "I'm here to assist you!";
            botBubble.style.background = '#e9ecef';
            botBubble.style.padding = '10px';
            botBubble.style.margin = '5px 0';
            botBubble.style.borderRadius = '10px';
            botBubble.style.alignSelf = 'flex-start';
            messages.appendChild(botBubble);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }
}

function startVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chatbot-text').value = transcript;
        sendMessage();
    };

    recognition.onerror = function(event) {
        const errorMessage = event.error === 'no-speech' 
            ? 'No speech detected. Please try again.' 
            : 'Speech recognition failed. Error: ' + event.error;
        alert(errorMessage);
    };
}

function speakText(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', autoScrollContent);
