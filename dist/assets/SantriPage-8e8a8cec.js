import{x as D,C as m,a as u,g as r,c as d,b as t,d as n,E as p,u as e,F as _,q as h,t as i,v as c,e as x,z as v,n as P,k as y,m as S,l as C}from"./index-ed1e1048.js";const L=D("table_santri",{state:()=>({isOpenDetail:!1,items:[],item:{},fotoDiri:"",meta:{},myPage:"",filter:{wilayah:[],blok:[]},params:{cari:"",wilayah:"",blok:"",status_kepulangan:"",jenis_kelamin:"",page:1,limit:25}}),actions:{nexPage(o){this.params.page=parseInt(o)+1,this.getData()},prevPage(o){this.params.page=parseInt(o)-1,this.getData()},setPage(o){this.params.page=parseInt(o),this.getData()},searchPage(){this.params.page=1,this.getData()},async getData(){const o={params:this.params};try{await m.get("santri",o).then(a=>{(a.data.code=200)&&(this.items=a.data.data,this.meta=a.headers)})}catch{}},async handleDoubelClick(o){try{this.isOpenDetail=!0,await m.get("santri/"+o).then(a=>{(a.data.code=200)&&(this.item=a.data.data,this.getImage(a.data.data.niup,"medium"))})}catch{}},async getImage(o){try{const a={responseType:"blob"};await m.get("santri/image/"+o,a).then(b=>{this.fotoDiri=URL.createObjectURL(b.data)})}catch{}},async getWilayah(){try{await m.get("santri/filter/wilayah").then(o=>{(o.data.code=200)&&(this.filter.wilayah=o.data)})}catch{}},async getBlok(){this.params.blok="",this.getData();try{await m.get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`).then(o=>{(o.data.code=200)&&(this.filter.blok=o.data)})}catch{}}}}),U=t("h3",{class:"titlePage"},"Data Santri",-1),V=t("hr",null,null,-1),N={class:"filter-box mb-5 row"},K={class:"col-md-2"},B=t("option",{value:"",selected:""},"Semua Wilayah",-1),T=["value"],I=["disabled"],O=t("option",{value:"",selected:""},"Semua Daerah",-1),R=["value"],j={class:"col-md-2"},W=t("option",{value:"",selected:""},"Semua Status Kepulangan",-1),E=t("option",{value:"rombongan"},"Rombongan",-1),F=t("option",{value:"non-rombongan"},"Non Rombongan",-1),$=[W,E,F],z=t("option",{value:"",selected:""},"Semua Jenis Kelamin",-1),A=t("option",{value:"L"},"Laki-Laki",-1),J=t("option",{value:"P"},"Perempuan",-1),M=[z,A,J],q={class:"serach-box row"},G={class:"col-md-10 d-flex align-items-center mb-2"},H={class:"col-md-2 d-flex align-items-center"},Q=t("hr",null,null,-1),X={class:"table-responsive"},Y={class:"table table-sm table-hover mt-3"},Z=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"No"),t("th",{scope:"col"},"NIUP"),t("th",{scope:"col"},"Nama Lengkap"),t("th",{scope:"col"},"JK"),t("th",{scope:"col"},"Wilayah"),t("th",{scope:"col"},"Daerah"),t("th",{scope:"col"},"Kab/Kota"),t("th",{scope:"col"},"Status Kepulangan")])],-1),tt=["onDblclick"],at={class:"text-capitalize"},et={class:"modal-dialog"},st={class:"modal-content"},lt={class:"modal-header"},ot=t("h1",{class:"modal-title fs-5",id:"modalDetailLabel"}," Detail Santri ",-1),it={class:"modal-body"},nt={class:"alert alert-secondary p-1 fs-6",role:"alert"},rt={class:"row"},dt={class:"col-md-8 order-sm-2 order-md-2"},ct={class:"mb-3 row"},mt=t("label",{class:"col-sm-4 col-form-label"},"NIUP",-1),pt={class:"col-sm-8"},_t={class:"mb-3 row"},ut=t("label",{class:"col-sm-4 col-form-label"},"Nama Lengkap",-1),ht={class:"col-sm-8"},bt={class:"mb-3 row"},gt=t("label",{class:"col-sm-4 col-form-label"},"Tanggal Lahir",-1),vt={class:"col-sm-8"},yt=["value"],ft={class:"mb-3 row"},kt=t("label",{class:"col-sm-4 col-form-label"},"Wilayah",-1),wt={class:"col-sm-8"},Dt={class:"mb-3 row"},xt=t("label",{class:"col-sm-4 col-form-label"},"Daerah",-1),Pt={class:"col-sm-8"},St={class:"mb-3 row"},Ct=t("label",{class:"col-sm-4 col-form-label"},"Kamar",-1),Lt={class:"col-sm-8"},Ut={class:"mb-3 row"},Vt=t("label",{class:"col-sm-4 col-form-label"},"Kecamatan",-1),Nt={class:"col-sm-8"},Kt=["value"],Bt={class:"mb-3 row"},Tt=t("label",{class:"col-sm-4 col-form-label"},"Kabupaten",-1),It={class:"col-sm-8"},Ot=["value"],Rt={class:"mb-3 row"},jt=t("label",{class:"col-sm-4 col-form-label"},"Provinsi",-1),Wt={class:"col-sm-8"},Et=["value"],Ft={class:"col-md-4 order-sm-1 order-md-2 mb-5 text-end"},$t=["src"],zt={class:"modal-footer"},At=t("button",{class:"btn btn-primary"},"Lihat Data Rombongan",-1),qt={__name:"SantriPage",setup(o){const a=L();return a.getData(),a.getWilayah(),(b,l)=>{const f=u("app-paginate"),k=u("font-awesome-icon"),w=u("router-link");return r(),d(_,null,[U,V,t("div",N,[t("div",K,[n(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":l[0]||(l[0]=s=>e(a).params.wilayah=s),onChange:l[1]||(l[1]=(...s)=>e(a).getBlok&&e(a).getBlok(...s))},[B,(r(!0),d(_,null,h(e(a).filter.wilayah,s=>(r(),d("option",{key:s,value:s.alias_wilayah},i(s.wilayah),9,T))),128))],544),[[p,e(a).params.wilayah]]),n(t("select",{class:"form-select form-select-sm mb-2",disabled:e(a).params.wilayah==="","onUpdate:modelValue":l[2]||(l[2]=s=>e(a).params.blok=s),onChange:l[3]||(l[3]=(...s)=>e(a).getData&&e(a).getData(...s))},[O,(r(!0),d(_,null,h(e(a).filter.blok,s=>(r(),d("option",{key:s,value:s.id_blok},i(s.blok),9,R))),128))],40,I),[[p,e(a).params.blok]])]),t("div",j,[n(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":l[4]||(l[4]=s=>e(a).params.status_kepulangan=s),onChange:l[5]||(l[5]=(...s)=>e(a).getData&&e(a).getData(...s))},$,544),[[p,e(a).params.status_kepulangan]]),n(t("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":l[6]||(l[6]=s=>e(a).params.jenis_kelamin=s),onChange:l[7]||(l[7]=(...s)=>e(a).getData&&e(a).getData(...s))},M,544),[[p,e(a).params.jenis_kelamin]])]),t("div",q,[t("div",G,[t("small",null,"Total data "+i(e(a).meta.x_total_data),1)]),t("div",H,[n(t("input",{type:"text","onUpdate:modelValue":[l[8]||(l[8]=s=>e(a).params.cari=s),l[9]||(l[9]=(...s)=>e(a).searchPage&&e(a).searchPage(...s))],class:"form-control form-control-sm mb-2",placeholder:"Cari Santri ..."},null,512),[[c,e(a).params.cari]])])]),Q,t("div",X,[t("table",Y,[Z,t("tbody",null,[(r(!0),d(_,null,h(e(a).items,(s,g)=>(r(),d("tr",{style:{cursor:"pointer"},key:g,onDblclick:Jt=>e(a).handleDoubelClick(s.uuid)},[t("td",null,i(g+1+(e(a).params.page-1)*e(a).params.limit),1),t("td",null,i(s.niup),1),t("td",null,i(s.nama_lengkap),1),t("td",null,i(s.jenis_kelamin),1),t("td",null,i(s.wilayah?s.wilayah:"-"),1),t("td",null,i(s.blok?s.blok:"-"),1),t("td",null,i(s.kabupaten),1),t("td",at,[t("i",null,i(s.status_kepulangan),1)])],40,tt))),128))])])]),e(a).meta.x_total_data?(r(),x(f,{key:0,meta:e(a).meta,per_page:e(a).params.limit,onSetPage:l[10]||(l[10]=s=>e(a).setPage(s)),onNext:e(a).nexPage,onPrev:e(a).prevPage,onLast:e(a).setPage,onFirst:e(a).setPage},null,8,["meta","per_page","onNext","onPrev","onLast","onFirst"])):v("",!0),e(a).isOpenDetail===!0?(r(),d("div",{key:1,class:P(["modal fade modal-lg",{show:e(a).isOpenDetail}]),style:{display:"block"},id:"modalDetail",tabindex:"-1","aria-labelledby":"modalDetailLabel","aria-hidden":"true"},[t("div",et,[t("div",st,[t("div",lt,[ot,t("button",{class:"btn-close",type:"button",onClick:l[11]||(l[11]=s=>e(a).isOpenDetail=!1)})]),t("div",it,[t("p",nt,[t("i",null,[y(k,{icon:"bell",class:"icon"}),S(" Data santri hanya bersifat temporary sebagai kebutuhan Pulang Bersama, untuk data lebih detail silahkan lihat di Aplikasi PEDATREN")])]),t("div",rt,[t("div",dt,[t("div",ct,[mt,t("div",pt,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[12]||(l[12]=s=>e(a).item.niup=s)},null,512),[[c,e(a).item.niup]])])]),t("div",_t,[ut,t("div",ht,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[13]||(l[13]=s=>e(a).item.nama_lengkap=s)},null,512),[[c,e(a).item.nama_lengkap]])])]),t("div",bt,[gt,t("div",vt,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.raw.tempat_lahir+", "+e(a).item.raw.tanggal_lahir},null,8,yt)])]),t("div",ft,[kt,t("div",wt,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[14]||(l[14]=s=>e(a).item.wilayah=s)},null,512),[[c,e(a).item.wilayah]])])]),t("div",Dt,[xt,t("div",Pt,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[15]||(l[15]=s=>e(a).item.blok=s)},null,512),[[c,e(a).item.blok]])])]),t("div",St,[Ct,t("div",Lt,[n(t("input",{type:"text",readonly:"",class:"form-control-plaintext","onUpdate:modelValue":l[16]||(l[16]=s=>e(a).item.raw.domisili_santri[e(a).item.raw.domisili_santri.length-1].kamar=s)},null,512),[[c,e(a).item.raw.domisili_santri[e(a).item.raw.domisili_santri.length-1].kamar]])])]),t("div",Ut,[Vt,t("div",Nt,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.kecamatan},null,8,Kt)])]),t("div",Bt,[Tt,t("div",It,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.kabupaten},null,8,Ot)])]),t("div",Rt,[jt,t("div",Wt,[t("input",{type:"text",readonly:"",class:"form-control-plaintext",value:e(a).item.provinsi},null,8,Et)])])]),t("div",Ft,[t("img",{src:e(a).fotoDiri,alt:"foto-diri",class:"img-thumbnail"},null,8,$t)])])]),t("div",zt,[y(w,{to:{name:"penumpang-detail",params:{uuid:e(a).item.uuid}}},{default:C(()=>[At]),_:1},8,["to"]),t("button",{class:"btn btn-secondary",onClick:l[17]||(l[17]=s=>e(a).isOpenDetail=!1)}," Tutup ")])])])],2)):v("",!0)])],64)}}};export{qt as default};