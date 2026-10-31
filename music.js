document.addEventListener("DOMContentLoaded",()=>{
 const audio=document.getElementById("backgroundMusic"),btn=document.getElementById("musicToggle"),label=document.getElementById("musicLabel");
 if(!audio||!btn)return;
 btn.addEventListener("click",async()=>{
   if(audio.paused){
     try{await audio.play();btn.setAttribute("aria-pressed","true");label.textContent="Music on";}
     catch(e){label.textContent="Add MP3 first";showMessage("Add your song","Put your MP3 file at assets/music/background.mp3, then tap the music button again.");}
   }else{audio.pause();btn.setAttribute("aria-pressed","false");label.textContent="Music off";}
 });
 audio.addEventListener("error",()=>{if(!audio.paused){label.textContent="Music unavailable";}});
 audio.addEventListener("ended",()=>{btn.setAttribute("aria-pressed","false");label.textContent="Music off";});
});