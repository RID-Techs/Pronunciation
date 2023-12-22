const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
let isSpeaking = false;
let synth = window.speechSynthesis;

const textToSpeech = () => {
  const text = textarea.value;

  if (!synth.speaking && text) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Adjust speech settings for better pronunciation
    utterance.rate = 0.9; // Speed of speech (0.1 to 10)
    utterance.pitch = 1; // Pitch of speech (0 to 2)
    
    // Select a specific voice for improved pronunciation
    const voices = synth.getVoices();
    const englishVoice = voices.find(voice => voice.lang === 'en-US');
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onend = () => {
      isSpeaking = false;
      button.innerText = "Check my pronunciation";
    };
    
    synth.speak(utterance);
    isSpeaking = true;
    button.innerText = "Pause";
  } else if (synth.speaking && isSpeaking) {
    synth.pause();
    isSpeaking = false;
    button.innerText = "Resume";
  } else {
    synth.resume();
    isSpeaking = true;
    button.innerText = "Pause";
  }
};

button.addEventListener("click", textToSpeech);

