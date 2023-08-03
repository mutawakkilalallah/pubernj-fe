import{C as S,E as P,I as _,g as C,y as V,a as M,c as p,b as e,j as y,t as i,u as t,k as u,d as h,B as w,F as g,l as f,Q as v,v as N,o as c,n as I,T as $}from"./index-a786a207.js";const A=S("table_armada_detail",{state:()=>({user:localStorage.getItem("user")?P():null,armada:{},items:[],filter:{area:[],dropspot:[]},meta:{},params:{cari:"",armada:"n",area:"",dropspot:"",jenis_kelamin:"",limit:""}}),actions:{async getData(){const d={params:this.params};try{await _.get("penumpang",d).then(a=>{(a.data.code=200)&&(this.items=a.data.data,this.filter.area=a.data.filter.area,this.meta=a.headers)})}catch{}},async getDropspot(){this.params.dropspot="",this.getData();const d={params:{area:this.params.area}};try{await _.get("dropspot",d).then(a=>{(a.data.code=200)&&(this.filter.dropspot=a.data.data)})}catch{}},async getDataDetail(d){try{await _.get(`armada/${d}`).then(a=>{(a.data.code=200)&&(this.armada=a.data.data)})}catch{}}}}),T=S("form_armada_detail",{state:()=>({formAddArmada:{id_penumpang:[]},formDelArmada:{id_penumpang:[]},lastSelectedIndexAddArmada:null,lastSelectedIndexDelArmada:null}),actions:{handleRowClickAddArmada(d){const a=d;if(event.shiftKey&&this.lastSelectedIndexAddArmada!==null){const s=Math.min(d,this.lastSelectedIndexAddArmada),r=Math.max(d,this.lastSelectedIndexAddArmada);if(a===r)for(let l=s+1;l<=r;l++)this.addIdPenumpangAddArmada(l);else if(a===s)for(let l=s;l+1<=r;l++)this.addIdPenumpangAddArmada(l);else for(let l=s;l<=r;l++)this.addIdPenumpangAddArmada(l)}else this.addIdPenumpangAddArmada(d);this.lastSelectedIndexAddArmada=d},handleRowDelArmada(d){const a=d;if(event.shiftKey&&this.lastSelectedIndexDelArmada!==null){const s=Math.min(d,this.lastSelectedIndexDelArmada),r=Math.max(d,this.lastSelectedIndexDelArmada);if(a===r)for(let l=s+1;l<=r;l++)this.addIdPenumpangDelArmada(l);else if(a===s)for(let l=s;l+1<=r;l++)this.addIdPenumpangDelArmada(l);else for(let l=s;l<=r;l++)this.addIdPenumpangDelArmada(l)}else this.addIdPenumpangDelArmada(d);this.lastSelectedIndexDelArmada=d},addIdPenumpangAddArmada(d){const a=A(),s=this.formAddArmada.id_penumpang.indexOf(a.items[d].id);s===-1?this.formAddArmada.id_penumpang.push(a.items[d].id):this.formAddArmada.id_penumpang.splice(s,1)},addIdPenumpangDelArmada(d){const a=A(),s=this.formDelArmada.id_penumpang.indexOf(a.armada.penumpang[d].id);s===-1?this.formDelArmada.id_penumpang.push(a.armada.penumpang[d].id):this.formDelArmada.id_penumpang.splice(s,1)},dragStartAddArmada(d){const a=A();this.formAddArmada.id_penumpang.push(a.items[d].id)},allowDropAddArmada(d){d.preventDefault()},dropAddArmada(d,a){d.preventDefault(),this.hitAddArmada(this.formAddArmada,a),this.formAddArmada.id_penumpang=[]},dragStartDellArmada(d){const a=A();this.formDelArmada.id_penumpang.push(a.armada.penumpang[d].id)},allowDropDelArmada(d){d.preventDefault()},dropDelArmada(d,a){d.preventDefault(),this.hitDelArmada(this.formDelArmada,a),this.formDelArmada.id_penumpang=[]},moveArmadaAdd(d,a){const s=Object.values(d);this.formAddArmada.id_penumpang=s,this.hitAddArmada(this.formAddArmada,a),this.formAddArmada.id_penumpang=[]},moveArmadaDell(d,a){const s=Object.values(d);this.formDelArmada.id_penumpang=s,this.hitDelArmada(this.formDelArmada,a),this.formDelArmada.id_penumpang=[]},async hitAddArmada(d,a){try{await _.put(`penumpang/armada/${a}`,d).then(s=>{const r=A();r.getData(),r.getDataDetail(a)})}catch{}},async hitDelArmada(d,a){try{await _.put("penumpang/armada/delete",d).then(s=>{const r=A();r.getData(),r.getDataDetail(a)})}catch{}}}}),U=e("h3",null,"Pengelolaan Data Penumpang",-1),j=e("hr",null,null,-1),B={class:"row"},K={class:"col-md-6"},L={class:"row"},R={class:"col-md-2"},z={class:"col-md-8"},E=e("hr",null,null,-1),F={class:"mb-1"},O=e("b",null,"Dropspot : ",-1),H=e("p",{class:"mb-1"},[e("b",null,"Pendamping : "),u("-")],-1),J=e("p",{class:"mb-1"},[e("b",null,"No. HP : "),u("-")],-1),Q=e("hr",null,null,-1),W={class:"mb-1"},q=e("b",null,"Jumlah Penumpang : ",-1),G=e("hr",null,null,-1),X={class:"row"},Y={class:"col"},Z={class:"badge bg-success"},aa={class:"col text-center"},ea={class:"table-responsive"},ta=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"No"),e("th",{scope:"col"},"Nama"),e("th",{scope:"col"},"Dropspot")])],-1),sa=["onDragstart","onClick"],da={class:"col-md-6"},oa={class:"filter-box mb-5 row"},na={class:"col-md-4"},la=e("option",{value:"",selected:""},"Semua Area",-1),ra=["value"],ia=["disabled"],ma=e("option",{value:"",selected:""},"Semua Dropsot",-1),pa=["value"],ca={class:"col-md-4"},ua=e("option",{value:"",selected:""},"Semua Jenis Kelamin",-1),ha=e("option",{value:"L",selected:""},"Laki-laki",-1),Aa=e("option",{value:"P",selected:""},"Perempuan",-1),ga=[ua,ha,Aa],_a=$('<option value="" selected>Limit by Kapasitas</option><option value="60" selected>BUS (60)</option><option value="34" selected>Mini Bus (34)</option><option value="18" selected>ELF (18)</option><option value="13" selected>HIACE (13)</option><option value="7" selected>MPV (8)</option>',6),Da=[_a],fa={class:"serach-box row"},va={class:"col-md-8 d-flex align-items-center mb-2"},ba={class:"col-md-4 d-flex align-items-center"},xa=e("hr",null,null,-1),ya={class:"row"},wa={class:"col"},Ia={class:"badge bg-success"},Sa={class:"col text-center"},ka={class:"table-responsive"},Pa=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"No"),e("th",{scope:"col"},"Nama"),e("th",{scope:"col"},"Wilayah")])],-1),Ca=["onDragstart","onClick"],Ma={__name:"DetailPage",setup(d){const a=A(),s=T(),r=C(),l=D=>s.formAddArmada.id_penumpang.includes(a.items[D].id),k=D=>s.formDelArmada.id_penumpang.includes(a.armada.penumpang[D].id);return V(()=>{a.getData(),a.getDataDetail(r.params.id)}),(D,n)=>{const b=M("font-awesome-icon");return c(),p(g,null,[U,j,e("div",B,[e("div",K,[e("div",L,[e("div",R,[y(b,{icon:"bus",class:"icon",style:{"font-size":"100px"}})]),e("div",z,[e("h3",null,i(t(a).armada.nama),1),E,e("p",F,[O,u(i(t(a).armada.dropspot?t(a).armada.dropspot.nama:"-"),1)]),H,J,Q,e("p",W,[q,u(i(t(a).armada.penumpang?t(a).armada.penumpang.length:0),1)])])]),G,e("div",X,[e("div",Y,[u(" Total "),e("p",Z,i(t(s).formDelArmada.id_penumpang.length),1),u(" item dipilih ")]),h(e("div",aa,[y(b,{icon:"arrow-right",class:"icon badge bg-primary p-2",style:{cursor:"pointer","font-size":"medium"},onClick:n[0]||(n[0]=o=>t(s).moveArmadaDell(t(s).formDelArmada.id_penumpang,t(r).params.id))})],512),[[w,t(s).formDelArmada.id_penumpang?t(s).formDelArmada.id_penumpang.length>0:""]])]),e("div",ea,[e("table",{class:"table table-sm table-hover mt-3",onDragover:n[1]||(n[1]=(...o)=>t(s).allowDropAddArmada&&t(s).allowDropAddArmada(...o)),onDrop:n[2]||(n[2]=o=>t(s).dropAddArmada(o,t(r).params.id))},[ta,e("tbody",null,[(c(!0),p(g,null,f(t(a).armada.penumpang,(o,m)=>(c(),p("tr",{key:m,draggable:"true",onDragstart:x=>t(s).dragStartDellArmada(m),onClick:x=>t(s).handleRowDelArmada(m),class:I({"table-active":k(m)})},[e("td",null,i(m+1),1),e("td",null,i(o.santri.nama_lengkap),1),e("td",null,i(o.dropspot?o.dropspot.nama:"-"),1)],42,sa))),128))])],32)])]),e("div",da,[e("div",oa,[e("div",na,[h(e("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[3]||(n[3]=o=>t(a).params.area=o),onChange:n[4]||(n[4]=(...o)=>t(a).getDropspot&&t(a).getDropspot(...o))},[la,(c(!0),p(g,null,f(t(a).filter.area,o=>(c(),p("option",{key:o,value:o.id},i(o.nama),9,ra))),128))],544),[[v,t(a).params.area]]),h(e("select",{class:"form-select form-select-sm mb-2",disabled:t(a).params.area==="","onUpdate:modelValue":n[5]||(n[5]=o=>t(a).params.dropspot=o),onChange:n[6]||(n[6]=(...o)=>t(a).getData&&t(a).getData(...o))},[ma,(c(!0),p(g,null,f(t(a).filter.dropspot,o=>(c(),p("option",{key:o,value:o.id},i(o.nama),9,pa))),128))],40,ia),[[v,t(a).params.dropspot]])]),e("div",ca,[h(e("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[7]||(n[7]=o=>t(a).params.jenis_kelamin=o),onChange:n[8]||(n[8]=(...o)=>t(a).getData&&t(a).getData(...o))},ga,544),[[v,t(a).params.jenis_kelamin]]),h(e("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[9]||(n[9]=o=>t(a).params.limit=o),onChange:n[10]||(n[10]=(...o)=>t(a).getData&&t(a).getData(...o))},Da,544),[[v,t(a).params.limit]])])]),e("div",fa,[e("div",va,[e("small",null,"Total data "+i(t(a).meta.x_total_data),1)]),e("div",ba,[h(e("input",{type:"text","onUpdate:modelValue":n[11]||(n[11]=o=>t(a).params.cari=o),class:"form-control form-control-sm mb-2",placeholder:"Cari Santri ...",onKeyup:n[12]||(n[12]=(...o)=>t(a).getData&&t(a).getData(...o))},null,544),[[N,t(a).params.cari]])])]),xa,e("div",ya,[e("div",wa,[u(" Total "),e("p",Ia,i(t(s).formAddArmada.id_penumpang.length),1),u(" item dipilih ")]),h(e("div",Sa,[y(b,{icon:"arrow-left",class:"icon badge bg-primary p-2",style:{cursor:"pointer","font-size":"medium"},onClick:n[13]||(n[13]=o=>t(s).moveArmadaAdd(t(s).formAddArmada.id_penumpang,t(r).params.id))})],512),[[w,t(s).formAddArmada.id_penumpang?t(s).formAddArmada.id_penumpang.length>0:""]])]),e("div",ka,[e("table",{class:"table table-sm table-hover mt-3",onDragover:n[14]||(n[14]=(...o)=>t(s).allowDropDelArmada&&t(s).allowDropDelArmada(...o)),onDrop:n[15]||(n[15]=o=>t(s).dropDelArmada(o,t(r).params.id))},[Pa,e("tbody",null,[(c(!0),p(g,null,f(t(a).items,(o,m)=>(c(),p("tr",{key:m,draggable:"true",onDragstart:x=>t(s).dragStartAddArmada(m),onClick:x=>t(s).handleRowClickAddArmada(m),class:I({"table-active":l(m)})},[e("td",null,i(m+1),1),e("td",null,i(o.santri.nama_lengkap),1),e("td",null,i(o.santri.wilayah),1)],42,Ca))),128))])],32)])])])],64)}}};export{Ma as default};
