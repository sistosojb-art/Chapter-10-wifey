const Store = {
  get(key, fallback=null){try{const v=localStorage.getItem("wifeyV3:"+key);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}},
  set(key,value){try{localStorage.setItem("wifeyV3:"+key,JSON.stringify(value));return true}catch(e){return false}},
  remove(key){localStorage.removeItem("wifeyV3:"+key)}
};
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[contenteditable=true]").forEach((el,i)=>{
    const key="edit-"+i, saved=Store.get(key);
    if(saved!==null) el.innerHTML=saved;
    el.addEventListener("input",()=>Store.set(key,el.innerHTML));
  });
  document.querySelectorAll(".timeline-date").forEach((el,i)=>{
    const key="date-"+i;el.value=Store.get(key,"");
    el.addEventListener("input",()=>Store.set(key,el.value));
  });
  document.querySelectorAll(".checklist input,.dream-list input").forEach((el,i)=>{
    el.checked=Store.get("check-"+i,false);
    el.addEventListener("change",()=>Store.set("check-"+i,el.checked));
  });
});