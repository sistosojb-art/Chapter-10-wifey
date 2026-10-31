const GalleryDB={
  db:null,
  async open(){if(this.db)return this.db;return new Promise((resolve,reject)=>{const req=indexedDB.open("WifeyScrapbookGallery",1);req.onupgradeneeded=()=>req.result.createObjectStore("photos",{keyPath:"id",autoIncrement:true});req.onsuccess=()=>{this.db=req.result;resolve(this.db)};req.onerror=()=>reject(req.error);});},
  async all(){const db=await this.open();return new Promise((resolve,reject)=>{const r=db.transaction("photos").objectStore("photos").getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
  async add(photo){const db=await this.open();return new Promise((resolve,reject)=>{const r=db.transaction("photos","readwrite").objectStore("photos").add(photo);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});},
  async update(id,caption){const db=await this.open();const tx=db.transaction("photos","readwrite"),s=tx.objectStore("photos");const r=s.get(id);r.onsuccess=()=>{const v=r.result;if(v){v.caption=caption;s.put(v)}};return new Promise((res,rej)=>{tx.oncomplete=res;tx.onerror=()=>rej(tx.error)});},
  async remove(id){const db=await this.open();return new Promise((resolve,reject)=>{const r=db.transaction("photos","readwrite").objectStore("photos").delete(id);r.onsuccess=resolve;r.onerror=()=>reject(r.error);});}
};
document.addEventListener("DOMContentLoaded",()=>{
 const input=document.getElementById("photoInput"),grid=document.getElementById("photoGallery");
 if(!input||!grid)return;
 const render=async()=>{
  try{const items=await GalleryDB.all();grid.innerHTML="";
   if(!items.length){grid.innerHTML='<div class="photo-empty"><span>♡</span><b>Your first memory goes here</b><small>Tap “Add our photos” to begin.</small></div>';return;}
   items.forEach(item=>{const fig=document.createElement("figure");fig.className="photo-card";
    const img=document.createElement("img");img.src=item.data;img.alt=item.caption||"Our memory";
    img.addEventListener("click",()=>{const d=document.getElementById("photoDialog");document.getElementById("largePhoto").src=item.data;document.getElementById("largeCaption").textContent=item.caption||"";d.showModal();});
    const cap=document.createElement("figcaption");cap.contentEditable="true";cap.textContent=item.caption||"A memory to keep";cap.setAttribute("aria-label","Edit photo caption");cap.addEventListener("blur",()=>GalleryDB.update(item.id,cap.textContent));
    const actions=document.createElement("div");actions.className="photo-actions";const del=document.createElement("button");del.textContent="Remove";del.addEventListener("click",async()=>{await GalleryDB.remove(item.id);render()});actions.append(del);
    fig.append(img,cap,actions);grid.append(fig);
   });
  }catch(e){grid.innerHTML='<p class="center-note">Photo storage is unavailable in this preview. Try opening the scrapbook in a browser or local server.</p>';}
 };
 input.addEventListener("change",async()=>{
  for(const file of input.files){if(!file.type.startsWith("image/"))continue;
   try{const data=await resizeImage(file);await GalleryDB.add({data,caption:file.name.replace(/\.[^.]+$/,"")});}catch(e){showMessage("Photo could not be added","Try a smaller picture or another browser.");}
  }input.value="";render();
 });
 render();
});
function resizeImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1500,scale=Math.min(1,max/Math.max(img.width,img.height)),canvas=document.createElement("canvas");canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/jpeg",.82));};img.src=reader.result;};reader.readAsDataURL(file);});}