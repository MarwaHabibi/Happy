const messages = [
  "🎀💐Though the world has placed distance between us, you are far more than just a friend—you are the sister my heart has chosen. I will love you—always.❤️🌟",
  "🎈🎈🎈Happy birthday to someone who lives in my heart always; even if you had never entered my life, I would have felt the emptiness you were meant to fill.🎊🎉",
];

const images = [
  "happy1.png",
];

let step = 0;
const typingText = document.getElementById("typing-text");
const messageBox = document.getElementById("message-box");
const voicePage = document.getElementById("voice-page");
const gallerySection = document.getElementById("gallery-section");
const voiceAudio = document.getElementById("voice-audio");
const imageGrid = document.getElementById("image-grid");

function typeMessage(message, callback) {
  let i = 0;
  typingText.textContent = "";
  const interval = setInterval(() => {
    typingText.textContent = message.slice(0, i + 1);
    i++;
    if (i >= message.length) {
      clearInterval(interval);
      setTimeout(callback, 2000);
    }
  }, 50);
}

function showGallery() {
  // پنهان کردن بخش‌های قبلی
  messageBox.style.display = "none";
  voicePage.style.display = "none";
  gallerySection.style.display = "block";

  // اضافه کردن تصاویر به گالری
  images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Memory ${idx + 1}`;
    img.className = "memory-photo";
    img.style.animationDelay = `${idx * 0.5}s`;
    imageGrid.appendChild(img);
  });
}

function playVoiceMessage() {
  messageBox.style.display = "none";
  voicePage.style.display = "block";

  voiceAudio.play().catch(() => {
    // اگر نتوانست پخش کند بعد 12 ثانیه گالری را نشان بده
    setTimeout(() => {
      voicePage.style.display = "none";
      showGallery();
    }, 12000);
  });

  voiceAudio.onended = () => {
    voicePage.style.display = "none";
    showGallery();
  };
}

function nextStep() {
  if (step < messages.length) {
    typeMessage(messages[step], () => {
      step++;
      nextStep();
    });
  } else {
    playVoiceMessage();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nextStep();
});
