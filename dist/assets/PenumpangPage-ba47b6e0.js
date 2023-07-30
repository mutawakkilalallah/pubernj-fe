import{C as g,I as u,y as b,a as y,o as l,c as r,b as t,d,P as h,u as s,F as i,l as m,t as o,v,e as f,T as D}from"./index-31bd0d89.js";const P=g("table_penumpang",{state:()=>({items:[],meta:{},myPage:"",filter:{area:[],dropspot:[]},params:{cari:"",dropspot:"",area:"",page:1,limit:25}}),actions:{nexPage(p){this.params.page=parseInt(p)+1,this.getData()},prevPage(p){this.params.page=parseInt(p)-1,this.getData()},setPage(p){this.params.page=parseInt(p),this.getData()},searchPage(){this.params.page=1,this.getData()},async getData(){const p={params:this.params};try{await u.get("penumpang",p).then(a=>{(a.data.code=200)&&(this.totalData=a.headers.x_total_data,this.items=a.data.data,this.meta=a.headers,this.filter.area=a.data.filter.area)})}catch{}},async getDropspot(){this.params.dropspot="",this.getData();const p={params:{area:this.params.area}};try{await u.get("dropspot",p).then(a=>{(a.data.code=200)&&(this.filter.dropspot=a.data.data)})}catch{}}}}),k=t("h3",null,"Data Penumpang",-1),x=t("hr",null,null,-1),S={class:"filter-box mb-5 row"},N={class:"col-md-2"},w=t("option",{value:"",selected:""},"Semua Area",-1),C=["value"],B=["disabled"],I=t("option",{value:"",selected:""},"Semua Dropsot",-1),T=["value"],V={class:"serach-box row"},F={class:"col-md-10 d-flex align-items-center mb-2"},U={class:"col-md-2 d-flex align-items-center"},K=t("hr",null,null,-1),L={class:"table-responsive"},M={class:"table table-sm table-hover mt-3"},R=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"NIUP"),t("th",{scope:"col"},"Nama Santri"),t("th",{scope:"col"},"Wilayah"),t("th",{scope:"col"},"Daerah"),t("th",{scope:"col"},"Kecamatan"),t("th",{scope:"col"},"Kabupaten"),t("th",{scope:"col"},"Provinsi"),t("th",{scope:"col"},"Dropsot"),t("th",{scope:"col"},"Area"),t("th",{scope:"col"},"Tarif"),t("th",{scope:"col"},"Jumlah Bayar"),t("th",{scope:"col"},"Status Pembayaran")])],-1),A={key:0},j={key:1,class:"text-danger"},E=t("i",null,"belum-ditentukan",-1),J=[E],W={key:2},q={key:3,class:"text-danger"},z=t("i",null,"belum-ditentukan",-1),G=[z],H={key:4},O={key:5,class:"text-danger"},Y={__name:"PenumpangPage",setup(p){const a=P();return b(()=>{a.getData()}),(Q,n)=>{const _=y("app-paginate");return l(),r(i,null,[k,x,t("div",S,[t("div",N,[d(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[0]||(n[0]=e=>s(a).params.area=e),onChange:n[1]||(n[1]=(...e)=>s(a).getDropspot&&s(a).getDropspot(...e))},[w,(l(!0),r(i,null,m(s(a).filter.area,e=>(l(),r("option",{key:e,value:e.id},o(e.nama),9,C))),128))],544),[[h,s(a).params.area]]),d(t("select",{class:"form-select form-select-sm mb-2",disabled:s(a).params.area==="","onUpdate:modelValue":n[2]||(n[2]=e=>s(a).params.dropspot=e),onChange:n[3]||(n[3]=(...e)=>s(a).getData&&s(a).getData(...e))},[I,(l(!0),r(i,null,m(s(a).filter.dropspot,e=>(l(),r("option",{key:e,value:e.id},o(e.nama),9,T))),128))],40,B),[[h,s(a).params.dropspot]])])]),t("div",V,[t("div",F,[t("small",null,"Total data "+o(s(a).totalData),1)]),t("div",U,[d(t("input",{type:"text","onUpdate:modelValue":n[4]||(n[4]=e=>s(a).params.cari=e),class:"form-control form-control-sm mb-2",placeholder:"Cari Penumpang ...",onKeyup:n[5]||(n[5]=(...e)=>s(a).getData&&s(a).getData(...e))},null,544),[[v,s(a).params.cari]])])]),K,t("div",L,[t("table",M,[R,t("tbody",null,[(l(!0),r(i,null,m(s(a).items,(e,c)=>(l(),r("tr",{key:c},[t("td",null,o(c+1+(s(a).params.page-1)*s(a).params.limit),1),t("td",null,o(e.santri.niup),1),t("td",null,o(e.santri.nama_lengkap),1),t("td",null,o(e.santri.wilayah),1),t("td",null,o(e.santri.blok),1),t("td",null,o(e.santri.kecamatan),1),t("td",null,o(e.santri.kabupaten),1),t("td",null,o(e.santri.provinsi),1),e.dropspot?(l(),r("td",A,o(e.dropspot.nama),1)):(l(),r("td",j,J)),e.dropspot?(l(),r("td",W,o(e.dropspot.area.nama),1)):(l(),r("td",q,G)),e.dropspot?(l(),r("td",H,o("Rp. "+e.dropspot.harga),1)):(l(),r("td",O,"Rp. 0")),t("td",null,o("Rp. "+e.jumlah_bayar),1),t("td",null,[t("i",null,o(e.status_bayar),1)])]))),128))])])]),s(a).meta.x_total_data?(l(),f(_,{key:0,meta:s(a).meta,per_page:s(a).params.limit,onSetPage:n[6]||(n[6]=e=>s(a).setPage(e)),onNext:s(a).nexPage,onPrev:s(a).prevPage,onLast:s(a).setPage,onFirst:s(a).setPage},null,8,["meta","per_page","onNext","onPrev","onLast","onFirst"])):D("",!0)],64)}}};export{Y as default};