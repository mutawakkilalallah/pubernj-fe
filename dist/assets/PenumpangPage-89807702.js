import{x as L,C as c,i as j,S as U,a as I,g as r,c as d,b as a,u as t,l as P,q as F,d as u,y as V,E as b,F as h,s as _,t as l,z as m,v as C,w as y,n as f,e as B,f as M,G as S}from"./index-11b2317a.js";import{u as O,F as K,w as N}from"./FileSaver.min-6d1b1dab.js";import{u as z}from"./index-758c07bc.js";const v=L("table_penumpang",{state:()=>({items:[],meta:{},myPage:"",filter:{area:[],dropspot:[],wilayah:[],blok:[],armada:[]},params:{cari:"",dropspot:"",area:"",wilayah:"",blok:"",pembayaran:"",jenis_kelamin:"",armada:"",page:1,limit:25},params2:{limit:""},itemsExport:[],btnDisable:!0}),actions:{nexPage(i){this.params.page=parseInt(i)+1,this.getData()},prevPage(i){this.params.page=parseInt(i)-1,this.getData()},setPage(i){this.params.page=parseInt(i),this.getData()},searchPage(){this.params.page=1,this.getData()},async getData(){const i={params:this.params};try{await c.get("penumpang",i).then(o=>{(o.data.code=200)&&(this.totalData=o.headers.x_total_data,this.items=o.data.data,this.meta=o.headers,this.filter.area=o.data.filter.area,this.params2.limit=o.headers.x_total_data,this.getDataExport())})}catch{}},async unduhTemplate(){try{await c.get("penumpang/unduh-template",{responseType:"blob"}).then(i=>{const o=new Blob([i.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),e=window.URL.createObjectURL(o),p=document.createElement("a");p.href=e,p.setAttribute("download","template_puber.xlsx"),document.body.appendChild(p),p.click(),p.remove()})}catch{}},async getDataExport(){const i={params:this.params2};try{await c.get("penumpang",i).then(o=>{(o.data.code=200)&&(this.itemsExport=o.data.data)})}catch{}},exportExel(){if(this.itemsExport.length>0){const i=this.tanggal(),o=this.formatJson(this.itemsExport),e=O.json_to_sheet(o),p=O.book_new();O.book_append_sheet(p,e,"Data");const x=this.writeExcelBuffer(p);this.saveExcelFile(x,`Data Penumpang ${i}.xlsx`)}else this.btnDisable=!1},saveExcelFile(i,o){const e=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});K.saveAs(e,o)},writeExcelBuffer(i){return N(i,{bookType:"xlsx",type:"array"})},formatJson(i){const o=[];return i.forEach(e=>{const p={niup:"",nama:"",kecamatan:"",kabupaten:"",provinsi:"",daerah:"",wilayah:"",lembaga:"",status_kepulangan:"",dropspot:"",armada:"",area:"",tarif:"",status_pembayaran:""};p.niup=e.santri.niup,p.nama=e.santri.nama_lengkap,p.kecamatan=e.santri.kecamatan,p.kabupaten=e.santri.kabupaten,p.provinsi=e.santri.provinsi,p.daerah=e.santri.blok,p.wilayah=e.santri.wilayah,p.lembaga="",p.status_kepulangan=e.santri.status_kepulangan,p.dropspot=e.dropspot.nama,p.armada="",p.area=e.dropspot.area.nama,p.tarif=e.dropspot.harga,p.status_pembayaran=e.status_bayar,o.push(p)}),o},tanggal(){const i=new Date,o=i.getDate(),e=i.getMonth()+1,p=i.getFullYear();return(o<=9?"0"+o:o)+"-"+(e<=9?"0"+e:e)+"-"+p},async getDropspot(){this.params.dropspot="",this.getData();const i={params:{area:this.params.area}};try{await c.get("dropspot",i).then(o=>{(o.data.code=200)&&(this.filter.dropspot=o.data.data)})}catch{}},async getWilayah(){try{await c.get("santri/filter/wilayah").then(i=>{(i.data.code=200)&&(this.filter.wilayah=i.data)})}catch{}},async getBlok(){this.params.blok="",this.getData();try{await c.get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`).then(i=>{(i.data.code=200)&&(this.filter.blok=i.data)})}catch{}},async getArmada(){try{await c.get("armada").then(i=>{(i.data.code=200)&&(this.filter.armada=i.data.data)})}catch{}}}}),$=L("form_penumpang",{state:()=>({contextMenuVisible:!1,contextMenuPosition:{x:0,y:0},isOpenEditDropspot:!1,isOpenEditPembayaran:!1,isOpenImportPembayaran:!1,isArea:[],isDropspot:[],idEdit:"",idDelete:"",idArea:"",dataEdit:{},formImportPembayaran:{excelFile:null},formEditDropspot:{dropspot_id:""},formEditPembayaran:{jumlah_bayar:"",status_bayar:""},isOpen:!1,edited:!1,editedDrop:!1,person:{},fotoDiri:""}),actions:{setOpen(){this.isOpen=!this.isOpen},showContextMenu(i,o){i.preventDefault(),this.dataEdit=o,this.idEdit=o.id,this.contextMenuPosition={x:i.pageX,y:i.pageY},this.contextMenuVisible=!0,document.addEventListener("click",this.handleOutsideClick)},handleOutsideClick(i){this.contextMenuVisible=!1,document.removeEventListener("click",this.handleOutsideClick)},resetFormEditDropspot(){this.formEditDropspot.dropspot_id=""},resetFormEditPembayaran(){this.formEditPembayaran.jumlah_bayar="",this.formEditPembayaran.status_bayar=""},resetFormImportPembayaran(){this.formImportPembayaran.excelFile=null},setOpenEditDropspot(){this.isOpenEditDropspot=!this.isOpenEditDropspot,this.resetFormEditDropspot()},setOpenImportPembayaran(){this.isOpenImportPembayaran=!this.isOpenImportPembayaran,this.resetFormImportPembayaran()},setOpenEditPembayaran(){this.isOpenEditPembayaran=!this.isOpenEditPembayaran,this.resetFormEditPembayaran()},handleOpenEditDropspot(){this.idArea=this.dataEdit.dropspot.area_id,this.getArea(),this.getDropspot(),this.formEditDropspot.dropspot_id=this.dataEdit.dropspot_id,this.isOpenEditDropspot=!0},handleOpenEditPembayaran(){this.formEditPembayaran.status_bayar=this.dataEdit.status_bayar,this.formEditPembayaran.jumlah_bayar=this.dataEdit.jumlah_bayar,this.isOpenEditPembayaran=!0},goToDetail(){j.push(`penumpang/${this.dataEdit.santri_uuid}/detail`)},goToDetailClick(i){this.idEdit=i.id,this.isOpen=!0,this.dataEdit=i,this.getDataDetail(i.santri_uuid),this.getImage(i.santri.niup)},setClickEdirPembayaran(){this.edited=!this.edited,this.formEditPembayaran.status_bayar=this.dataEdit.status_bayar,this.formEditPembayaran.jumlah_bayar=this.dataEdit.jumlah_bayar},setClickEditDrop(){this.editedDrop=!this.editedDrop,this.idArea=this.dataEdit.dropspot.area_id,this.getArea(),this.getDropspot(),this.formEditDropspot.dropspot_id=this.dataEdit.dropspot_id},handleFileChange(i){this.formImportPembayaran.excelFile=i.target.files[0]},getArea(){try{c.get("area").then(i=>{this.isArea=i.data.data})}catch{}},async getDropspot(){this.formEditDropspot.dropspot_id="";const i={params:{area:this.idArea}};try{await c.get("dropspot",i).then(o=>{this.isDropspot=o.data.data})}catch{}},async getDataDetail(i){try{await c.get(`penumpang/${i}`).then(o=>{(o.data.code=200)&&(this.person=o.data.data,this.getImage(o.data.data.santri.niup,"medium"))})}catch{}},async getImage(i){try{const o={responseType:"blob"};await c.get("santri/image/"+i,o).then(e=>{this.fotoDiri=URL.createObjectURL(e.data)})}catch(o){console.log("error",o)}},async editDropspot(){try{await c.put(`penumpang/dropspot/${this.idEdit}`,this.formEditDropspot).then(i=>{this.isOpenEditDropspot=!1,this.resetFormEditDropspot(),v().getData(),this.editedDrop=!1,this.isOpen=!1})}catch{}},async importPembayaran(){try{const i=new FormData;i.append("excelFile",this.formImportPembayaran.excelFile),await c.post("penumpang/import-pembayaran",i).then(o=>{this.isOpenImportPembayaran=!1,this.resetFormImportPembayaran(),v().getData()})}catch{}},async editPembayaran(){try{await c.put(`penumpang/pembayaran/${this.idEdit}`,this.formEditPembayaran).then(i=>{this.isOpenEditPembayaran=!1,this.dataEdit.jumlah_bayar=this.formEditPembayaran.jumlah_bayar,this.dataEdit.status_bayar=this.formEditPembayaran.status_bayar,this.resetFormEditPembayaran(),v().getData(),this.edited=!1})}catch{}},async deleteRombongan(){this.isOpen=!1,U.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin mengeluarkan dari rombongan ?",icon:"info",showCancelButton:!0,confirmButtonText:"keluarkan",confirmButtonColor:"#DC3545"}).then(i=>{i.isConfirmed&&c.delete(`penumpang/${this.dataEdit.santri_uuid}`).then(o=>{this.isOpenEdit=!1,v().getData()})})}}});const R={class:"row"},J=a("div",{class:"col-md-8 text-start"},[a("h3",{class:"titlePage"},"Data Penumpang")],-1),W={class:"col-md-4 text-end g-2"},H=a("hr",null,null,-1),Y={class:"filter-box mb-5 row"},q={key:0,class:"col-md-2"},G=a("option",{value:"",selected:""},"Semua Wilayah",-1),X=["value"],Q=["disabled"],Z=a("option",{value:"",selected:""},"Semua Daerah",-1),tt=["value"],at={key:1,class:"col-md-2"},et=a("option",{value:"",selected:""},"Semua Area",-1),st=["value"],ot=["disabled"],nt=a("option",{value:"",selected:""},"Semua Dropsot",-1),it=["value"],rt={class:"col-md-2"},lt=S('<option value="" selected>Semua Status Pembayaran</option><option value="belum-lunas">Belum Lunas</option><option value="lunas">Lunas</option><option value="kurang">Kurang</option><option value="lebih">Lebih</option>',5),dt=[lt],pt=a("option",{value:"",selected:""},"Semua Jenis Kelamin",-1),mt=a("option",{value:"L"},"Laki-Laki",-1),ut=a("option",{value:"P"},"Perempuan",-1),ct=[pt,mt,ut],bt={key:2,class:"col-md-2"},ht=a("option",{value:"",selected:""},"Semua Armada",-1),_t=["value"],yt={class:"serach-box row"},gt={class:"col-md-10 d-flex align-items-center mb-2"},ft={class:"col-md-2 d-flex align-items-center"},vt=a("hr",null,null,-1),kt={class:"table-responsive"},Et={class:"table table-sm table-hover mt-3"},Dt=a("thead",null,[a("tr",null,[a("th",{scope:"col"},"No"),a("th",{scope:"col"},"NIUP"),a("th",{scope:"col"},"Nama Santri"),a("th",{scope:"col"},"Dropsot"),a("th",{scope:"col"},"Area"),a("th",{scope:"col"},"Tarif"),a("th",{scope:"col"},"Jumlah Bayar"),a("th",{scope:"col"},"Status Pembayaran"),a("th",{scope:"col"},"Wilayah"),a("th",{scope:"col"},"Daerah"),a("th",{scope:"col"},"Kecamatan"),a("th",{scope:"col"},"Kabupaten"),a("th",{scope:"col"},"Provinsi")])],-1),Pt=["onDblclick","onContextmenu","onClick"],xt={key:0},wt={key:1,class:"text-danger"},Ct=a("i",null,"belum-ditentukan",-1),Ot=[Ct],St={key:2},At={key:3,class:"text-danger"},It=a("i",null,"belum-ditentukan",-1),Ft=[It],Lt={key:4},Tt={key:5,class:"text-danger"},jt={key:0,class:"badge bg-danger text-capitalize"},Ut={key:1,class:"badge bg-success text-capitalize"},Vt={key:2,class:"badge bg-warning text-capitalize"},Bt={key:3,class:"badge bg-info text-capitalize"},Mt={key:0},Kt={class:"list-group list-group-flush"},Nt={class:"modal-dialog"},zt={class:"modal-content"},$t={class:"modal-header"},Rt=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Dropsot",-1),Jt={class:"modal-body"},Wt={class:"form-group mb-3"},Ht=a("small",null,"Area",-1),Yt=a("option",{value:"",selected:""},"Pilih Area",-1),qt=["value"],Gt={class:"form-group mb-3"},Xt=a("small",null,"Dropspot",-1),Qt=["disabled"],Zt={key:0,value:"",selected:""},ta=["value"],aa={class:"modal-footer"},ea=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),sa={class:"modal-dialog"},oa={class:"modal-content"},na={class:"modal-header"},ia=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Pembayaran",-1),ra={class:"modal-body"},la={class:"form-group mb-3"},da=a("small",null,"Jumlah Pembayaran",-1),pa={class:"form-group mb-3"},ma=a("small",null,"Status Pembayaran",-1),ua=S('<option value="" selected>Pilih Status</option><option value="lunas" selected>Lunas</option><option value="belum-lunas" selected>Belum Lunas</option><option value="lebih" selected>Lebih</option><option value="kurang" selected>Kurang</option>',5),ca=[ua],ba={class:"modal-footer"},ha=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),_a={class:"modal-dialog"},ya={class:"modal-content"},ga={class:"modal-header"},fa=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"}," Import Pembayaran ",-1),va={class:"modal-body"},ka={class:"form-group mb-3"},Ea=a("small",null,"File Excel (.xlsx only)",-1),Da={class:"modal-footer"},Pa=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Proses",-1),xa={class:"modal-dialog modal-fullscreen p-4"},wa={class:"modal-content"},Ca={class:"modal-header"},Oa=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Detail Data Penumpang",-1),Sa={class:"modal-body"},Aa={class:"row"},Ia={class:"col-md-3"},Fa=["src"],La={class:"col-md-2"},Ta=a("b",null,"NIUP",-1),ja=a("b",null,"Nama",-1),Ua=a("b",null,"Jenis Kelamin",-1),Va=a("b",null,"Tetala",-1),Ba=a("b",null,"Umur",-1),Ma={class:"col-md-2"},Ka=a("b",null,"Wilayah",-1),Na=a("b",null,"Daerah",-1),za=a("b",null,"Kamar",-1),$a=a("b",null,"Lembaga",-1),Ra=a("b",null,"Jurusan",-1),Ja={class:"col-md-5"},Wa=a("b",null,"Provinsi",-1),Ha=a("b",null,"Kabupaten",-1),Ya=a("b",null,"Kecamatan",-1),qa=a("b",null,"Kode Pos",-1),Ga=a("b",null,"Jalan",-1),Xa=a("hr",null,null,-1),Qa={class:"row"},Za={class:"col-md-4"},te={class:"card"},ae={class:"card-header bg-primary text-white"},ee=a("div",{class:"float-start"},"Tujuan",-1),se={class:"card-body"},oe={key:0},ne=a("p",{class:"card-title mb-0"},"Dropspot :",-1),ie={class:"card-text"},re=a("p",{class:"card-title mb-0 mt-3"},"Daerah :",-1),le={class:"card-text"},de=a("p",{class:"card-title mb-0 mt-3"},"PIC :",-1),pe={class:"card-text mb-0"},me=a("br",null,null,-1),ue={class:"card-text"},ce={key:1},be={class:"modal-body"},he={class:"form-group mb-3"},_e=a("small",null,"Area",-1),ye=a("option",{value:"",selected:""},"Pilih Area",-1),ge=["value"],fe={class:"form-group mb-3"},ve=a("small",null,"Dropspot",-1),ke=["disabled"],Ee={key:0,value:"",selected:""},De=["value"],Pe={class:"modal-footer"},xe=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),we={class:"col-md-4"},Ce={class:"card"},Oe={class:"card-header bg-primary text-white"},Se=a("div",{class:"float-start"},"Pembayaran",-1),Ae={class:"card-body"},Ie={key:0},Fe=a("p",{class:"card-title mb-0"},"Tarif :",-1),Le={class:"card-text"},Te=a("p",{class:"card-title mb-0 mt-3"},"Jumlah Pembayaran :",-1),je={class:"card-text"},Ue=a("p",{class:"card-title mb-0 mt-3"},"Status Pembayaran :",-1),Ve={key:0,class:"badge bg-danger"},Be={key:1,class:"badge bg-success text-capitalize"},Me={key:2,class:"badge bg-warning text-capitalize"},Ke={key:3,class:"badge bg-info text-capitalize"},Ne={key:1},ze={class:"modal-body"},$e={class:"form-group mb-3"},Re=a("small",null,"Jumlah Pembayaran",-1),Je={class:"form-group mb-3"},We=a("small",null,"Status Pembayaran",-1),He=S('<option value="" selected>Pilih Status</option><option value="lunas" selected>Lunas</option><option value="belum-lunas" selected>Belum Lunas</option><option value="lebih" selected>Lebih</option><option value="kurang" selected>Kurang</option>',5),Ye=[He],qe={class:"modal-footer"},Ge=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),Xe={class:"col-md-4"},Qe={class:"card"},Ze=a("div",{class:"card-header bg-primary text-white"}," Armada ",-1),ts={class:"card-body"},as=a("p",{class:"card-title mb-0"},"BUS :",-1),es={class:"card-text"},ss=a("p",{class:"card-title mb-0 mt-3"},"Pendamping :",-1),os={class:"card-text"},ns=a("p",{class:"card-title mb-0 mt-3"},"No. HP :",-1),is={class:"card-text"},rs={class:"modal-footer"},ms={__name:"PenumpangPage",setup(i){const o=v(),e=$(),p=z();o.getData(),p.user.role!="p4nj"&&o.getWilayah(),o.getArmada();function x(){o.exportExel()}const k=E=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(E),T=E=>{const n=[];return n.push(E),n.filter(w=>w===e.idEdit)[0]};return(E,n)=>{const g=I("font-awesome-icon"),w=I("app-paginate");return r(),d(h,null,[a("div",R,[J,a("div",W,[a("button",{class:"btn btn-sm btn-outline-info me-2",type:"button",onClick:n[0]||(n[0]=s=>t(e).setOpenImportPembayaran())},[P(g,{icon:"file-import",class:"icon"}),F(" Import Pembayaran ")]),a("button",{class:"btn btn-sm btn-outline-warning me-2",type:"button",onClick:n[1]||(n[1]=(...s)=>t(o).unduhTemplate&&t(o).unduhTemplate(...s))},[P(g,{icon:"download",class:"icon"}),F(" Unduh Template ")]),a("button",{class:"btn btn-sm btn-outline-primary",type:"button",onClick:x}," Export "),u(a("p",null,"Click Kembali",512),[[V,t(o).btnDisable===!1]])])]),H,a("div",Y,[t(p).user.role!="pendamping"&&t(p).user.role!="p4nj"&&t(p).user.role!="armada"?(r(),d("div",q,[u(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[2]||(n[2]=s=>t(o).params.wilayah=s),onChange:n[3]||(n[3]=(...s)=>t(o).getBlok&&t(o).getBlok(...s))},[G,(r(!0),d(h,null,_(t(o).filter.wilayah,s=>(r(),d("option",{key:s,value:s.alias_wilayah},l(s.wilayah),9,X))),128))],544),[[b,t(o).params.wilayah]]),u(a("select",{class:"form-select form-select-sm mb-2",disabled:t(o).params.wilayah==="","onUpdate:modelValue":n[4]||(n[4]=s=>t(o).params.blok=s),onChange:n[5]||(n[5]=(...s)=>t(o).getData&&t(o).getData(...s))},[Z,(r(!0),d(h,null,_(t(o).filter.blok,s=>(r(),d("option",{key:s,value:s.id_blok},l(s.blok),9,tt))),128))],40,Q),[[b,t(o).params.blok]])])):m("",!0),t(p).user.role!="pendamping"?(r(),d("div",at,[u(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[6]||(n[6]=s=>t(o).params.area=s),onChange:n[7]||(n[7]=(...s)=>t(o).getDropspot&&t(o).getDropspot(...s))},[et,(r(!0),d(h,null,_(t(o).filter.area,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,st))),128))],544),[[b,t(o).params.area]]),u(a("select",{class:"form-select form-select-sm mb-2",disabled:t(o).params.area==="","onUpdate:modelValue":n[8]||(n[8]=s=>t(o).params.dropspot=s),onChange:n[9]||(n[9]=(...s)=>t(o).getData&&t(o).getData(...s))},[nt,(r(!0),d(h,null,_(t(o).filter.dropspot,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,it))),128))],40,ot),[[b,t(o).params.dropspot]])])):m("",!0),a("div",rt,[u(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[10]||(n[10]=s=>t(o).params.pembayaran=s),onChange:n[11]||(n[11]=(...s)=>t(o).getData&&t(o).getData(...s))},dt,544),[[b,t(o).params.pembayaran]]),u(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[12]||(n[12]=s=>t(o).params.jenis_kelamin=s),onChange:n[13]||(n[13]=(...s)=>t(o).getData&&t(o).getData(...s))},ct,544),[[b,t(o).params.jenis_kelamin]])]),t(p).user.role==="pendamping"?(r(),d("div",bt,[u(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":n[14]||(n[14]=s=>t(o).params.armada=s),onChange:n[15]||(n[15]=(...s)=>t(o).getData&&t(o).getData(...s))},[ht,(r(!0),d(h,null,_(t(o).filter.armada,s=>(r(),d("option",{key:s.id,value:s.id},l(s.nama),9,_t))),128))],544),[[b,t(o).params.armada]])])):m("",!0)]),a("div",yt,[a("div",gt,[a("small",null,"Total data "+l(t(o).totalData),1)]),a("div",ft,[u(a("input",{type:"text","onUpdate:modelValue":n[16]||(n[16]=s=>t(o).params.cari=s),class:"form-control form-control-sm mb-2",placeholder:"Cari Penumpang ...",onKeyup:n[17]||(n[17]=(...s)=>t(o).getData&&t(o).getData(...s))},null,544),[[C,t(o).params.cari]])])]),vt,a("div",kt,[a("table",Et,[Dt,a("tbody",null,[(r(!0),d(h,null,_(t(o).items,(s,A)=>(r(),d("tr",{style:{cursor:"pointer"},key:A,onDblclick:y(D=>t(e).goToDetailClick(s),["prevent"]),onContextmenu:y(D=>t(e).showContextMenu(D,s),["prevent"]),class:f({"table-active":T(s.id)}),onClick:y(D=>t(e).showContextMenu(D,s),["prevent"])},[a("td",null,l(A+1+(t(o).params.page-1)*t(o).params.limit),1),a("td",null,l(s.santri.niup),1),a("td",null,l(s.santri.nama_lengkap),1),s.dropspot?(r(),d("td",xt,l(s.dropspot.nama),1)):(r(),d("td",wt,Ot)),s.dropspot?(r(),d("td",St,l(s.dropspot.area.nama),1)):(r(),d("td",At,Ft)),s.dropspot?(r(),d("td",Lt,l(k(s.dropspot.harga)),1)):(r(),d("td",Tt,"Rp. 0")),a("td",null,l(k(s.jumlah_bayar)),1),a("td",null,[s.status_bayar==="belum-lunas"?(r(),d("i",jt,l(s.status_bayar==="belum-lunas"?"belum lunas":""),1)):m("",!0),s.status_bayar==="lunas"?(r(),d("i",Ut,l(s.status_bayar),1)):m("",!0),s.status_bayar==="kurang"?(r(),d("i",Vt,l(s.status_bayar),1)):m("",!0),s.status_bayar==="lebih"?(r(),d("i",Bt,l(s.status_bayar),1)):m("",!0)]),a("td",null,l(s.santri.wilayah),1),a("td",null,l(s.santri.blok),1),a("td",null,l(s.santri.kecamatan),1),a("td",null,l(s.santri.kabupaten),1),a("td",null,l(s.santri.provinsi),1)],42,Pt))),128))])])]),t(o).items.length>0?(r(),d("div",Mt,[t(o).meta.x_total_data?(r(),B(w,{key:0,meta:t(o).meta,per_page:t(o).params.limit,onSetPage:n[18]||(n[18]=s=>t(o).setPage(s)),onNext:t(o).nexPage,onPrev:t(o).prevPage,onLast:t(o).setPage,onFirst:t(o).setPage},null,8,["meta","per_page","onNext","onPrev","onLast","onFirst"])):m("",!0)])):m("",!0),t(e).contextMenuVisible?(r(),d("div",{key:1,class:"context-menu",style:M({top:`${t(e).contextMenuPosition.y}px`,left:`${t(e).contextMenuPosition.x}px`})},[a("ul",Kt,[t(p).user.role==="sysadmin"||t(p).user.role==="admin"||t(p).user.role==="daerah"||t(p).user.role==="wilayah"?(r(),d("li",{key:0,class:"list-group-item px-5",onClick:n[19]||(n[19]=(...s)=>t(e).handleOpenEditDropspot&&t(e).handleOpenEditDropspot(...s))}," Ubah Dropsot ")):m("",!0),t(p).user.role==="sysadmin"||t(p).user.role==="keuangan"?(r(),d("li",{key:1,class:"list-group-item px-5",onClick:n[20]||(n[20]=(...s)=>t(e).handleOpenEditPembayaran&&t(e).handleOpenEditPembayaran(...s))}," Ubah Status Pembayaran ")):m("",!0),a("li",{class:"list-group-item px-5",onClick:n[21]||(n[21]=(...s)=>t(e).goToDetail&&t(e).goToDetail(...s))}," Lihat Detail Rombongan "),t(p).user.role==="sysadmin"||t(p).user.role==="admin"||t(p).user.role==="daerah"||t(p).user.role==="wilayah"?(r(),d("li",{key:2,class:"list-group-item px-5",onClick:n[22]||(n[22]=(...s)=>t(e).deleteRombongan&&t(e).deleteRombongan(...s))}," Hapus Penumpang ")):m("",!0)])],4)):m("",!0),t(e).isOpenEditDropspot===!0?(r(),d("div",{key:2,class:f(["modal fade",{show:t(e).isOpenEditDropspot}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",Nt,[a("div",zt,[a("div",$t,[Rt,a("button",{class:"btn-close",type:"button",onClick:n[23]||(n[23]=(...s)=>t(e).setOpenEditDropspot&&t(e).setOpenEditDropspot(...s))})]),a("form",{onSubmit:n[28]||(n[28]=y((...s)=>t(e).editDropspot&&t(e).editDropspot(...s),["prevent"]))},[a("div",Jt,[a("div",Wt,[Ht,u(a("select",{class:"form-select","onUpdate:modelValue":n[24]||(n[24]=s=>t(e).idArea=s),onChange:n[25]||(n[25]=(...s)=>t(e).getDropspot&&t(e).getDropspot(...s))},[Yt,(r(!0),d(h,null,_(t(e).isArea,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,qt))),128))],544),[[b,t(e).idArea]])]),a("div",Gt,[Xt,u(a("select",{class:"form-select","onUpdate:modelValue":n[26]||(n[26]=s=>t(e).formEditDropspot.dropspot_id=s),disabled:t(e).idArea===""},[t(e).formEditDropspot.dropspot_id===""?(r(),d("option",Zt," Pilih Dropspot ")):m("",!0),(r(!0),d(h,null,_(t(e).isDropspot,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,ta))),128))],8,Qt),[[b,t(e).formEditDropspot.dropspot_id]])])]),a("div",aa,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[27]||(n[27]=(...s)=>t(e).setOpenEditDropspot&&t(e).setOpenEditDropspot(...s))}," Tutup "),ea])],32)])])],2)):m("",!0),t(e).isOpenEditPembayaran===!0?(r(),d("div",{key:3,class:f(["modal fade",{show:t(e).isOpenEditPembayaran}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",sa,[a("div",oa,[a("div",na,[ia,a("button",{class:"btn-close",type:"button",onClick:n[29]||(n[29]=(...s)=>t(e).setOpenEditPembayaran&&t(e).setOpenEditPembayaran(...s))})]),a("form",{onSubmit:n[33]||(n[33]=y((...s)=>t(e).editPembayaran&&t(e).editPembayaran(...s),["prevent"]))},[a("div",ra,[a("div",la,[da,u(a("input",{type:"number",class:"form-control mt-2","onUpdate:modelValue":n[30]||(n[30]=s=>t(e).formEditPembayaran.jumlah_bayar=s)},null,512),[[C,t(e).formEditPembayaran.jumlah_bayar]])]),a("div",pa,[ma,u(a("select",{class:"form-select","onUpdate:modelValue":n[31]||(n[31]=s=>t(e).formEditPembayaran.status_bayar=s)},ca,512),[[b,t(e).formEditPembayaran.status_bayar]])])]),a("div",ba,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[32]||(n[32]=(...s)=>t(e).setOpenEditPembayaran&&t(e).setOpenEditPembayaran(...s))}," Tutup "),ha])],32)])])],2)):m("",!0),t(e).isOpenImportPembayaran===!0?(r(),d("div",{key:4,class:f(["modal fade",{show:t(e).isOpenImportPembayaran}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",_a,[a("div",ya,[a("div",ga,[fa,a("button",{class:"btn-close",type:"button",onClick:n[34]||(n[34]=(...s)=>t(e).setOpenImportPembayaran&&t(e).setOpenImportPembayaran(...s))})]),a("form",{onSubmit:n[37]||(n[37]=y((...s)=>t(e).importPembayaran&&t(e).importPembayaran(...s),["prevent"]))},[a("div",va,[a("div",ka,[Ea,a("input",{type:"file",onChange:n[35]||(n[35]=(...s)=>t(e).handleFileChange&&t(e).handleFileChange(...s)),accept:".xlsx",class:"form-control mt-2"},null,32)])]),a("div",Da,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[36]||(n[36]=(...s)=>t(e).setOpenImportPembayaran&&t(e).setOpenImportPembayaran(...s))}," Tutup "),Pa])],32)])])],2)):m("",!0),t(e).isOpen===!0?(r(),d("div",{key:5,class:f(["modal fade",{show:t(e).setOpen}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",xa,[a("div",wa,[a("div",Ca,[Oa,a("button",{class:"btn-close",type:"button",onClick:n[38]||(n[38]=(...s)=>t(e).setOpen&&t(e).setOpen(...s))})]),a("div",Sa,[a("div",Aa,[a("div",Ia,[a("img",{src:t(e).fotoDiri,alt:"foto-diri",class:"img-thumbnail",style:{height:"300px","object-fit":"cover"}},null,8,Fa)]),a("div",La,[Ta,a("p",null,l(t(e).person.santri?t(e).person.santri.niup:"-"),1),ja,a("p",null,l(t(e).person.santri?t(e).person.santri.nama_lengkap:"-"),1),Ua,a("p",null,l(t(e).person.santri?t(e).person.santri.jenis_kelamin:"-"),1),Va,a("p",null,l(t(e).person.santri?t(e).person.santri.raw.tempat_lahir+", "+t(e).person.santri.raw.tanggal_lahir:"-"),1),Ba,a("p",null,l(t(e).person.santri?`${t(e).person.santri.raw.umur} Tahun`:"-"),1)]),a("div",Ma,[Ka,a("p",null,l(t(e).person.santri?t(e).person.santri.wilayah:"-"),1),Na,a("p",null,l(t(e).person.santri?t(e).person.santri.blok:"-"),1),za,a("p",null,l(t(e).person.santri&&t(e).person.santri.raw.domisili_santri?t(e).person.santri.raw.domisili_santri[t(e).person.santri.raw.domisili_santri.length-1].kamar:"-"),1),$a,a("p",null,l(t(e).person.santri&&t(e).person.santri.raw.pendidikan?t(e).person.santri.raw.pendidikan[t(e).person.santri.raw.pendidikan.length-1].lembaga:"-"),1),Ra,a("p",null,l(t(e).person.santri&&t(e).person.santri.raw.pendidikan?t(e).person.santri.raw.pendidikan[t(e).person.santri.raw.pendidikan.length-1].jurusan:"-"),1)]),a("div",Ja,[Wa,a("p",null,l(t(e).person.santri?t(e).person.santri.provinsi:"-"),1),Ha,a("p",null,l(t(e).person.santri?t(e).person.santri.kabupaten:"-"),1),Ya,a("p",null,l(t(e).person.santri?t(e).person.santri.kecamatan:"-"),1),qa,a("p",null,l(t(e).person.santri?t(e).person.santri.raw.kodepos:"-"),1),Ga,a("p",null,l(t(e).person.santri?t(e).person.santri.raw.jalan:"-"),1)])]),Xa,a("div",Qa,[a("div",Za,[a("div",te,[a("div",ae,[ee,a("div",{class:"float-end",style:{cursor:"pointer"},onClick:n[39]||(n[39]=(...s)=>t(e).setClickEditDrop&&t(e).setClickEditDrop(...s))},[P(g,{icon:"pen",class:"icon",style:{"font-size":"15px"}})])]),a("div",se,[t(e).editedDrop==!1?(r(),d("div",oe,[ne,a("b",ie,l(t(e).dataEdit.dropspot?t(e).dataEdit.dropspot.nama:"-"),1),re,a("b",le,l(t(e).person.dropspot?t(e).person.dropspot.area.nama:"-"),1),de,a("b",pe,l(t(e).person.dropspot?t(e).person.dropspot.area.pic:"-"),1),me,a("b",ue,l(t(e).person.dropspot?t(e).person.dropspot.area.no_hp:"-"),1)])):(r(),d("div",ce,[a("form",{onSubmit:n[44]||(n[44]=y((...s)=>t(e).editDropspot&&t(e).editDropspot(...s),["prevent"]))},[a("div",be,[a("div",he,[_e,u(a("select",{class:"form-select","onUpdate:modelValue":n[40]||(n[40]=s=>t(e).idArea=s),onChange:n[41]||(n[41]=(...s)=>t(e).getDropspot&&t(e).getDropspot(...s))},[ye,(r(!0),d(h,null,_(t(e).isArea,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,ge))),128))],544),[[b,t(e).idArea]])]),a("div",fe,[ve,u(a("select",{class:"form-select","onUpdate:modelValue":n[42]||(n[42]=s=>t(e).formEditDropspot.dropspot_id=s),disabled:t(e).idArea===""},[t(e).formEditDropspot.dropspot_id===""?(r(),d("option",Ee," Pilih Dropspot ")):m("",!0),(r(!0),d(h,null,_(t(e).isDropspot,s=>(r(),d("option",{key:s,value:s.id},l(s.nama),9,De))),128))],8,ke),[[b,t(e).formEditDropspot.dropspot_id]])])]),a("div",Pe,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[43]||(n[43]=(...s)=>t(e).setClickEditDrop&&t(e).setClickEditDrop(...s))}," Tutup "),xe])],32)]))])])]),a("div",we,[a("div",Ce,[a("div",Oe,[Se,a("div",{class:"float-end",style:{cursor:"pointer"},onClick:n[45]||(n[45]=(...s)=>t(e).setClickEdirPembayaran&&t(e).setClickEdirPembayaran(...s))},[P(g,{icon:"pen",class:"icon",style:{"font-size":"15px"}})])]),a("div",Ae,[t(e).edited===!1?(r(),d("div",Ie,[a("div",null,[Fe,a("b",Le,l(t(e).dataEdit?k(t(e).dataEdit.dropspot.harga):"-"),1),Te,a("b",je,l(t(e)?k(t(e).dataEdit.jumlah_bayar):"-"),1),Ue,t(e).dataEdit.status_bayar==="belum-lunas"?(r(),d("i",Ve,l(t(e).dataEdit.status_bayar==="belum-lunas"?"Belum Lunas":""),1)):m("",!0),t(e).dataEdit.status_bayar==="lunas"?(r(),d("i",Be,l(t(e).dataEdit.status_bayar),1)):m("",!0),t(e).dataEdit.status_bayar==="kurang"?(r(),d("i",Me,l(t(e).dataEdit.status_bayar),1)):m("",!0),t(e).dataEdit.status_bayar==="lebih"?(r(),d("i",Ke,l(t(e).dataEdit.status_bayar),1)):m("",!0)])])):(r(),d("div",Ne,[a("form",{onSubmit:n[49]||(n[49]=y((...s)=>t(e).editPembayaran&&t(e).editPembayaran(...s),["prevent"]))},[a("div",ze,[a("div",$e,[Re,u(a("input",{type:"number",class:"form-control mt-2","onUpdate:modelValue":n[46]||(n[46]=s=>t(e).formEditPembayaran.jumlah_bayar=s)},null,512),[[C,t(e).formEditPembayaran.jumlah_bayar]])]),a("div",Je,[We,u(a("select",{class:"form-select","onUpdate:modelValue":n[47]||(n[47]=s=>t(e).formEditPembayaran.status_bayar=s)},Ye,512),[[b,t(e).formEditPembayaran.status_bayar]])])]),a("div",qe,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[48]||(n[48]=(...s)=>t(e).setClickEdirPembayaran&&t(e).setClickEdirPembayaran(...s))}," Tutup "),Ge])],32)]))])])]),a("div",Xe,[a("div",Qe,[Ze,a("div",ts,[a("div",null,[as,a("b",es,l(t(e).person.armada?t(e).person.armada.nama:"-"),1),ss,a("b",os,l(t(e).person.armada&&t(e).person.armada.user?t(e).person.armada.user.nama_lengkap:"-"),1),ns,a("b",is,l(t(e).person.armada&&t(e).person.armada.user?t(e).person.armada.user.no_hp:"-"),1)])])])])])]),a("div",rs,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:n[50]||(n[50]=(...s)=>t(e).setOpen&&t(e).setOpen(...s))}," Tutup ")])])])],2)):m("",!0)],64)}}};export{ms as default};
