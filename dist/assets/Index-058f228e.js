import{m as x,z as _,r as h,E as k,a as D,o as c,c as m,b as t,t as i,u as e,d as n,v as r,F as u,j as w,e as v,G as g,n as P,i as f,g as b,H as L,h as N}from"./index-12a07d37.js";const U=x("table_santri",{state:()=>({isOpenDetail:!1,items:[],item:{},fotoDiri:"",meta:{},myPage:"",params:{cari:"",page:1,limit:25}}),actions:{nexPage(o){console.log("next",o),this.params.page=parseInt(o)+1,this.getData()},prevPage(o){console.log("prev",o),this.params.page=parseInt(o)-1,this.getData()},setPage(o){console.log("setPAge",o),this.params.page=parseInt(o),this.getData()},searchPage(){this.params.page=1,this.getData()},async getData(){const o={params:this.params};try{await _.get("santri",o).then(a=>{console.log("meta headers",a.headers),(a.data.code=200)&&(this.items=a.data.data,this.meta=a.headers,this.kelipatan())})}catch{}},async handleDoubelClick(o){try{this.isOpenDetail=!0,await _.get("santri/"+o).then(a=>{(a.data.code=200)&&(this.item=a.data.data,this.getImage(a.data.data.uuid,"medium"))})}catch{}},async getImage(o){try{const a={responseType:"blob"};await _.get("santri/image/"+o,a).then(d=>{this.fotoDiri=URL.createObjectURL(d.data)})}catch(a){console.log("error",a)}}}});function V(){const o=h(1),a=h(5);function d(l){o.value=l}return{pages:o,limitPages:a,setPages:d}}const C=t("h3",null,"Data Santri",-1),S=t("hr",null,null,-1),I={class:"serach-box row"},T={class:"col-md-10 d-flex align-items-center mb-2"},O={class:"col-md-2 d-flex align-items-center"},K=t("hr",null,null,-1),j={class:"table-responsive"},B={class:"table table-sm table-hover mt-3"},E=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"NIUP"),t("th",{scope:"col"},"Nama Lengkap"),t("th",{scope:"col"},"JK"),t("th",{scope:"col"},"Wilayah"),t("th",{scope:"col"},"Daerah"),t("th",{scope:"col"},"Kab/Kota")])],-1),F=["onDblclick"],R={class:"modal-dialog"},$={class:"modal-content"},z={class:"modal-header"},A=t("h1",{class:"modal-title fs-5",id:"modalDetailLabel"},"Detail Santri",-1),M={class:"modal-body"},W=t("p",{class:"text-sm text-warning fst-italic"},[f(" *) Data ini bersifat secondary, untuk data lebih lanjut silahkan lihat di "),t("a",{href:"https://nuruljadid.app",style:{"text-decoration":"none"},target:"_blank",class:"text-info"},[t("b",null,"PEDATREN")])],-1),G={class:"row"},H={class:"col-md-8 order-sm-2 order-md-2"},J={class:"mb-3 row"},q=t("label",{class:"col-sm-4 col-form-label"},"NIUP",-1),Q={class:"col-sm-8"},X={class:"mb-3 row"},Y=t("label",{class:"col-sm-4 col-form-label"},"Nama Lengkap",-1),Z={class:"col-sm-8"},tt={class:"mb-3 row"},at=t("label",{class:"col-sm-4 col-form-label"},"Tanggal Lahir",-1),et={class:"col-sm-8"},st=["value"],lt={class:"mb-3 row"},ot=t("label",{class:"col-sm-4 col-form-label"},"Wilayah",-1),it={class:"col-sm-8"},nt={class:"mb-3 row"},rt=t("label",{class:"col-sm-4 col-form-label"},"Daerah",-1),ct={class:"col-sm-8"},dt={class:"mb-3 row"},mt=t("label",{class:"col-sm-4 col-form-label"},"Kamar",-1),_t={class:"col-sm-8"},pt={class:"mb-3 row"},ht=t("label",{class:"col-sm-4 col-form-label"},"Kecamatan",-1),ut={class:"col-sm-8"},gt=["value"],bt={class:"mb-3 row"},vt=t("label",{class:"col-sm-4 col-form-label"},"Kabupaten",-1),ft={class:"col-sm-8"},yt=["value"],xt={class:"mb-3 row"},kt=t("label",{class:"col-sm-4 col-form-label"},"Provinsi",-1),Dt={class:"col-sm-8"},wt=["value"],Pt={class:"col-md-4 order-sm-1 order-md-2 mb-5 text-end"},Lt=["src"],Nt={class:"modal-footer"},Ut=t("button",{class:"btn btn-primary"},"Lihat Data Rombongan",-1),Vt={__name:"SantriPage",setup(o){const a=U();return V(),k(()=>{a.getData()}),(d,l)=>{const y=D("app-paginate");return c(),m(u,null,[C,S,t("div",I,[t("div",T,[t("small",null,"Total data "+i(e(a).items.length),1)]),t("div",O,[n(t("input",{type:"text","onUpdate:modelValue":[l[0]||(l[0]=s=>e(a).params.cari=s),l[1]||(l[1]=(...s)=>e(a).searchPage&&e(a).searchPage(...s))],class:"form-control form-control-sm mb-2",placeholder:"Cari Santri ..."},null,512),[[r,e(a).params.cari]])])]),K,t("div",j,[t("table",B,[E,t("tbody",null,[(c(!0),m(u,null,w(e(a).items,(s,p)=>(c(),m("tr",{style:{cursor:"pointer"},key:p,onDblclick:Ct=>e(a).handleDoubelClick(s.uuid)},[t("td",null,i(p+1+(e(a).params.page-1)*e(a).params.limit),1),t("td",null,i(s.warga_pesantren.niup),1),t("td",null,i(s.nama_lengkap),1),t("td",null,i(s.jenis_kelamin),1),t("td",null,i(s.domisili_santri.wilayah),1),t("td",null,i(s.domisili_santri.blok),1),t("td",null,i(s.kabupaten),1)],40,F))),128))])])]),e(a).items.length?(c(),v(y,{key:0,meta:e(a).meta,per_page:e(a).params.limit,onSetPage:l[2]||(l[2]=s=>e(a).setPage(s)),onNext:e(a).nexPage,onPrev:e(a).prevPage,onLast:e(a).setPage,onFirst:e(a).setPage},null,8,["meta","per_page","onNext","onPrev","onLast","onFirst"])):g("",!0),e(a).isOpenDetail===!0?(c(),m("div",{key:1,class:P(["modal fade modal-lg",{show:e(a).isOpenDetail}]),style:{display:"block"},id:"modalDetail",tabindex:"-1","aria-labelledby":"modalDetailLabel","aria-hidden":"true"},[t("div",R,[t("div",$,[t("div",z,[A,t("button",{class:"btn-close",type:"button",onClick:l[3]||(l[3]=s=>e(a).isOpenDetail=!1)})]),t("div",M,[W,t("div",G,[t("div",H,[t("div",J,[q,t("div",Q,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[4]||(l[4]=s=>e(a).item.warga_pesantren.niup=s)},null,512),[[r,e(a).item.warga_pesantren.niup]])])]),t("div",X,[Y,t("div",Z,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[5]||(l[5]=s=>e(a).item.nama_lengkap=s)},null,512),[[r,e(a).item.nama_lengkap]])])]),t("div",tt,[at,t("div",et,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.tempat_lahir+", "+e(a).item.tanggal_lahir},null,8,st)])]),t("div",lt,[ot,t("div",it,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[6]||(l[6]=s=>e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].wilayah=s)},null,512),[[r,e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].wilayah]])])]),t("div",nt,[rt,t("div",ct,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[7]||(l[7]=s=>e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].blok=s)},null,512),[[r,e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].blok]])])]),t("div",dt,[mt,t("div",_t,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[8]||(l[8]=s=>e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].kamar=s)},null,512),[[r,e(a).item.domisili_santri[e(a).item.domisili_santri.length-1].kamar]])])]),t("div",pt,[ht,t("div",ut,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.kecamatan},null,8,gt)])]),t("div",bt,[vt,t("div",ft,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.kabupaten},null,8,yt)])]),t("div",xt,[kt,t("div",Dt,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.provinsi},null,8,wt)])])]),t("div",Pt,[t("img",{src:e(a).fotoDiri,alt:"foto-diri",class:"img-thumbnail"},null,8,Lt)])])]),t("div",Nt,[Ut,t("button",{class:"btn btn-secondary",onClick:l[9]||(l[9]=s=>e(a).isOpenDetail=!1)}," Tutup ")])])])],2)):g("",!0)],64)}}},It={__name:"Index",setup(o){return(a,d)=>(c(),v(L,null,{fallback:b(()=>[f(" Loading... ")]),default:b(()=>[N(Vt)]),_:1}))}};export{It as default};
