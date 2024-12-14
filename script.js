

function setLightMode() {
    document.body.className = 'light-mode';
}

function setDarkMode() {
    document.body.className = 'dark-mode';
}

  const scrollContainer = document.querySelector('.content');
  let scrollAmount = 0;
  const scrollStep = 220;
  const intervalTime = 4000;

  function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
      scrollAmount = 0; 
    }
    scrollContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  setInterval(autoScroll, intervalTime);



function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const messages = document.getElementById('chatbot-messages');

    chatbot.style.display = 'flex';
    chatbotToggle.style.display = 'none';

    messages.innerHTML = '';
    const prompts = ['Find a job', 'Post a job', 'Donate', 'Change theme'];
    prompts.forEach((prompt) => {
        const promptBubble = document.createElement('div');
        promptBubble.textContent = prompt;
        promptBubble.style.background = '#f1f1f1';
        promptBubble.style.padding = '10px';
        promptBubble.style.margin = '5px 0';
        promptBubble.style.borderRadius = '10px';
        promptBubble.style.cursor = 'pointer';
        promptBubble.style.alignSelf = 'flex-start';
        promptBubble.addEventListener('click', () => handlePrompt(prompt));
        messages.appendChild(promptBubble);
    });
}

function handlePrompt(prompt) {
    const pages = {
        'Find a job': 'job-opportunities.html',
        'Post a job': 'services.html',
        'Donate': 'donate.html',
    };

    if (pages[prompt]) {
        window.location.href = pages[prompt]; 
    } else if (prompt === 'Change theme') {
        setDarkMode(); 
    }
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

        setTimeout(() => handlePrompt(userMessage), 500);
    }
}


function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    chatbot.style.display = 'none';
    chatbotToggle.style.display = 'block';
}


function startVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        document.getElementById('chatbot-text').value = transcript;

        sendMessage();

        handleSpokenPrompt(transcript);
    };

    recognition.onerror = function (event) {
        const errorMessage = event.error === 'no-speech'
            ? 'No speech detected. Please try again.'
            : 'Speech recognition failed. Error: ' + event.error;
        alert(errorMessage);
    };
}

function handleSpokenPrompt(transcript) {
    const prompts = {
        'find a job': 'job-opportunities.html',
        'post a job': 'services.html',
        'donate': 'donate.html',
    };

    if (prompts[transcript]) {
        window.location.href = prompts[transcript];
    } else if (transcript === 'change theme') {
        setDarkMode(); 
    } else {
        alert("Sorry, I didn't understand that. Please try again.");
    }
}


function speakText(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', autoScrollContent);
