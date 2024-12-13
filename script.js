function adjustFontSize(action) {
    const body = document.body;
    let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (action === 'increase') {
        body.style.fontSize = (currentSize + 1) + 'px';
    } else if (action === 'decrease') {
        body.style.fontSize = (currentSize - 1) + 'px';
    }
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

 let chatbotVisible = false;

        // Function to toggle the visibility of the chatbot
        function toggleChatbot() {
            const chatbot = document.getElementById('chatbot');
            const chatbotInput = document.getElementById('chatbot-text');
            chatbotVisible = !chatbotVisible;
            chatbot.style.display = chatbotVisible ? 'flex' : 'none';
            if (chatbotVisible) chatbotInput.focus();
        }
        

        // Function to close the chatbot
        function closeChatbot() {
            const chatbot = document.getElementById('chatbot');
            const chatbotButton = document.getElementById('chatbot-toggle');
            
            chatbot.style.display = 'none';
            chatbotButton.disabled = false;  // Enable the chatbot button again
        }

        // Function to send a message
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

                // Simulate bot response
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

// Start Voice Input
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

// Text-to-Speech (Bot response)
function speakText(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}



// function recommendJob(userSkills, userLocation, disabilityType) {
//     // This is a mock implementation. In practice, integrate with a job database.
//     const jobRecommendations = [
//         { jobTitle: 'Software Developer', location: 'New York', skillsRequired: ['JavaScript', 'React'] },
//         { jobTitle: 'Data Analyst', location: 'San Francisco', skillsRequired: ['SQL', 'Excel'] },
//         { jobTitle: 'Customer Support', location: 'Remote', skillsRequired: ['Communication'] },
//     ];

//     const recommendedJobs = jobRecommendations.filter(job => {
//         return job.skillsRequired.some(skill => userSkills.includes(skill)) && job.location === userLocation;
//     });

//     return recommendedJobs.length ? recommendedJobs : ['No jobs found based on your preferences.'];
// }

// // Example call: recommendJob(['JavaScript', 'React'], 'New York', 'none');

// function processUserMessage(userMessage) {
//     const lowerCaseMessage = userMessage.toLowerCase();

//     if (lowerCaseMessage.includes('job recommendation')) {
//         return recommendJob(['JavaScript', 'React'], 'New York', 'none');
//     } else if (lowerCaseMessage.includes('training')) {
//         return recommendTraining(['JavaScript']);
//     } else if (lowerCaseMessage.includes('interview schedule')) {
//         return scheduleInterview('2024-12-15 10:00');
//     } else if (lowerCaseMessage.includes('mental health')) {
//         return provideMentalHealthSupport();
//     } else if (lowerCaseMessage.includes('legal rights')) {
//         return provideLegalRightsInfo();
//     } else {
//         return "I'm here to assist you with job opportunities, training, mental health support, and more!";
//     }
// }

// function sendMessage() {
//     const messages = document.getElementById('chatbot-messages');
//     const textInput = document.getElementById('chatbot-text');
//     const userMessage = textInput.value.trim();

//     if (userMessage) {
//         const userBubble = document.createElement('div');
//         userBubble.textContent = userMessage;
//         userBubble.style.background = '#007bff';
//         userBubble.style.color = '#fff';
//         userBubble.style.padding = '10px';
//         userBubble.style.margin = '5px 0';
//         userBubble.style.borderRadius = '10px';
//         userBubble.style.alignSelf = 'flex-end';
//         messages.appendChild(userBubble);
//         messages.scrollTop = messages.scrollHeight;

//         textInput.value = '';

//         const botResponse = processUserMessage(userMessage);

//         setTimeout(() => {
//             const botBubble = document.createElement('div');
//             botBubble.textContent = botResponse;
//             botBubble.style.background = '#e9ecef';
//             botBubble.style.padding = '10px';
//             botBubble.style.margin = '5px 0';
//             botBubble.style.borderRadius = '10px';
//             botBubble.style.alignSelf = 'flex-start';
//             messages.appendChild(botBubble);
//             messages.scrollTop = messages.scrollHeight;

//             speakText(botResponse); // Text-to-Speech for bot response
//         }, 1000);
//     }
// }

