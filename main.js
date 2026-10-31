document.addEventListener("DOMContentLoaded",()=>{
 // Restore the small interactions and keep browser defaults accessible.
 document.querySelectorAll("button").forEach(b=>b.addEventListener("keydown",e=>{if(e.key===" "){e.preventDefault();b.click()}}));
});