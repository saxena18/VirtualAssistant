let btn = document.querySelector("#startBtn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB"; // Hindi language with GB accent
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon");
  } else {
    speak("Good Evening");
  }
}

// Uncomment this if you want to trigger the greeting on page load
// window.addEventListener("load", () => {
//   wishMe();
// });

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase()); // Pass the transcript to the function
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  // Bring back the button after the command is processed
  btn.style.display = "flex";
  voice.style.display = "none";

  if (
    message.includes("hello") ||
    message.includes("hello vansia") ||
    message.includes("hello vansiya") ||
    message.includes("hay vansiya") ||
    message.includes("hay vansia") ||
    message.includes("hay") ||
    message.includes("hii vansia") ||
    message.includes("hii vansiya") ||
    message.includes("hey") ||
    message.includes("hey vansia") ||
    message.includes("hey vansiya")
  ) {
    speak("Hello, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Vansh Sar.");
  } else if (message.includes("tumhara naam kya hai tum kaisi ho")) {
    speak("mera naam vansia hai , or mai bahut achee hu, and aap kaise ho?");
  } else if (
    message.includes(
      "tumhen kisne banaya hai" || "who build you" || "who makes you"
    )
  ) {
    speak("mujhe Vansh Sar ne banaya hai");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com/");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com/");
  } else {
    let query = message.replace(/vansia|vansiya/gi, "").trim();
    speak(`This is what I found on the internet regarding ${query}`);
    window.open(`https://www.google.com/search?q=${query}`);
  }
}
