import{C as g,D as n,E as s,G as r,H as l,I as i,J as h,K as u,L as d,M as c}from"./index-b14a9fb6.js";const k=g("auth",{state:()=>({token:localStorage.getItem("token")?n():null,user:localStorage.getItem("user")?s():null,foto:"",stast:{},chart:[],loading:!1}),getters:{isAuth(t){return t.token!==null||t.token!==void 0},getToken:()=>n(),useGetter:()=>s()!==null||s()!==void 0,getNamaLengkap:()=>r()!==null||r()!==void 0,getFotoProfil:()=>l()!==null||l()!==void 0},actions:{async login(t){this.loading=!0;try{await i.post("login",t).then(e=>{h(e.data.token),u(e.data.data);const a=n(),o=s();a?(this.SET_TOKEN_USER(a,o),this.loading=!1):(this.loading=!1,d.push("/login"))})}catch{this.loading=!1}},async getImage(t,e){this.loading=!0;try{const a={responseType:"blob"};await i.get("santri/image/"+t+"?size="+e,a).then(o=>{this.foto=URL.createObjectURL(o.data),this.loading=!1})}catch{this.loading=!1}},async getStats(){try{await i.get("dashboard").then(t=>{this.stast=t.data.data.counter,this.chart=t.data.data.stat})}catch{}},SET_TOKEN_USER(t,e){c(t),this.token=t,this.user=e,d.push("/")}}});export{k as u};
