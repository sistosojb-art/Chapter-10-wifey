function showMessage(title,text){const d=document.getElementById("messageDialog");if(!d)return;document.getElementById("messageTitle").textContent=title;document.getElementById("messageText").textContent=text;d.showModal();}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".flip-card").forEach(b=>b.addEventListener("click",()=>b.classList.toggle("flipped")));
 document.querySelectorAll("[data-letter]").forEach(b=>b.addEventListener("click",()=>openLetter(b.dataset.letter,b.classList.contains("open-when")?"A note for this moment":"A letter from Hubby")));
 document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
 document.querySelectorAll("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
 document.getElementById("flowerButton")?.addEventListener("click",()=>showMessage("A flower for you 🌷","Wifey, may your days have little reasons to bloom. Even on difficult days, you deserve gentleness, hope, and care. ILOVEYOUSOOOO MUCH!"));
 document.getElementById("hugButton")?.addEventListener("click",()=>showMessage("A very big hug!","Imagine your Hubby wrapping you in the warmest, safest hug. Hold it for as long as you need. 🤗"));
 document.querySelectorAll(".quiz-options button").forEach(b=>b.addEventListener("click",()=>{const f=document.getElementById("quizFeedback");f.textContent=b.dataset.answer==="right"?"Correct! The people and feelings make it special. ♡":"Try again, Wifey! Think about what makes a moment meaningful. ♡";}));
 document.getElementById("openGift")?.addEventListener("click",()=>showMessage("Your little gift ♡","Thank you for exploring our little world, Wifey. Your gift is this reminder: you are appreciated, your dreams matter, and I want to keep growing with honesty, faithfulness, and God at the center."));
 setupScratch();
});
function openLetter(key,eyebrow){const item=window.SCRAPBOOK_LETTERS?.[key];if(!item)return;document.getElementById("dialogEyebrow").textContent=eyebrow;document.getElementById("dialogTitle").textContent=item.title;document.getElementById("dialogBody").textContent=item.body;document.getElementById("letterDialog").showModal();}
function setupScratch(){
 const canvas=document.getElementById("scratchCanvas");if(!canvas)return;const ctx=canvas.getContext("2d");let drawing=false,revealed=false;
 const paint=()=>{const r=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;canvas.width=r.width*dpr;canvas.height=r.height*dpr;ctx.scale(dpr,dpr);ctx.fillStyle="#d9b7c9";ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle="#875e78";ctx.font="13px Poppins";ctx.textAlign="center";ctx.fillText("✧ scratch here ✧",r.width/2,r.height/2+4);ctx.globalCompositeOperation="destination-out";};
 paint();
 const point=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 canvas.addEventListener("pointerdown",e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.arc(p.x,p.y,18,0,Math.PI*2);ctx.fill();});
 canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=point(e);ctx.beginPath();ctx.arc(p.x,p.y,18,0,Math.PI*2);ctx.fill();});
 ["pointerup","pointercancel","lostpointercapture"].forEach(n=>canvas.addEventListener(n,()=>drawing=false));
 const reveal=()=>{if(revealed)return;revealed=true;ctx.clearRect(0,0,canvas.width,canvas.height);canvas.style.opacity="0";};
 document.getElementById("revealScratch")?.addEventListener("click",reveal);
 window.addEventListener("resize",()=>{if(!revealed)paint()});
}