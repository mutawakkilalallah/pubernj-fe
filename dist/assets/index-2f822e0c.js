import{m as d,q as n,s,x as i,y as l,z as r,A as u,B as h,C as g,D as c}from"./index-12a07d37.js";const k=d("auth",{state:()=>({token:localStorage.getItem("token")?n():null,user:localStorage.getItem("user")?s():null,foto:"",loading:!1}),getters:{isAuth(e){return e.token!==null||e.token!==void 0},getToken:()=>n(),useGetter:()=>s()!==null||s()!==void 0,getNamaLengkap:()=>i()!==null||i()!==void 0,getFotoProfil:()=>l()!==null||l()!==void 0},actions:{async login(e){this.loading=!0;try{await r.post("login",e).then(t=>{u(t.data.token),h(t.data.data);const a=n(),o=s();a?(this.SET_TOKEN_USER(a,o),this.loading=!1):(this.loading=!1,g.push("/login"))})}catch{this.loading=!1}},async getImage(e,t){this.loading=!0;try{const a={responseType:"blob"};await r.get("santri/image/"+e+"?size="+t,a).then(o=>{this.foto=URL.createObjectURL(o.data),this.loading=!1})}catch{this.loading=!1}},SET_TOKEN_USER(e,t){c(e),this.token=e,this.user=t,g.push("/")}}});export{k as u};
