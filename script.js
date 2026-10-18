/* KITOB MATNI: har bir bobni shu ro’yxatga qo’shing.
   title – bob nomi, body – abzatslar ro’yxati. */
var CHAPTERS=[
  {title:"1-bob. Quduq",body:["Qishloqning yagona quduqi shu yoz qurib qoldi. Odamlar avval hayron bo’ldi, keyin jim bo’lib qoldi, oxirida esa bir-biriga qaramay yurishni boshladi.","Maryam o’n yetti yoshda edi. Har tong bo’sh chelagini ko’tarib quduq boshiga borar, tubiga uzoq tikilib turar, so’ng indamay qaytardi. Chelak bo’sh edi, lekin yuragida nimadir to’lib borardi.","Buvisi aytardi: “Suv ketsa, qaytadi. Odam ketsa, qaytmaydi.” Maryam bu gapni tushunmasdi. Hali tushunmasdi.","Bir kechasi u eski xurjunini oldi. Ichiga bir bo’lak non, buvisining ro’molini va akasidan qolgan kichik sopol idishni soldi. Qishloq uyg’onmasdan oldin yo’lga chiqdi.","Faqat bitta qo’zichoq uning ortidan ergashdi."]},
  {title:"2-bob. Yo’l",body:["Sahro kunduzi oltin, kechasi esa sovuq edi. Maryam birinchi kuni jimgina yurdi, ikkinchi kuni o’zi bilan gaplasha boshladi, uchinchi kuni esa qo’zichoq bilan.","— Sen ham qo’rqyapsanmi? — deb so’radi u.","Qo’zichoq javob bermadi, lekin yaqinroq keldi. Maryam uchun shu ham javob edi.","To’rtinchi kuni u kichik bir vohaga yetib keldi. Palma soyasida bir chol yer qazib o’tirardi.","— Qayoqqa ketyapsan, qizim?","— Suv bor joyga.","Chol kulimsiradi: — Suv hamma joyda bor. Faqat uni topguncha qazishda davom etadigan odam kam.","Tong otganda Maryam so’radi: — Nega to’xtamayapsiz? Axir qancha qazidingiz.","Chol belini rostlab javob berdi: — Chunki to’xtasam, bu yerda hech narsa qolmaydi."]},
  {title:"3-bob. Suv",body:["Maryam vohada bir hafta qoldi. Chol bilan birga qazidi, kaftlari shilindi, lekin shikoyat qilmadi.","Yettinchi kuni kurak tagidan nam tuproq chiqdi. Keyin salqin bir shabada esdi. Keyin suv ko’rindi: avval loyqa, so’ng tiniq.","Maryam yig’lab yubordi. Suv uchun emas. Qishloq quduqi qurigan kuni yig’lamagan edi, hamma ko’z yoshi shu yerda to’kildi.","U sopol idishni to’ldirdi va birdan buvisining gapini tushundi. Odam ketsa qaytmaydi, agar yo’lini yo’qotib ketsa. U esa yo’lini topgan edi.","Ertasi tongda Maryam orqaga qaytdi. Endi bo’sh chelak bilan emas, kurak va suv bilan. Qo’zichoq oldinda yugurib borardi."]}
];
var $=function(i){return document.getElementById(i)};
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
var cur=0,fs=parseFloat(store.get("mm-fs"))||1.15,saved=parseInt(store.get("mm-ch"),10);
if(isNaN(saved)||saved<0||saved>=CHAPTERS.length)saved=-1;

function esc(s){return String(s).replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function toc(){
  $("toc").innerHTML=CHAPTERS.map(function(c,i){
    return '<li><button type="button" data-i="'+i+'"><span>'+esc(c.title)+'</span><span class="s">'+(i===saved?"davom etish":"")+'</span></button></li>';
  }).join("");
}
function open(i){
  cur=i;var c=CHAPTERS[i];
  $("rtitle").textContent=c.title;
  $("text").innerHTML='<h2>'+esc(c.title)+'</h2>'+c.body.map(function(p){return '<p>'+esc(p)+'</p>'}).join("");
  $("prev").disabled=i===0;$("next").disabled=i===CHAPTERS.length-1;
  $("reader").classList.add("on");$("scroll").scrollTop=0;$("bar").style.width="0";
  store.set("mm-ch",i);saved=i;
}
function applyFs(){document.documentElement.style.setProperty("--fs",fs+"rem");store.set("mm-fs",fs)}
$("toc").addEventListener("click",function(e){var b=e.target.closest("button");if(b)open(+b.dataset.i)});
$("start").onclick=function(){open(saved>=0?saved:0)};
$("back").onclick=function(){$("reader").classList.remove("on");toc()};
$("prev").onclick=function(){if(cur>0)open(cur-1)};
$("next").onclick=function(){if(cur<CHAPTERS.length-1)open(cur+1)};
$("fm").onclick=function(){fs=Math.max(.9,fs-.1);applyFs()};
$("fp").onclick=function(){fs=Math.min(1.8,fs+.1);applyFs()};
$("scroll").addEventListener("scroll",function(){var s=$("scroll"),m=s.scrollHeight-s.clientHeight;$("bar").style.width=(m>0?s.scrollTop/m*100:0)+"%"});
$("theme").onclick=function(){
  var r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme=dark?"light":"dark";$("theme").textContent=dark?"Tungi rejim":"Kunduzgi rejim";store.set("mm-theme",r.dataset.theme);
};
(function(){var t=store.get("mm-theme");if(t){document.documentElement.dataset.theme=t;$("theme").textContent=t==="dark"?"Kunduzgi rejim":"Tungi rejim"}})();
applyFs();toc();
