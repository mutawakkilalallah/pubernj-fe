import{r as _,a as m,c as i,b as e,w as v,d,v as c,u as b,e as h,o as l,p as f,f as g}from"./index-12a07d37.js";import{u as w}from"./index-2f822e0c.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const y="/logo.png";const a=t=>(f("data-v-e65601ba"),t=t(),g(),t),k={class:"loginPage d-flex justify-content-center align-items-center"},L={class:"boxLogin shadow p-5"},S=a(()=>e("div",{class:"text-center"},[e("img",{src:y,alt:"logo-puber",class:"appLogo shadow rounded-circle"})],-1)),B=a(()=>e("div",{class:"title text-center mb-5 mt-5"},[e("h4",null,"Aplikasi Pulang Bersama"),e("h6",null,"Pondok Pesantren Nurul Jadid")],-1)),I=["onSubmit"],P={key:0,type:"submit",class:"btn btn-primary btn-block",style:{width:"100%"}},N=a(()=>e("div",{class:"developer text-center mt-5"},[e("small",null,"Nurul Jadid © 2023")],-1)),A=a(()=>e("div",{class:"developer text-center mt-3"},[e("i",null,"developed by:"),e("br"),e("i",null,"@mutawakkilalallah @farhandardiri")],-1)),U={__name:"Login",setup(t){const r=w(),o=_({username:"",password:""});function p(){r.login(o.value)}return(V,s)=>{const u=m("app-btn-loading");return l(),i("div",k,[e("div",L,[S,B,e("form",{onSubmit:v(p,["prevent"])},[d(e("input",{"onUpdate:modelValue":s[0]||(s[0]=n=>o.value.username=n),type:"text",class:"form-control mb-2",placeholder:"Username"},null,512),[[c,o.value.username]]),d(e("input",{"onUpdate:modelValue":s[1]||(s[1]=n=>o.value.password=n),type:"password",class:"form-control mb-3",placeholder:"Password"},null,512),[[c,o.value.password]]),b(r).loading===!1?(l(),i("button",P," LOGIN ")):(l(),h(u,{key:1}))],40,I),N,A])])}}},C=x(U,[["__scopeId","data-v-e65601ba"]]);export{C as default};
