
document.addEventListener("DOMContentLoaded",()=>{
 const panel=document.getElementById("contentsPanel");
 const toggle=document.getElementById("contentsToggle");

 toggle.addEventListener("click",()=>{
  panel.hidden=!panel.hidden;
  toggle.setAttribute("aria-expanded",String(!panel.hidden));
 });

 document.getElementById("contentsClose").addEventListener("click",()=>{
  panel.hidden=true;
  toggle.setAttribute("aria-expanded","false");
 });

 panel.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
   panel.hidden=true;
   toggle.setAttribute("aria-expanded","false");
  });
 });

 document.getElementById("openBook").addEventListener("click",()=>{
  document.getElementById("welcome").scrollIntoView({behavior:"smooth"});
 });

 document.getElementById("topButton").addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
 });

 const chapters=[...document.querySelectorAll("[data-chapter]")];
 const seen=new Set(Store.get("seen",[]));

 const update=()=>{
  const count=seen.size;

  document.getElementById("progressLabel").textContent=
   `${count} of 15 chapters explored`;

  document.getElementById("progressFill").style.width=
   (count/15*100)+"%";

  const status=document.getElementById("giftStatus");
  const gift=document.getElementById("openGift");

  // Unlock the gift when Chapter 15 is reached
  const unlocked=seen.has("15");

  if(unlocked){
   status.textContent=
    "You reached the final chapter. Your little gift is ready. ♡";
   gift.disabled=false;
  }else{
   status.textContent=
    "Keep reading until the final chapter to unlock your little surprise.";
   gift.disabled=true;
  }

  Store.set("seen",[...seen]);
 };

 const markSeen=(chapter)=>{
  seen.add(chapter);
  update();
 };

 if("IntersectionObserver" in window){
  const io=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
    if(e.isIntersecting){
     markSeen(e.target.dataset.chapter);
    }
   });
  },{
   threshold:0.05,
   rootMargin:"0px 0px -8% 0px"
  });

  chapters.forEach(c=>io.observe(c));
 }else{
  chapters.forEach(c=>markSeen(c.dataset.chapter));
 }

 // Also mark a chapter when opened through the contents menu
 panel.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
   const target=document.querySelector(a.getAttribute("href"));

   if(target && target.dataset.chapter){
    markSeen(target.dataset.chapter);
   }
  });
 });

 update();

 if("serviceWorker" in navigator &&
    location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
 }
});
