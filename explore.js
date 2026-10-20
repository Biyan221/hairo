const salons = [
 {id:1,name:"The Common Room",type:"Unisex",tag:"Community favourite",rating:4.9,reviews:128,location:"Kemang, South Jakarta",price:85000,service:"Signature haircut",open:true,weekend:true,image:"photo-1560066984-138dadb4c035",description:"A thoughtful neighbourhood studio with a relaxed atmosphere, considered cuts, and stylists who take the time to understand your look."},
 {id:2,name:"Morrow Studio",type:"Salon",tag:"Modern minimal",rating:4.8,reviews:96,location:"Senopati, South Jakarta",price:150000,service:"Cut & styling",open:true,weekend:true,image:"photo-1522337360788-8b13dee7a37e",description:"A calm, light-filled salon for modern cuts, styling, and colour. A considered experience from consultation to the final finish."},
 {id:3,name:"Goodfolk Barber",type:"Barbershop",tag:"Barber's pick",rating:4.9,reviews:214,location:"Cipete, South Jakarta",price:65000,service:"Classic haircut",open:true,weekend:true,image:"photo-1503951914875-452162b0f3f1",description:"A contemporary barbershop grounded in classic technique. Come in for a clean fade, a timeless cut, or a proper beard tidy."},
 {id:4,name:"Sunday Society",type:"Salon",tag:"Colour specialists",rating:4.7,reviews:83,location:"Menteng, Central Jakarta",price:220000,service:"Colour consultation",open:false,weekend:true,image:"photo-1521590832167-7bcbfaa6381f",description:"A creative salon for expressive colour, soft layers, and personalised care, with a team that keeps hair health at the centre."},
 {id:5,name:"Forma Hair Atelier",type:"Unisex",tag:"Design-led studio",rating:4.8,reviews:71,location:"Pondok Indah, South Jakarta",price:180000,service:"Cut & treatment",open:true,weekend:false,image:"photo-1633681926022-84c23e8cb2d2",description:"An intimate atelier blending technical precision with easy, wearable styles. Ideal for a refresh that still feels like you."},
 {id:6,name:"Ruang Pangkas",type:"Barbershop",tag:"Local favourite",rating:4.6,reviews:176,location:"Blok M, South Jakarta",price:45000,service:"Everyday haircut",open:true,weekend:true,image:"photo-1621605815971-fbc98d665033",description:"An easygoing local barbershop offering dependable cuts, friendly service, and no-fuss grooming at an approachable price."},
 {id:7,name:"Maison Mane",type:"Salon",tag:"Premium care",rating:4.9,reviews:64,location:"SCBD, South Jakarta",price:275000,service:"Cut & blow dry",open:false,weekend:true,image:"photo-1487412720507-e7ab37603c6f",description:"Premium hair care with a personalised consultation, refined styling, and an unhurried studio experience."},
 {id:8,name:"Studio Sora",type:"Unisex",tag:"Easy-going style",rating:4.7,reviews:102,location:"Kelapa Gading, North Jakarta",price:95000,service:"Wash & haircut",open:true,weekend:true,image:"photo-1527799820374-dcf8d9d4a388",description:"A bright and welcoming studio for everyday cuts, soft styling, and small changes that make a big difference."},
 {id:9,name:"Blade & Bloom",type:"Barbershop",tag:"Detail focused",rating:4.8,reviews:89,location:"Gandaria, South Jakarta",price:75000,service:"Fade haircut",open:true,weekend:false,image:"photo-1599351431202-1e0f0137899a",description:"Sharp fades and thoughtful details, paired with a modern space that makes grooming feel like a ritual."},
 {id:10,name:"Olive Hair House",type:"Salon",tag:"Hair wellness",rating:4.6,reviews:58,location:"Rawamangun, East Jakarta",price:125000,service:"Hair treatment",open:true,weekend:true,image:"photo-1562322140-8baeececf3df",description:"A friendly salon with a focus on hair wellness, nourishing treatments, and practical advice for your routine."},
 {id:11,name:"Atelier Nine",type:"Unisex",tag:"Quiet luxury",rating:4.9,reviews:47,location:"Kuningan, South Jakarta",price:320000,service:"Personalised styling",open:false,weekend:true,image:"photo-1524250502761-1ac6f2e30d43",description:"A private-feeling studio for personalised styling, premium treatments, and a slower, more considered salon visit."},
 {id:12,name:"Northside Barber",type:"Barbershop",tag:"Walk-in friendly",rating:4.5,reviews:139,location:"Sunter, North Jakarta",price:35000,service:"Classic haircut",open:true,weekend:true,image:"photo- barber-placeholder",description:"A laid-back barbershop with skilled barbers, classic cuts, and straightforward pricing for regular visits."}
];
salons[11].image="photo-1622286342621-4bd786c2447c";
const state={category:"All",rating:0,maxPrice:500,search:"",location:"",open:false,weekend:false,saved:new Set(),visible:9,showSaved:false};
const $=id=>document.getElementById(id);
const money=n=>"Rp "+n.toLocaleString("id-ID");
const imageUrl=id=>`https://images.unsplash.com/${id.startsWith("photo-")?id:"photo-1560066984-138dadb4c035"}?auto=format&fit=crop&w=800&q=80`;
function filteredSalons(){
 let list=salons.filter(s=>{
  const query=state.search.toLowerCase();
  const matchesQuery=!query||`${s.name} ${s.type} ${s.service} ${s.location}`.toLowerCase().includes(query);
  const matchesLoc=!state.location||s.location.toLowerCase().includes(state.location.toLowerCase());
  const categoryMatch=state.category==="All"||s.type===state.category;
  const savedMatch=!state.showSaved||state.saved.has(s.id);
  return matchesQuery&&matchesLoc&&categoryMatch&&savedMatch&&s.price<=state.maxPrice&&s.rating>=state.rating&&(!state.open||s.open)&&(!state.weekend||s.weekend);
 });
 const sort=$("sortSelect")?.value||"recommended";
 if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 if(sort==="price-low")list.sort((a,b)=>a.price-b.price);
 if(sort==="price-high")list.sort((a,b)=>b.price-a.price);
 return list;
}
function card(s){
 return `<article class="salon-card" tabindex="0" role="button" aria-label="View ${s.name} details" data-open="${s.id}">
 <div class="salon-image"><img loading="lazy" src="${imageUrl(s.image)}" alt="${s.name} interior"><span class="image-tag">${s.tag}</span><button class="favorite-btn ${state.saved.has(s.id)?"is-saved":""}" data-save="${s.id}" aria-label="${state.saved.has(s.id)?"Remove from":"Save"} ${s.name}">${state.saved.has(s.id)?"♥":"♡"}</button></div>
 <div class="salon-info"><div class="salon-name-row"><h3 class="salon-name">${s.name}</h3><span class="salon-rating"><span>★</span>${s.rating.toFixed(1)} <small>(${s.reviews})</small></span></div>
 <p class="salon-location">⌖ &nbsp;${s.location}</p><div class="salon-meta"><div class="service-price">${s.service}<strong>${money(s.price)}<small> / from</small></strong></div><span class="open-label ${s.open?"":"closed-label"}">${s.open?"Open today":"Closed today"}</span><span class="card-arrow">↗</span></div></div></article>`;
}
function render(){
 const list=filteredSalons(), shown=list.slice(0,state.visible);
 $("salonGrid").innerHTML=shown.map(card).join("");
 $("resultsCount").textContent=`${list.length} ${list.length===1?"place":"places"}`;
 $("mobileResultsCount").textContent=`${list.length} places found`;
 $("emptyState").hidden=list.length!==0;
 $("salonGrid").style.display=list.length?"grid":"none";
 $("loadMore").style.display=list.length>shown.length?"inline-block":"none";
 $("loadMore").innerHTML=state.showSaved?"Back to all places <span>↗</span>":"Show more places <span>↓</span>";
 $("savedCount").textContent=state.saved.size;
 const active=(state.category!=="All"?1:0)+(state.rating?1:0)+(state.maxPrice<500?1:0)+(state.open?1:0)+(state.weekend?1:0);
 $("activeFilterCount").textContent=active;
 $("categoryPills").querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));
 $("categoryPills").querySelector('[data-category="All"]').innerHTML=`All places <span>${salons.length}</span>`;
}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.hairoToastTimer);window.hairoToastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
function openModal(id){
 const s=salons.find(x=>x.id===Number(id));if(!s)return;
 $("modalContent").innerHTML=`<img class="modal-cover" src="${imageUrl(s.image)}" alt="${s.name} salon"><div class="modal-body"><p class="eyebrow">${s.tag.toUpperCase()}</p><h2 id="modalTitle">${s.name}</h2><p class="modal-location">⌖ &nbsp;${s.location} &nbsp; · &nbsp; <span style="color:#b18b45">★</span> ${s.rating} (${s.reviews} reviews)</p><p class="modal-description">${s.description}</p><div class="modal-detail-row"><div><span>POPULAR SERVICE</span><strong>${s.service}</strong></div><div><span>STARTING FROM</span><strong>${money(s.price)}</strong></div><div><span>STATUS</span><strong>${s.open?"Open today":"Closed today"}</strong></div></div><button class="modal-book" id="demoBook">Explore booking options <span>↗</span></button></div>`;
 $("salonModal").classList.add("open");$("salonModal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
 $("demoBook").addEventListener("click",()=>toast("Booking flow is a UI demo for now."));
}
function closeModal(){$("salonModal").classList.remove("open");$("salonModal").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function clearFilters(){
 state.category="All";state.rating=0;state.maxPrice=500;state.search="";state.location="";state.open=false;state.weekend=false;state.showSaved=false;state.visible=9;
 $("searchInput").value="";$("locationInput").value="";$("priceRange").value=500;$("priceValue").textContent=money(500);$("openNow").checked=false;$("weekend").checked=false;
 document.querySelectorAll('input[name="category"]').forEach(i=>i.checked=false);document.querySelectorAll(".rating-option").forEach(b=>b.classList.toggle("selected",b.dataset.rating==="0"));
 render();
}
$("searchButton").addEventListener("click",()=>{state.search=$("searchInput").value.trim();state.location=$("locationInput").value.trim();state.visible=9;render();$("salons").scrollIntoView({behavior:"smooth"});});
$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("searchButton").click()});
$("locationInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("searchButton").click()});
document.querySelectorAll("[data-quick]").forEach(b=>b.addEventListener("click",()=>{const q=b.dataset.quick;state.search=q==="Barbershop"?"Barbershop":q;$("searchInput").value=state.search;state.category=q==="Barbershop"?"Barbershop":"All";state.visible=9;render();$("salons").scrollIntoView({behavior:"smooth"})}));
$("categoryPills").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;state.category=b.dataset.category;state.visible=9;render()});
document.querySelectorAll('input[name="category"]').forEach(i=>i.addEventListener("change",()=>{const selected=[...document.querySelectorAll('input[name="category"]:checked')].map(x=>x.value);state.category=selected.length===1?selected[0]:"All";render()}));
$("priceRange").addEventListener("input",e=>{$("priceValue").textContent=money(Number(e.target.value));state.maxPrice=Number(e.target.value);render()});
document.querySelectorAll(".rating-option").forEach(b=>b.addEventListener("click",()=>{state.rating=Number(b.dataset.rating);document.querySelectorAll(".rating-option").forEach(x=>x.classList.toggle("selected",x===b));render()}));
$("openNow").addEventListener("change",e=>{state.open=e.target.checked;render()});
$("weekend").addEventListener("change",e=>{state.weekend=e.target.checked;render()});
$("sortSelect").addEventListener("change",render);
$("clearFilters").addEventListener("click",clearFilters);$("emptyClear").addEventListener("click",clearFilters);
$("applyFilters").addEventListener("click",()=>{$("filterSidebar").classList.remove("mobile-open");$("filterBackdrop").classList.remove("open");render()});
$("mobileFilterBtn").addEventListener("click",()=>{$("filterSidebar").classList.add("mobile-open");$("filterBackdrop").classList.add("open")});
$("filterBackdrop").addEventListener("click",()=>{$("filterSidebar").classList.remove("mobile-open");$("filterBackdrop").classList.remove("open")});
$("salonGrid").addEventListener("click",e=>{const save=e.target.closest("[data-save]");if(save){e.stopPropagation();const id=Number(save.dataset.save);state.saved.has(id)?state.saved.delete(id):state.saved.add(id);render();toast(state.saved.has(id)?"Salon saved to your favourites":"Removed from favourites");return}const cardEl=e.target.closest("[data-open]");if(cardEl)openModal(cardEl.dataset.open)});
$("salonGrid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-open]")){e.preventDefault();openModal(e.target.dataset.open)}});
$("loadMore").addEventListener("click",()=>{if(state.showSaved){state.showSaved=false;state.visible=9;$("savedTrigger").classList.remove("active");render()}else{state.visible+=3;render()}});
$("savedTrigger").addEventListener("click",()=>{state.showSaved=!state.showSaved;state.visible=99;state.category="All";$("savedTrigger").classList.toggle("active",state.showSaved);render();$("salons").scrollIntoView({behavior:"smooth"});if(state.showSaved)toast("Showing your saved salons")});
$("modalClose").addEventListener("click",closeModal);$("salonModal").addEventListener("click",e=>{if(e.target===$("salonModal"))closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("mobileMenuBtn").addEventListener("click",()=>$("mobileNav").classList.toggle("open"));
$("profileBtn").addEventListener("click",()=>{let p=document.querySelector(".profile-pop");if(!p){p=document.createElement("div");p.className="profile-pop";p.innerHTML="<strong>Welcome to HAiro</strong><span>Your style journey starts here.</span>";document.body.appendChild(p)}p.classList.toggle("show")});
document.addEventListener("click",e=>{const p=document.querySelector(".profile-pop");if(p&&!p.contains(e.target)&&e.target!==$("profileBtn"))p.classList.remove("show")});
render();
