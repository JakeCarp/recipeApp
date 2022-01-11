import{r as z,c as h,a as S,o as u,b as _,d as o,e as P,F as N,f as F,g as K,h as W,i as Y,j as $,S as D,k as G,u as J,w as y,v as V,t as f,M as U,l as x,m as Q,n as Z,p as v,q as k,s as X,x as ee,y as te,z as ne,A as oe}from"./vendor.5e883815.js";const re=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&e(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}};re();const c=z({user:{},account:{},recipes:[],steps:[],ingredients:[],activeRecipe:{}});var A=(r,t)=>{for(const[n,e]of t)r[n]=e;return r};const se={name:"App",setup(){return{appState:h(()=>c)}}};function ie(r,t,n,e,s,a){const d=S("Navbar"),i=S("router-view");return u(),_(N,null,[o("header",null,[P(d)]),o("main",null,[P(i)])],64)}var ae=A(se,[["render",ie]]);const ce={setup(){return{}}},de={class:"modal",tabindex:"-1"},le={class:"modal-dialog modal-lg"},ue={class:"modal-content"},_e={class:"modal-body"};function me(r,t,n,e,s,a){return u(),_("div",de,[o("div",le,[o("div",ue,[o("div",_e,[F(r.$slots,"modal-body")])])])])}var pe=A(ce,[["render",me]]),ge=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:pe});const L=window.location.origin.includes("localhost"),M=L?"https://localhost:5001":"",he="jacob-c-dev.us.auth0.com",fe="d755JP8Z8JRCOHv46AG86TBlBaW1NvM6",ve="https://jacob-c-dev.com",be="modulepreload",q={},ye="/",E=function(t,n){return!n||n.length===0?t():Promise.all(n.map(e=>{if(e=`${ye}${e}`,e in q)return;q[e]=!0;const s=e.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const d=document.createElement("link");if(d.rel=s?"stylesheet":be,s||(d.as="script",d.crossOrigin=""),d.href=e,document.head.appendChild(d),s)return new Promise((i,g)=>{d.addEventListener("load",i),d.addEventListener("error",g)})})).then(()=>t())};function we(r){switch(r){case"./pages/AboutPage.vue":return E(()=>import("./AboutPage.8dfcb2e2.js"),["assets/AboutPage.8dfcb2e2.js","assets/vendor.5e883815.js"]);case"./pages/AccountPage.vue":return E(()=>import("./AccountPage.7feaefea.js"),["assets/AccountPage.7feaefea.js","assets/AccountPage.1d38451d.css","assets/vendor.5e883815.js"]);case"./pages/HomePage.vue":return E(()=>import("./HomePage.275f5779.js"),["assets/HomePage.275f5779.js","assets/vendor.5e883815.js"]);default:return new Promise(function(t,n){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+r)))})}}function T(r){return()=>we(`./pages/${r}.vue`)}const ke=[{path:"/",name:"Home",component:T("HomePage")},{path:"/about",name:"About",component:T("AboutPage")},{path:"/account",name:"Account",component:T("AccountPage"),beforeEnter:Y}],B=K({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:W(),routes:ke});function C(r,t){if(L)console[r](`[${r}] :: ${new Date().toLocaleTimeString()} :: `,...t);else{switch(r){case"log":case"assert":return}console[r](`[${r}] :: ${new Date().toLocaleTimeString()} :: `,...t)}}const l={log(){C("log",arguments)},error(){C("error",arguments)},warn(){C("warn",arguments)},assert(){C("assert",arguments)},trace(){C("trace",arguments)}},m=$.create({baseURL:M,timeout:8e3});class Ie{async getAccount(){try{const t=await m.get("/account");c.account=t.data}catch(t){l.error("HAVE YOU STARTED YOUR SERVER YET???",t)}}}const Ae=new Ie;class b{static async confirm(t="Are you sure?",n="You won't be able to revert this!",e="warning",s="Yes, delete it!"){try{return!!(await D.fire({title:t,text:n,icon:e,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:s})).isConfirmed}catch{return!1}}static toast(t="Warning!",n="warning",e="top-end",s=3e3,a=!0){D.fire({title:t,icon:n,position:e,timer:s,timerProgressBar:a,toast:!0,showConfirmButton:!1})}}const Ce={connection:"connection",connected:"connected",disconnect:"disconnect",authenticate:"authenticate",authenticated:"authenticated",userConnected:"userConnected",userDisconnected:"userDisconnected",error:"error"};class Re{constructor(t=!1,n=M){}on(t,n){var e;return(e=this.socket)==null||e.on(t,n.bind(this)),this}onConnected(t){l.log("[SOCKET_CONNECTION]",t),this.connected=!0,this.playback()}onAuthenticated(t){l.log("[SOCKET_AUTHENTICATED]",t),this.authenticated=!0,this.playback()}authenticate(t){var n;(n=this.socket)==null||n.emit(Ce.authenticate,t)}onError(t){l.error("[SOCKET_ERROR]",t)}enqueue(t,n){l.log("[ENQUEING_ACTION]",{action:t,payload:n}),this.queue.push({action:t,payload:n})}playback(){l.log("[SOCKET_PLAYBACK]");const t=[...this.queue];this.queue=[],t.forEach(n=>{this.emit(n.action,n.payload)})}emit(t,n=void 0){if(this.requiresAuth&&!this.authenticated)return this.enqueue(t,n);if(!this.connected)return this.enqueue(t,n);this.socket.emit(t,n)}}class Se extends Re{constructor(){super();this.on("error",this.onError)}onError(t){b.toast(t.message,"error")}}const j=new Se,p=G({domain:he,clientId:fe,audience:ve,useRefreshTokens:!0,onRedirectCallback:r=>{B.push(r&&r.targetUrl?r.targetUrl:window.location.pathname)}});p.on(p.AUTH_EVENTS.AUTHENTICATED,async function(){m.defaults.headers.authorization=p.bearer,m.interceptors.request.use(xe),c.user=p.user,await Ae.getAccount(),j.authenticate(p.bearer)});async function xe(r){if(!p.isAuthenticated)return r;const t=p.identity.exp*1e3,n=t<Date.now(),e=t<Date.now()+1e3*60*60*12;return n?await p.loginWithPopup():e&&(await p.getTokenSilently(),m.defaults.headers.authorization=p.bearer,j.authenticate(p.bearer)),r}const Ee={setup(){const r=J();return{router:r,user:h(()=>c.user),account:h(()=>c.account),async login(){await p.loginWithPopup(),r.push({name:"Home"})},async logout(){p.logout({returnTo:window.location.origin})}}}},Te={class:"navbar navbar-expand-lg navbar-dark bg-dark px-3 border1 border-4 elevation-3 d-flex justi"},Oe={class:"selectable1","aria-label":"Profile"},Pe={class:"ms-4"},Ne={class:"d-flex"},De={class:"d-flex flex-column"},Ve={class:"me-3 mb-0 text-white text-end"},Ue={class:"text-white me-3 mb-0 text-end"},Le=["src"],Me={key:1};function qe(r,t,n,e,s,a){return u(),_("nav",Te,[o("div",Oe,[y(o("div",Pe,[o("div",Ne,[o("div",De,[o("h5",Ve,f(e.account.name),1),o("p",Ue,f(e.account.email),1)]),o("img",{src:e.account.picture,alt:"user photo",height:"50",width:"50",class:"picrounded elevation-2"},null,8,Le)])],512),[[V,e.user.isAuthenticated]])]),e.user.isAuthenticated?(u(),_("i",{key:0,onClick:t[0]||(t[0]=(...d)=>e.logout&&e.logout(...d)),class:"mdi-18px selectable border border-dark border-3 fs-5 text-white p-1 px-2 pb-2 me-4",title:"logout","aria-describedby":"logout"}," Logout ")):(u(),_("div",Me,[y(o("i",{onClick:t[1]||(t[1]=(...d)=>e.login&&e.login(...d)),class:"mdi-18px selectable fs-5 border border-dark border-3 p-1 px-2 pb-2 me-4 text-light"}," Login ",512),[[V,!e.user.isAuthenticated]])]))])}var Be=A(Ee,[["render",qe]]),je=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Be});class He{async GetAllRecipes(){const t=await m.get("api/recipes");l.log(t.data),c.recipes=t.data}async getStepsForRecipe(t){const n=await m.get("api/recipes/"+t+"/steps");l.log(n.data),c.steps=n.data}async getIngredientsForRecipe(t){const n=await m.get("api/recipes/"+t+"/ingredients");l.log(n.data),c.ingredients=n.data}async editRecipe(t){const n=await m.put("api/recipes/"+t.id,t);l.log(n.data),c.activeRecipe=n.data}async createRecipe(t){const n=await m.post("api/recipes",t);l.log(n.data),c.recipes.push(n.data)}async deleteRecipe(t){const n=await m.delete("api/recipes/"+t);l.log(n.data),c.recipes=c.recipes.filter(e=>e.id!=t)}}const R=new He,ze={props:{recipe:{type:Object,required:!0}},setup(r){return{steps:h(()=>c.steps),ingredients:h(()=>c.ingredients),async setActive(){try{c.activeRecipe=r.recipe,await R.getStepsForRecipe(r.recipe.id),await R.getIngredientsForRecipe(r.recipe.id)}catch(t){logger.error(t),U.getOrCreateInstance(document.getElementById("recipe-modal")).hide(),b.toast(t.message,"error")}}}}},Fe={class:"col-3"},Ke=["title"],We={class:"card selectable rounded elevation-2"},Ye={class:"card-header"},$e={class:"card-title text-center"},Ge={class:"card-body"},Je={class:"m-0"};function Qe(r,t,n,e,s,a){return u(),_("div",Fe,[o("div",{class:"recipe",title:n.recipe.title,"data-bs-toggle":"modal","data-bs-target":"#recipe-modal",onClick:t[0]||(t[0]=(...d)=>e.setActive&&e.setActive(...d))},[o("div",We,[o("div",Ye,[o("h5",$e,f(n.recipe.title),1)]),o("div",Ge,[o("p",Je,f(n.recipe.description),1)])])],8,Ke)])}var Ze=A(ze,[["render",Qe]]),Xe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ze});class et{async editIngredient(t,n){const e=await m.put("api/ingredients/"+n,t);l.log(e.data),R.getIngredientsForRecipe(t.recipeId)}async createIngredient(t,n){const e=await m.post("api/recipes/"+n+"/ingredients",t);l.log(e.data),c.ingredients.push(e.data)}async deleteIngredient(t){const n=await m.delete("api/ingredients/"+t);l.log(n.data),c.ingredients=c.ingredients.filter(e=>e.id!=t)}}const O=new et;const tt={setup(){let r=x(!1),t=x(!1),n=x({});return{ingredientData:n,editIngredients:t,edit:r,account:h(()=>c.account),recipe:h(()=>c.activeRecipe),steps:h(()=>c.steps),ingredients:h(()=>c.ingredients),async editRecipe(e){try{await R.editRecipe(e),b.toast("Saved!","success"),r.value=!r.value}catch(s){l.error(s),b.toast(s,"error")}},async editIngredient(e,s){try{await O.editIngredient(e,s),b.toast("saved!","success")}catch(a){l.error(a),b.toast(a,"error")}},async createIngredient(){try{await O.createIngredient(n.value,this.recipe.id),b.toast("Created Ingredient","success"),n.value={}}catch(e){l.error(e),b.toast(e,"error")}},async deleteRecipe(){try{await b.confirm("Hold on!","Are you sure you want to delete this recipe?")&&(await R.deleteRecipe(this.recipe.id),U.getOrCreateInstance(document.getElementById("recipe-modal")).hide())}catch(e){l.error(e)}},async deleteIngredient(e){try{await O.deleteIngredient(e)}catch(s){l.error(s)}}}}},w=r=>(ee("data-v-6e4b1056"),r=r(),te(),r),nt={class:"container-fluid p-"},ot={class:"row"},rt=w(()=>o("div",{class:"text-end"},[o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),st={key:0,class:"col-11 my-2"},it={class:"m-0"},at={key:1,class:"col-11"},ct=w(()=>o("label",{for:"recipeTitle"},"Recipe Title",-1)),dt=w(()=>o("label",{for:"recipe description"},"Recipe Description",-1)),lt={class:"col-1"},ut={key:0},_t={class:"text-end my-2"},mt={class:"text-end"},pt={key:1},gt=w(()=>o("i",{class:"mdi mdi-check"},null,-1)),ht=[gt],ft=w(()=>o("i",{class:"mdi mdi-close"},null,-1)),vt=[ft],bt={class:"row"},yt={class:"col-12 my-2"},wt=ne(" Ingredients: "),kt={key:0,class:"text-end"},It={key:1,class:""},At={class:"mb-3 col-4"},Ct=w(()=>o("label",{for:"ingredientInput",class:"form-label"},"Ingredient Name",-1)),Rt={class:"mb-3 col-4"},St=w(()=>o("label",{for:"ingredientAm",class:"form-label"},"Ingredient Amount",-1)),xt={key:2,class:"text-end"},Et=w(()=>o("i",{class:"mdi mdi-close"},null,-1)),Tt=[Et],Ot={class:"col-12"},Pt={class:"row scroll ingredients"},Nt={key:0},Dt={class:"m-0"},Vt={class:"m-0"},Ut={key:1,class:"border"},Lt=["for"],Mt=["onUpdate:modelValue"],qt=["for"],Bt=["onUpdate:modelValue"],jt=["onClick"],Ht=["onClick"];function zt(r,t,n,e,s,a){const d=S("Modal");return u(),Q(d,{id:"recipe-modal"},{"modal-body":Z(()=>[o("div",nt,[o("div",ot,[rt,e.edit?v("",!0):(u(),_("div",st,[o("h3",null,f(e.recipe.title),1),o("p",it,f(e.recipe.description),1)])),e.edit?(u(),_("div",at,[o("form",null,[ct,y(o("input",{type:"text",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=i=>e.recipe.title=i)},null,512),[[k,e.recipe.title]]),dt,y(o("input",{type:"text",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=i=>e.recipe.description=i)},null,512),[[k,e.recipe.description]])])])):v("",!0),o("div",lt,[!e.edit&&e.recipe.creatorId==e.account.id?(u(),_("div",ut,[o("div",_t,[o("i",{class:"mdi mdi-pencil selectable",title:"edit recipe",onClick:t[2]||(t[2]=i=>e.edit=!e.edit)})]),o("div",mt,[o("i",{class:"mdi mdi-trash-can text-danger selectable",title:"delete recipe",onClick:t[3]||(t[3]=(...i)=>e.deleteRecipe&&e.deleteRecipe(...i))})])])):v("",!0),e.edit?(u(),_("div",pt,[o("button",{class:"btn btn-success my-4",onClick:t[4]||(t[4]=i=>e.editRecipe(e.recipe))},ht),o("button",{class:"btn btn-danger",onClick:t[5]||(t[5]=i=>e.edit=!e.edit)},vt)])):v("",!0)])]),o("div",bt,[o("div",yt,[o("h4",null,[wt,o("span",null,f(e.ingredients.length),1)]),!e.editIngredients&&e.recipe.creatorId===e.account.id?(u(),_("div",kt,[o("i",{class:"mdi mdi-pencil selectable",title:"edit Ingredients",onClick:t[6]||(t[6]=i=>e.editIngredients=!e.editIngredients)})])):v("",!0),e.recipe.creatorId===e.account.id?(u(),_("div",It,[o("form",null,[o("div",At,[Ct,y(o("input",{type:"text","onUpdate:modelValue":t[7]||(t[7]=i=>e.ingredientData.name=i),class:"form-control",id:"ingredientInput",placeholder:"Name..."},null,512),[[k,e.ingredientData.name]])]),o("div",Rt,[St,y(o("input",{class:"form-control","onUpdate:modelValue":t[8]||(t[8]=i=>e.ingredientData.amount=i),placeholder:"Amount...",id:"ingredientAm"},null,512),[[k,e.ingredientData.amount]])]),o("button",{class:"btn btn-success",onClick:t[9]||(t[9]=(...i)=>e.createIngredient&&e.createIngredient(...i))}," Create Ingredient ")])])):v("",!0),e.editIngredients?(u(),_("div",xt,[o("button",{class:"btn btn-danger",onClick:t[10]||(t[10]=i=>e.editIngredients=!e.editIngredients)},Tt)])):v("",!0)]),o("div",Ot,[o("div",Pt,[(u(!0),_(N,null,X(e.ingredients,(i,g)=>(u(),_("div",{class:"col-6 m-2",key:i.id},[e.editIngredients?v("",!0):(u(),_("div",Nt,[o("h5",Dt,f(i.name),1),o("p",Vt,f(i.amount),1)])),e.editIngredients?(u(),_("div",Ut,[o("label",{for:"ingredient"+g},"Name Of Ingredient",8,Lt),y(o("input",{"onUpdate:modelValue":I=>e.ingredients[g].name=I,type:"text",class:"form-control"},null,8,Mt),[[k,e.ingredients[g].name]]),o("label",{for:"ingredientAmount"+g},"Amount of Ingredient",8,qt),y(o("input",{"onUpdate:modelValue":I=>e.ingredients[g].amount=I,type:"text",class:"form-control"},null,8,Bt),[[k,e.ingredients[g].amount]]),o("button",{class:"btn btn-success m-1",onClick:I=>e.editIngredient(e.ingredients[g],i.id)}," Save ",8,jt),o("button",{class:"btn btn-danger m-1",onClick:I=>e.deleteIngredient(i.id)}," Delete ",8,Ht)])):v("",!0)]))),128))])])])])]),_:1})}var Ft=A(tt,[["render",zt],["__scopeId","data-v-6e4b1056"]]),Kt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ft});function Wt(r){Object.entries({"./components/Modal.vue":ge,"./components/Navbar.vue":je,"./components/Recipe.vue":Xe,"./components/RecipeModal.vue":Kt}).forEach(([n,e])=>{const s=e.name||n.substr(n.lastIndexOf("/")+1).replace(/\.\w+$/,"");r.component(s,e.default)})}const H=oe(ae);Wt(H);H.use(B).mount("#app");export{c as A,b as P,A as _,l,R as r};
