const textarea = document.querySelector("textarea"),
    voiceList=document.querySelector("select"),
    speechBtn = document.querySelector("button");


let synth = speechSynthesis,
    isSpeaking = true;

voices();

function voices() { 
    for (let voice of synth.getVoices()) {
        let option = `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",option)
    }
}
synth.addEventListener("voiceschanged", voices);



function textareaToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice=voice
        }
    }
    synth.speak(utternance)
}
// controll on the button .
speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textareaToSpeech(textarea.value);
        }

        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText="Resume Speechd"
            }

            sessionStorage(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech"
                }
            });
        } else {
            speechBtn.innerText = "Convert To Speech"
        }
    }
});