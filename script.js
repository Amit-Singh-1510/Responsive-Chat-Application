document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const leftSidebar = document.querySelector('.left-sidebar');
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;
  const userList = document.getElementById('userList');
  const chatTitle = document.getElementById('chatTitle');
  const chatArea = document.getElementById('chatArea');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  // Sidebar toggle for mobile
  sidebarToggle.addEventListener('click', () => {
    leftSidebar.classList.toggle('collapsed');
  });

  // Dark mode toggle
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    darkToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Populate user list (including Bot)
  const users = ['Bot', 'Alice', 'Bob'];
  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.dataset.name = user;
    userDiv.textContent = user;
    userList.appendChild(userDiv);
  });

  // Enable send button only if input not empty
  chatInput.addEventListener('input', () => {
    sendBtn.disabled = chatInput.value.trim() === '';
  });

  // Send message on button click or Enter key (Shift+Enter for new line)
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) sendMessage();
    }
  });

  // Add message to chat area
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatArea.appendChild(msgDiv);
  }

  // Add typing indicator
  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot', 'typing');
    typingDiv.textContent = 'Bot is typing...';
    typingDiv.id = 'typingIndicator';
    chatArea.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) typingDiv.remove();
  }

  // Scroll chat area to bottom
  function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Keyword-based bot replies
  const keywordReplies = [
    { keywords: ['hi', 'hello', 'hey'], reply: 'Hello! How can I help you today?' },
    { keywords: ['how are you', 'how do you do'], reply: "I'm just a bot, but I'm doing great! How about you?" },
    { keywords: ['help', 'support'], reply: 'Sure, what do you need help with?' },
    { keywords: ['weather', 'rain', 'sunny', 'cloud'], reply: "Weather is unpredictable, but I hope it's nice where you are!" },
    { keywords: ['bye', 'goodbye', 'see you'], reply: 'Goodbye! Have a nice day!' },
    { keywords: ['thanks', 'thank you', 'thank'], reply: "You're welcome! Happy to help." },
    { keywords: ['name'], reply: "I'm ChatBot 3000, your friendly assistant." },
    { keywords: ['time', 'date'], reply: `Current date and time is: ${new Date().toLocaleString()}` },
    { keywords: ['joke', 'funny'], reply: "Why don't scientists trust atoms? Because they make up everything!" },
    { keywords: ['food', 'hungry', 'eat'], reply: "I'm a bot, so I don't eat, but pizza sounds great!" },
    { keywords: ['music', 'song'], reply: "I love all genres of music, but I can't play any yet." },
    { keywords: ['game', 'play'], reply: "I can chat with you, but playing games isn't in my code yet!" },
    { keywords: ['love'], reply: "I'm just code, but I appreciate your kindness!" },
    { keywords: ['help me', 'problem'], reply: "Tell me more about the problem, and I'll do my best to assist." },
    { keywords: ['what can you do', 'features', 'abilities'], reply: "I can answer your questions, tell jokes, provide info, and chat with you!" },
    { keywords: ['real person', 'are you human'], reply: "Nope! Just lines of JavaScript and some logic." },
    { keywords: ['who made you', 'who created you'], reply: "I was made by a developer who loves code and coffee." },
    { keywords: ['can you help me'], reply: "Absolutely! Just type your question." },
    { keywords: ['change your name'], reply: "I'm honored, but my name is hardcoded for now." },
    { keywords: ['emotion', 'feel'], reply: "I simulate emotions, but I don’t really feel them." },
    { keywords: ['translate'], reply: "Translation coming soon! For now, you can use Google Translate." },
    { keywords: ['convert'], reply: "You can ask me things like 'Convert 100 USD to INR' and I’ll try to help." },
    { keywords: ['capital of'], reply: "That’s a geography question — ask away!" },
    { keywords: ['open youtube'], reply: "Sorry, I can't open apps — yet!" },
    { keywords: ['send email'], reply: "That's beyond me for now, but one day maybe!" },
    { keywords: ['what is', 'who is'], reply: "Let me try to answer that!" },
    { keywords: ['reset password', 'forgot password'], reply: "Try checking the login page for a reset option." },
    { keywords: ['delete my account'], reply: "That's a serious step. Make sure you're ready before proceeding." },
  ];

  function getBotReply(message) {
    const msg = message.toLowerCase();
    for (const entry of keywordReplies) {
      for (const kw of entry.keywords) {
        if (msg.includes(kw)) {
          return entry.reply;
        }
      }
    }
    return "Sorry, I didn't quite get that. Can you please rephrase?";
  }

  // Send message logic
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;
    scrollToBottom();

    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botReply = getBotReply(message);
      addMessage(botReply, 'bot');
      scrollToBottom();
    }, 1500);
  }

  // User list click to select chat user
  userList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('user')) return;

    // Remove selected from all users
    document.querySelectorAll('.user-list .user').forEach(u => u.classList.remove('selected'));

    // Add selected to clicked user
    e.target.classList.add('selected');

    // Update chat title and avatar (placeholder avatar)
    const username = e.target.dataset.name;
    chatTitle.textContent = username;
    const avatarUrl = `https://i.pravatar.cc/40?u=${username.toLowerCase()}`;
    document.querySelector('.chat-user-info .avatar').src = avatarUrl;

    // Clear chat area
    chatArea.innerHTML = '';

    // If Bot selected, show welcome message
    if (username === 'Bot' || username === 'Laura Wilson', 'Alice', 'Bob') {
      addMessage("Hello! I'm your friendly bot. Start chatting!", 'bot');
    }
  });

  // Initialize with Bot selected and welcome message
  document.querySelector('.user').classList.add('selected');
  document.querySelector('.user').click();
});
