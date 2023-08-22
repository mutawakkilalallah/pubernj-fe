import{x as j,C as u,i as L,S as U,a as C,g as l,c as p,b as a,u as t,l as I,q as F,z as m,d as c,y as B,E as h,F as b,s as _,t as d,v as S,w as y,n as g,e as V,f as M,G as A}from"./index-47bc540a.js";import{u as w,F as R,w as N}from"./FileSaver.min-848fb5bc.js";import{u as $}from"./index-662c665e.js";const f=j("table_penumpang",{state:()=>({items:[],meta:{},myPage:"",filter:{area:[],dropspot:[],wilayah:[],blok:[],armada:[]},params:{cari:"",dropspot:"",area:"",wilayah:"",blok:"",pembayaran:"",jenis_kelamin:"",armada:"",page:1,limit:25},params2:{limit:""},itemsExport:[],btnDisable:!0}),actions:{nexPage(r){this.params.page=parseInt(r)+1,this.getData()},prevPage(r){this.params.page=parseInt(r)-1,this.getData()},setPage(r){this.params.page=parseInt(r),this.getData()},searchPage(){this.params.page=1,this.getData()},async getData(){const r={params:this.params};try{await u.get("penumpang",r).then(o=>{(o.data.code=200)&&(this.totalData=o.headers.x_total_data,this.items=o.data.data,this.meta=o.headers,this.filter.area=o.data.filter.area,this.params2.limit=o.headers.x_total_data,this.getDataExport())})}catch{}},async unduhTemplate(){try{await u.get("penumpang/unduh-template",{responseType:"blob"}).then(r=>{const o=new Blob([r.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),n=window.URL.createObjectURL(o),e=document.createElement("a");e.href=n,e.setAttribute("download","template_puber.xlsx"),document.body.appendChild(e),e.click(),e.remove()})}catch{}},async getDataExport(){const r={params:this.params2};try{await u.get("penumpang",r).then(o=>{(o.data.code=200)&&(this.itemsExport=o.data.data)})}catch{}},exportExel(){if(this.itemsExport.length>0){const r=this.tanggal(),o=this.formatJson(this.itemsExport),n=w.json_to_sheet(o),e=w.book_new();w.book_append_sheet(e,n,"Data");const D=this.writeExcelBuffer(e);this.saveExcelFile(D,`Data Penumpang ${r}.xlsx`)}else this.btnDisable=!1},saveExcelFile(r,o){const n=new Blob([r],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});R.saveAs(n,o)},writeExcelBuffer(r){return N(r,{bookType:"xlsx",type:"array"})},async handleReset(){this.params={cari:"",dropspot:"",area:"",wilayah:"",blok:"",pembayaran:"",jenis_kelamin:"",armada:"",page:1,limit:25},this.getData()},formatJson(r){const o=[];return r.forEach(n=>{const e={niup:"",nama:"",kecamatan:"",kabupaten:"",provinsi:"",daerah:"",wilayah:"",lembaga:"",status_kepulangan:"",dropspot:"",armada:"",area:"",tarif:"",status_pembayaran:""};e.niup=n.santri.niup,e.nama=n.santri.nama_lengkap,e.kecamatan=n.santri.kecamatan,e.kabupaten=n.santri.kabupaten,e.provinsi=n.santri.provinsi,e.daerah=n.santri.blok,e.wilayah=n.santri.wilayah,e.lembaga="",e.status_kepulangan=n.santri.status_kepulangan,e.dropspot=n.dropspot.nama,e.armada="",e.area=n.dropspot.area.nama,e.tarif=n.dropspot.harga,e.status_pembayaran=n.status_bayar,o.push(e)}),o},tanggal(){const r=new Date,o=r.getDate(),n=r.getMonth()+1,e=r.getFullYear();return(o<=9?"0"+o:o)+"-"+(n<=9?"0"+n:n)+"-"+e},async getDropspot(){this.params.dropspot="",this.getData();const r={params:{area:this.params.area}};try{await u.get("dropspot",r).then(o=>{(o.data.code=200)&&(this.filter.dropspot=o.data.data)})}catch{}},async getWilayah(){try{await u.get("santri/filter/wilayah").then(r=>{(r.data.code=200)&&(this.filter.wilayah=r.data)})}catch{}},async getBlok(){this.params.blok="",this.getData();try{await u.get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`).then(r=>{(r.data.code=200)&&(this.filter.blok=r.data)})}catch{}},async getArmada(){try{await u.get("armada").then(r=>{(r.data.code=200)&&(this.filter.armada=r.data.data)})}catch{}}}}),K=j("form_penumpang",{state:()=>({contextMenuVisible:!1,contextMenuPosition:{x:0,y:0},isOpenEditDropspot:!1,isOpenEditPembayaran:!1,isOpenImportPembayaran:!1,isArea:[],isDropspot:[],idEdit:"",idDelete:"",idArea:"",dataEdit:{},formImportPembayaran:{excelFile:null},formEditDropspot:{dropspot_id:""},formEditPembayaran:{jumlah_bayar:""},isOpen:!1,edited:!1,editedDrop:!1,person:{},fotoDiri:""}),actions:{setOpen(){this.isOpen=!this.isOpen},showContextMenu(r,o){r.preventDefault(),this.dataEdit=o,this.idEdit=o.id,this.contextMenuPosition={x:r.pageX,y:r.pageY},this.contextMenuVisible=!0,document.addEventListener("click",this.handleOutsideClick)},handleOutsideClick(r){this.contextMenuVisible=!1,document.removeEventListener("click",this.handleOutsideClick)},resetFormEditDropspot(){this.formEditDropspot.dropspot_id=""},resetFormEditPembayaran(){this.formEditPembayaran.jumlah_bayar=""},resetFormImportPembayaran(){this.formImportPembayaran.excelFile=null},setOpenEditDropspot(){this.isOpenEditDropspot=!this.isOpenEditDropspot,this.resetFormEditDropspot()},setOpenImportPembayaran(){this.isOpenImportPembayaran=!this.isOpenImportPembayaran,this.resetFormImportPembayaran()},setOpenEditPembayaran(){this.isOpenEditPembayaran=!this.isOpenEditPembayaran,this.resetFormEditPembayaran()},handleOpenEditDropspot(){this.idArea=this.dataEdit.dropspot.area_id,this.getArea(),this.getDropspot(),this.formEditDropspot.dropspot_id=this.dataEdit.dropspot_id,this.isOpenEditDropspot=!0},handleOpenEditPembayaran(){this.formEditPembayaran.jumlah_bayar=this.dataEdit.jumlah_bayar,this.isOpenEditPembayaran=!0},goToDetail(){L.push(`penumpang/${this.dataEdit.santri_uuid}/detail`)},goToDetailClick(r){this.idEdit=r.id,this.isOpen=!0,this.dataEdit=r,this.getDataDetail(r.santri_uuid),this.getImage(r.santri.niup)},setClickEdirPembayaran(){this.edited=!this.edited,this.formEditPembayaran.jumlah_bayar=this.dataEdit.jumlah_bayar},setClickEditDrop(){this.editedDrop=!this.editedDrop,this.idArea=this.dataEdit.dropspot.area_id,this.getArea(),this.getDropspot(),this.formEditDropspot.dropspot_id=this.dataEdit.dropspot_id},handleFileChange(r){this.formImportPembayaran.excelFile=r.target.files[0]},getArea(){try{u.get("area").then(r=>{this.isArea=r.data.data})}catch{}},async getDropspot(){this.formEditDropspot.dropspot_id="";const r={params:{area:this.idArea}};try{await u.get("dropspot",r).then(o=>{this.isDropspot=o.data.data})}catch{}},async getDataDetail(r){try{await u.get(`penumpang/${r}`).then(o=>{(o.data.code=200)&&(this.person=o.data.data,this.getImage(o.data.data.santri.niup,"medium"))})}catch{}},async getImage(r){try{const o={responseType:"blob"};await u.get("santri/image/"+r,o).then(n=>{this.fotoDiri=URL.createObjectURL(n.data)})}catch(o){console.log("error",o)}},async editDropspot(){try{await u.put(`penumpang/dropspot/${this.idEdit}`,this.formEditDropspot).then(r=>{this.isOpenEditDropspot=!1,this.resetFormEditDropspot(),f().getData(),this.editedDrop=!1,this.isOpen=!1})}catch{}},async importPembayaran(){try{const r=new FormData;r.append("excelFile",this.formImportPembayaran.excelFile),await u.post("penumpang/import-pembayaran",r).then(o=>{this.isOpenImportPembayaran=!1,this.resetFormImportPembayaran(),f().getData()})}catch{}},async editPembayaran(){try{await u.put(`penumpang/pembayaran/${this.idEdit}`,this.formEditPembayaran).then(r=>{this.isOpenEditPembayaran=!1,this.dataEdit.jumlah_bayar=this.formEditPembayaran.jumlah_bayar,this.resetFormEditPembayaran(),f().getData(),this.edited=!1})}catch{}},async deleteRombongan(){this.isOpen=!1,U.fire({title:"Konfirmasi",text:"Apakah anda yakin ingin mengeluarkan dari rombongan ?",icon:"info",showCancelButton:!0,confirmButtonText:"keluarkan",confirmButtonColor:"#DC3545"}).then(r=>{r.isConfirmed&&u.delete(`penumpang/${this.dataEdit.santri_uuid}`).then(o=>{this.isOpenEdit=!1,f().getData()})})}}});const z={class:"row"},J=a("div",{class:"col-md-8"},[a("h3",{class:"titlePage"},"Data Penumpang")],-1),W={class:"col-md-4 text-end g-2"},H=a("hr",null,null,-1),Y={class:"filter-box row"},q={key:0,class:"col-md-2"},G=a("option",{value:"",selected:""},"Semua Wilayah",-1),X=["value"],Q=["disabled"],Z=a("option",{value:"",selected:""},"Semua Daerah",-1),tt=["value"],at={key:1,class:"col-md-2"},et=a("option",{value:"",selected:""},"Semua Area",-1),st=["value"],ot=["disabled"],nt=a("option",{value:"",selected:""},"Semua Dropsot",-1),it=["value"],rt={class:"col-md-2"},lt=A('<option value="" selected>Semua Status Pembayaran</option><option value="belum-lunas">Belum Lunas</option><option value="lunas">Lunas</option><option value="kurang">Kurang</option><option value="lebih">Lebih</option>',5),dt=[lt],pt=a("option",{value:"",selected:""},"Semua Jenis Kelamin",-1),mt=a("option",{value:"L"},"Laki-Laki",-1),ut=a("option",{value:"P"},"Perempuan",-1),ct=[pt,mt,ut],ht={key:2,class:"col-md-2"},bt=a("option",{value:"",selected:""},"Semua Armada",-1),_t=["value"],yt={class:"serach-box row mt-2"},gt={class:"col-md-6 mb-2 d-flex"},ft={class:"col-sm-3 col-md-1 me-3"},kt=A('<option value="25" selected>25</option><option value="50">50</option><option value="100">100</option><option value="250">250</option><option value="500">500</option><option value="1000">1000</option>',6),vt=[kt],Et={class:"col-sm-9 col-md-11"},Dt={class:"col-md-6 mb-2"},xt={class:"row justify-content-end"},Pt={class:"col-md-3"},wt={class:"col-auto d-flex flex-column align-items-end"},Ot={class:"table-responsive"},Ct={class:"table table-sm table-hover mt-3"},It=a("th",{scope:"col"},"No",-1),Ft=a("th",{scope:"col"},"NIUP",-1),St=a("th",{scope:"col"},"Nama Santri",-1),jt=a("th",{scope:"col"},"Dropsot",-1),At=a("th",{scope:"col"},"Area",-1),Tt={key:0,scope:"col"},Lt={key:1,scope:"col"},Ut={key:2,scope:"col"},Bt=a("th",{scope:"col"},"Wilayah",-1),Vt=a("th",{scope:"col"},"Daerah",-1),Mt=a("th",{scope:"col"},"Kecamatan",-1),Rt=a("th",{scope:"col"},"Kabupaten",-1),Nt=a("th",{scope:"col"},"Provinsi",-1),$t=["onDblclick","onContextmenu","onClick"],Kt={key:0},zt={key:1,class:"text-danger"},Jt=a("i",null,"belum-ditentukan",-1),Wt=[Jt],Ht={key:2},Yt={key:3,class:"text-danger"},qt=a("i",null,"belum-ditentukan",-1),Gt=[qt],Xt={key:4},Qt={key:5,class:"text-danger"},Zt={key:6},ta={key:7},aa={key:0,class:"badge bg-danger text-capitalize"},ea={key:1,class:"badge bg-success text-capitalize"},sa={key:2,class:"badge bg-warning text-capitalize"},oa={key:3,class:"badge bg-info text-capitalize"},na={key:0},ia={class:"list-group list-group-flush"},ra={class:"modal-dialog"},la={class:"modal-content"},da={class:"modal-header"},pa=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Dropsot",-1),ma={class:"modal-body"},ua={class:"form-group mb-3"},ca=a("small",null,"Area",-1),ha=a("option",{value:"",selected:""},"Pilih Area",-1),ba=["value"],_a={class:"form-group mb-3"},ya=a("small",null,"Dropspot",-1),ga=["disabled"],fa={key:0,value:"",selected:""},ka=["value"],va={class:"modal-footer"},Ea=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),Da={class:"modal-dialog"},xa={class:"modal-content"},Pa={class:"modal-header"},wa=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"},"Edit Pembayaran",-1),Oa={class:"modal-body"},Ca={class:"form-group mb-3"},Ia=a("small",null,"Jumlah Pembayaran",-1),Fa={class:"modal-footer"},Sa=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Simpan",-1),ja={class:"modal-dialog"},Aa={class:"modal-content"},Ta={class:"modal-header"},La=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"}," Import Pembayaran ",-1),Ua={class:"modal-body"},Ba={class:"form-group mb-3"},Va=a("small",null,"File Excel (.xlsx only)",-1),Ma={class:"modal-footer"},Ra=a("button",{type:"submit",class:"btn btn-sm btn-primary"},"Proses",-1),Na={class:"modal-dialog"},$a={class:"modal-content"},Ka={class:"modal-header"},za=a("h1",{class:"modal-title fs-5",id:"modalEditLabel"}," Detail Data Penumpang ",-1),Ja={class:"modal-body"},Wa={class:"row"},Ha={class:"col-md-3"},Ya=["src"],qa={class:"col-md-2"},Ga=a("b",null,"NIUP",-1),Xa=a("b",null,"Nama",-1),Qa=a("b",null,"Jenis Kelamin",-1),Za=a("b",null,"Tetala",-1),te=a("b",null,"Umur",-1),ae={class:"col-md-2"},ee=a("b",null,"Wilayah",-1),se=a("b",null,"Daerah",-1),oe=a("b",null,"Kamar",-1),ne=a("b",null,"Lembaga",-1),ie=a("b",null,"Jurusan",-1),re={class:"col-md-5"},le=a("b",null,"Provinsi",-1),de=a("b",null,"Kabupaten",-1),pe=a("b",null,"Kecamatan",-1),me=a("b",null,"Kode Pos",-1),ue=a("b",null,"Jalan",-1),ce=a("hr",null,null,-1),he={class:"row"},be={class:"col-md-4"},_e={class:"card"},ye=a("div",{class:"card-header bg-primary text-white"},[a("div",{class:"float-start"},"Tujuan")],-1),ge={class:"card-body"},fe=a("p",{class:"card-title mb-0"},"Dropspot :",-1),ke={class:"card-text"},ve=a("p",{class:"card-title mb-0 mt-3"},"Daerah :",-1),Ee={class:"card-text"},De=a("p",{class:"card-title mb-0 mt-3"},"PIC :",-1),xe={class:"card-text mb-0"},Pe=a("br",null,null,-1),we={class:"card-text"},Oe={class:"col-md-4"},Ce={class:"card"},Ie=a("div",{class:"card-header bg-primary text-white"},[a("div",{class:"float-start"},"Pembayaran")],-1),Fe={class:"card-body"},Se=a("p",{class:"card-title mb-0"},"Tarif :",-1),je={class:"card-text"},Ae=a("p",{class:"card-title mb-0 mt-3"},"Jumlah Pembayaran :",-1),Te={class:"card-text"},Le=a("p",{class:"card-title mb-0 mt-3"},"Status Pembayaran :",-1),Ue={key:0,class:"badge bg-danger"},Be={key:1,class:"badge bg-success text-capitalize"},Ve={key:2,class:"badge bg-warning text-capitalize"},Me={key:3,class:"badge bg-info text-capitalize"},Re={class:"col-md-4"},Ne={class:"card"},$e=a("div",{class:"card-header bg-primary text-white"},"Armada",-1),Ke={class:"card-body"},ze=a("p",{class:"card-title mb-0"},"BUS :",-1),Je={class:"card-text"},We=a("p",{class:"card-title mb-0 mt-3"},"Pendamping :",-1),He={class:"card-text"},Ye=a("p",{class:"card-title mb-0 mt-3"},"No. HP :",-1),qe={class:"card-text"},Ge={class:"modal-footer"},ts={__name:"PenumpangPage",setup(r){const o=$(),n=f(),e=K();n.getData(),o.user.role!="p4nj"&&n.getWilayah(),n.getArmada();function D(){n.exportExel()}const k=v=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0,maximumFractionDigits:0}).format(v),T=v=>{const i=[];return i.push(v),i.filter(P=>P===e.idEdit)[0]};return(v,i)=>{const x=C("font-awesome-icon"),P=C("app-paginate");return l(),p(b,null,[a("div",z,[J,a("div",W,[t(o).user.role==="sysadmin"||t(o).user.role==="keuangan"?(l(),p("button",{key:0,class:"btn btn-sm btn-outline-info me-2",type:"button",onClick:i[0]||(i[0]=s=>t(e).setOpenImportPembayaran())},[I(x,{icon:"file-import",class:"icon"}),F(" Import Pembayaran ")])):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="keuangan"?(l(),p("button",{key:1,class:"btn btn-sm btn-outline-warning me-2",type:"button",onClick:i[1]||(i[1]=(...s)=>t(n).unduhTemplate&&t(n).unduhTemplate(...s))},[I(x,{icon:"download",class:"icon"}),F(" Unduh Template ")])):m("",!0),a("button",{class:"btn btn-sm btn-outline-primary",type:"button",onClick:D}," Export "),c(a("p",null,"Click Kembali",512),[[B,t(n).btnDisable===!1]])])]),H,a("div",Y,[t(o).user.role!="pendamping"&&t(o).user.role!="p4nj"&&t(o).user.role!="armada"?(l(),p("div",q,[c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[2]||(i[2]=s=>t(n).params.wilayah=s),onChange:i[3]||(i[3]=(...s)=>t(n).getBlok&&t(n).getBlok(...s))},[G,(l(!0),p(b,null,_(t(n).filter.wilayah,s=>(l(),p("option",{key:s,value:s.alias_wilayah},d(s.wilayah),9,X))),128))],544),[[h,t(n).params.wilayah]]),c(a("select",{class:"form-select form-select-sm mb-2",disabled:t(n).params.wilayah==="","onUpdate:modelValue":i[4]||(i[4]=s=>t(n).params.blok=s),onChange:i[5]||(i[5]=(...s)=>t(n).getData&&t(n).getData(...s))},[Z,(l(!0),p(b,null,_(t(n).filter.blok,s=>(l(),p("option",{key:s,value:s.id_blok},d(s.blok),9,tt))),128))],40,Q),[[h,t(n).params.blok]])])):m("",!0),t(o).user.role!="pendamping"?(l(),p("div",at,[c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[6]||(i[6]=s=>t(n).params.area=s),onChange:i[7]||(i[7]=(...s)=>t(n).getDropspot&&t(n).getDropspot(...s))},[et,(l(!0),p(b,null,_(t(n).filter.area,s=>(l(),p("option",{key:s,value:s.id},d(s.nama),9,st))),128))],544),[[h,t(n).params.area]]),c(a("select",{class:"form-select form-select-sm mb-2",disabled:t(n).params.area==="","onUpdate:modelValue":i[8]||(i[8]=s=>t(n).params.dropspot=s),onChange:i[9]||(i[9]=(...s)=>t(n).getData&&t(n).getData(...s))},[nt,(l(!0),p(b,null,_(t(n).filter.dropspot,s=>(l(),p("option",{key:s,value:s.id},d(s.nama),9,it))),128))],40,ot),[[h,t(n).params.dropspot]])])):m("",!0),a("div",rt,[c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[10]||(i[10]=s=>t(n).params.pembayaran=s),onChange:i[11]||(i[11]=(...s)=>t(n).getData&&t(n).getData(...s))},dt,544),[[h,t(n).params.pembayaran]]),c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[12]||(i[12]=s=>t(n).params.jenis_kelamin=s),onChange:i[13]||(i[13]=(...s)=>t(n).getData&&t(n).getData(...s))},ct,544),[[h,t(n).params.jenis_kelamin]])]),t(o).user.role==="pendamping"?(l(),p("div",ht,[c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[14]||(i[14]=s=>t(n).params.armada=s),onChange:i[15]||(i[15]=(...s)=>t(n).getData&&t(n).getData(...s))},[bt,(l(!0),p(b,null,_(t(n).filter.armada,s=>(l(),p("option",{key:s.id,value:s.id},d(s.nama),9,_t))),128))],544),[[h,t(n).params.armada]])])):m("",!0)]),a("div",yt,[a("div",gt,[a("div",ft,[c(a("select",{class:"form-select form-select-sm mb-2","onUpdate:modelValue":i[16]||(i[16]=s=>t(n).params.limit=s),onChange:i[17]||(i[17]=(...s)=>t(n).getData&&t(n).getData(...s))},vt,544),[[h,t(n).params.limit]])]),a("div",Et,[a("small",null,"Total data "+d(t(n).meta.x_total_data),1)])]),a("div",Dt,[a("div",xt,[a("div",Pt,[c(a("input",{type:"text","onUpdate:modelValue":[i[18]||(i[18]=s=>t(n).params.cari=s),i[19]||(i[19]=(...s)=>t(n).searchPage&&t(n).searchPage(...s))],class:"form-control form-control-sm mb-2",placeholder:"Cari Penumpang ..."},null,512),[[S,t(n).params.cari]])]),a("div",wt,[a("button",{class:"btn btn-danger btn-sm",onClick:i[20]||(i[20]=(...s)=>t(n).handleReset&&t(n).handleReset(...s))}," RESET ")])])])]),a("div",Ot,[a("table",Ct,[a("thead",null,[a("tr",null,[It,Ft,St,jt,At,t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("th",Tt," Tarif ")):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("th",Lt," Jumlah Bayar ")):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("th",Ut," Status Pembayaran ")):m("",!0),Bt,Vt,Mt,Rt,Nt])]),a("tbody",null,[(l(!0),p(b,null,_(t(n).items,(s,O)=>(l(),p("tr",{style:{cursor:"pointer"},key:O,onDblclick:y(E=>t(e).goToDetailClick(s),["prevent"]),onContextmenu:y(E=>t(e).showContextMenu(E,s),["prevent"]),class:g({"table-active":T(s.id)}),onClick:y(E=>t(e).showContextMenu(E,s),["prevent"])},[a("td",null,d(O+1+(t(n).params.page-1)*t(n).params.limit),1),a("td",null,d(s.santri.niup),1),a("td",null,d(s.santri.nama_lengkap),1),s.dropspot?(l(),p("td",Kt,d(s.dropspot.nama),1)):(l(),p("td",zt,Wt)),s.dropspot?(l(),p("td",Ht,d(s.dropspot.area.nama),1)):(l(),p("td",Yt,Gt)),s.dropspot&&t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("td",Xt,d(k(s.dropspot.harga)),1)):t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("td",Qt," Rp. 0 ")):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("td",Zt,d(k(s.jumlah_bayar)),1)):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("td",ta,[s.status_bayar==="belum-lunas"?(l(),p("i",aa,d(s.status_bayar==="belum-lunas"?"belum lunas":""),1)):m("",!0),s.status_bayar==="lunas"?(l(),p("i",ea,d(s.status_bayar),1)):m("",!0),s.status_bayar==="kurang"?(l(),p("i",sa,d(s.status_bayar),1)):m("",!0),s.status_bayar==="lebih"?(l(),p("i",oa,d(s.status_bayar),1)):m("",!0)])):m("",!0),a("td",null,d(s.santri.wilayah),1),a("td",null,d(s.santri.blok),1),a("td",null,d(s.santri.kecamatan),1),a("td",null,d(s.santri.kabupaten),1),a("td",null,d(s.santri.provinsi),1)],42,$t))),128))])])]),t(n).items.length>0?(l(),p("div",na,[t(n).meta.x_total_data?(l(),V(P,{key:0,meta:t(n).meta,per_page:t(n).params.limit,onSetPage:i[21]||(i[21]=s=>t(n).setPage(s)),onNext:t(n).nexPage,onPrev:t(n).prevPage,onLast:t(n).setPage,onFirst:t(n).setPage},null,8,["meta","per_page","onNext","onPrev","onLast","onFirst"])):m("",!0)])):m("",!0),t(e).contextMenuVisible?(l(),p("div",{key:1,class:"context-menu",style:M({top:`${t(e).contextMenuPosition.y}px`,left:`${t(e).contextMenuPosition.x}px`})},[a("ul",ia,[t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("li",{key:0,class:"list-group-item px-5",onClick:i[22]||(i[22]=(...s)=>t(e).handleOpenEditDropspot&&t(e).handleOpenEditDropspot(...s))}," Ubah Dropsot ")):m("",!0),t(o).user.role==="sysadmin"||t(o).user.role==="keuangan"?(l(),p("li",{key:1,class:"list-group-item px-5",onClick:i[23]||(i[23]=(...s)=>t(e).handleOpenEditPembayaran&&t(e).handleOpenEditPembayaran(...s))}," Ubah Status Pembayaran ")):m("",!0),a("li",{class:"list-group-item px-5",onClick:i[24]||(i[24]=(...s)=>t(e).goToDetail&&t(e).goToDetail(...s))}," Lihat Detail Rombongan "),t(o).user.role==="sysadmin"||t(o).user.role==="admin"||t(o).user.role==="daerah"||t(o).user.role==="wilayah"?(l(),p("li",{key:2,class:"list-group-item px-5",onClick:i[25]||(i[25]=(...s)=>t(e).deleteRombongan&&t(e).deleteRombongan(...s))}," Hapus Penumpang ")):m("",!0)])],4)):m("",!0),t(e).isOpenEditDropspot===!0?(l(),p("div",{key:2,class:g(["modal fade",{show:t(e).isOpenEditDropspot}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",ra,[a("div",la,[a("div",da,[pa,a("button",{class:"btn-close",type:"button",onClick:i[26]||(i[26]=(...s)=>t(e).setOpenEditDropspot&&t(e).setOpenEditDropspot(...s))})]),a("form",{onSubmit:i[31]||(i[31]=y((...s)=>t(e).editDropspot&&t(e).editDropspot(...s),["prevent"]))},[a("div",ma,[a("div",ua,[ca,c(a("select",{class:"form-select","onUpdate:modelValue":i[27]||(i[27]=s=>t(e).idArea=s),onChange:i[28]||(i[28]=(...s)=>t(e).getDropspot&&t(e).getDropspot(...s))},[ha,(l(!0),p(b,null,_(t(e).isArea,s=>(l(),p("option",{key:s,value:s.id},d(s.nama),9,ba))),128))],544),[[h,t(e).idArea]])]),a("div",_a,[ya,c(a("select",{class:"form-select","onUpdate:modelValue":i[29]||(i[29]=s=>t(e).formEditDropspot.dropspot_id=s),disabled:t(e).idArea===""},[t(e).formEditDropspot.dropspot_id===""?(l(),p("option",fa," Pilih Dropspot ")):m("",!0),(l(!0),p(b,null,_(t(e).isDropspot,s=>(l(),p("option",{key:s,value:s.id},d(s.nama),9,ka))),128))],8,ga),[[h,t(e).formEditDropspot.dropspot_id]])])]),a("div",va,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:i[30]||(i[30]=(...s)=>t(e).setOpenEditDropspot&&t(e).setOpenEditDropspot(...s))}," Tutup "),Ea])],32)])])],2)):m("",!0),t(e).isOpenEditPembayaran===!0?(l(),p("div",{key:3,class:g(["modal fade",{show:t(e).isOpenEditPembayaran}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",Da,[a("div",xa,[a("div",Pa,[wa,a("button",{class:"btn-close",type:"button",onClick:i[32]||(i[32]=(...s)=>t(e).setOpenEditPembayaran&&t(e).setOpenEditPembayaran(...s))})]),a("form",{onSubmit:i[35]||(i[35]=y((...s)=>t(e).editPembayaran&&t(e).editPembayaran(...s),["prevent"]))},[a("div",Oa,[a("div",Ca,[Ia,c(a("input",{type:"number",class:"form-control mt-2","onUpdate:modelValue":i[33]||(i[33]=s=>t(e).formEditPembayaran.jumlah_bayar=s)},null,512),[[S,t(e).formEditPembayaran.jumlah_bayar]])])]),a("div",Fa,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:i[34]||(i[34]=(...s)=>t(e).setOpenEditPembayaran&&t(e).setOpenEditPembayaran(...s))}," Tutup "),Sa])],32)])])],2)):m("",!0),t(e).isOpenImportPembayaran===!0?(l(),p("div",{key:4,class:g(["modal fade",{show:t(e).isOpenImportPembayaran}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",ja,[a("div",Aa,[a("div",Ta,[La,a("button",{class:"btn-close",type:"button",onClick:i[36]||(i[36]=(...s)=>t(e).setOpenImportPembayaran&&t(e).setOpenImportPembayaran(...s))})]),a("form",{onSubmit:i[39]||(i[39]=y((...s)=>t(e).importPembayaran&&t(e).importPembayaran(...s),["prevent"]))},[a("div",Ua,[a("div",Ba,[Va,a("input",{type:"file",onChange:i[37]||(i[37]=(...s)=>t(e).handleFileChange&&t(e).handleFileChange(...s)),accept:".xlsx",class:"form-control mt-2"},null,32)])]),a("div",Ma,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:i[38]||(i[38]=(...s)=>t(e).setOpenImportPembayaran&&t(e).setOpenImportPembayaran(...s))}," Tutup "),Ra])],32)])])],2)):m("",!0),t(e).isOpen===!0?(l(),p("div",{key:5,class:g(["modal fade modal-xl",{show:t(e).setOpen}]),style:{display:"block"},id:"modalEdit",tabindex:"-1","aria-labelledby":"modalEditLabel","aria-hidden":"true"},[a("div",Na,[a("div",$a,[a("div",Ka,[za,a("button",{class:"btn-close",type:"button",onClick:i[40]||(i[40]=(...s)=>t(e).setOpen&&t(e).setOpen(...s))})]),a("div",Ja,[a("div",Wa,[a("div",Ha,[a("img",{src:t(e).fotoDiri,alt:"foto-diri",class:"img-thumbnail",style:{height:"300px","object-fit":"cover"}},null,8,Ya)]),a("div",qa,[Ga,a("p",null,d(t(e).person.santri?t(e).person.santri.niup:"-"),1),Xa,a("p",null,d(t(e).person.santri?t(e).person.santri.nama_lengkap:"-"),1),Qa,a("p",null,d(t(e).person.santri?t(e).person.santri.jenis_kelamin:"-"),1),Za,a("p",null,d(t(e).person.santri?t(e).person.santri.raw.tempat_lahir+", "+t(e).person.santri.raw.tanggal_lahir:"-"),1),te,a("p",null,d(t(e).person.santri?`${t(e).person.santri.raw.umur} Tahun`:"-"),1)]),a("div",ae,[ee,a("p",null,d(t(e).person.santri?t(e).person.santri.wilayah:"-"),1),se,a("p",null,d(t(e).person.santri?t(e).person.santri.blok:"-"),1),oe,a("p",null,d(t(e).person.santri&&t(e).person.santri.raw.domisili_santri?t(e).person.santri.raw.domisili_santri[t(e).person.santri.raw.domisili_santri.length-1].kamar:"-"),1),ne,a("p",null,d(t(e).person.santri&&t(e).person.santri.raw.pendidikan?t(e).person.santri.raw.pendidikan[t(e).person.santri.raw.pendidikan.length-1].lembaga:"-"),1),ie,a("p",null,d(t(e).person.santri&&t(e).person.santri.raw.pendidikan?t(e).person.santri.raw.pendidikan[t(e).person.santri.raw.pendidikan.length-1].jurusan:"-"),1)]),a("div",re,[le,a("p",null,d(t(e).person.santri?t(e).person.santri.provinsi:"-"),1),de,a("p",null,d(t(e).person.santri?t(e).person.santri.kabupaten:"-"),1),pe,a("p",null,d(t(e).person.santri?t(e).person.santri.kecamatan:"-"),1),me,a("p",null,d(t(e).person.santri?t(e).person.santri.raw.kodepos:"-"),1),ue,a("p",null,d(t(e).person.santri?t(e).person.santri.raw.jalan:"-"),1)])]),ce,a("div",he,[a("div",be,[a("div",_e,[ye,a("div",ge,[a("div",null,[fe,a("b",ke,d(t(e).dataEdit.dropspot?t(e).dataEdit.dropspot.nama:"-"),1),ve,a("b",Ee,d(t(e).person.dropspot?t(e).person.dropspot.area.nama:"-"),1),De,a("b",xe,d(t(e).person.dropspot?t(e).person.dropspot.area.pic:"-"),1),Pe,a("b",we,d(t(e).person.dropspot?t(e).person.dropspot.area.no_hp:"-"),1)])])])]),a("div",Oe,[a("div",Ce,[Ie,a("div",Fe,[a("div",null,[a("div",null,[Se,a("b",je,d(t(e).dataEdit?k(t(e).dataEdit.dropspot.harga):"-"),1),Ae,a("b",Te,d(t(e)?k(t(e).dataEdit.jumlah_bayar):"-"),1),Le,t(e).dataEdit.status_bayar==="belum-lunas"?(l(),p("i",Ue,d(t(e).dataEdit.status_bayar==="belum-lunas"?"Belum Lunas":""),1)):m("",!0),t(e).dataEdit.status_bayar==="lunas"?(l(),p("i",Be,d(t(e).dataEdit.status_bayar),1)):m("",!0),t(e).dataEdit.status_bayar==="kurang"?(l(),p("i",Ve,d(t(e).dataEdit.status_bayar),1)):m("",!0),t(e).dataEdit.status_bayar==="lebih"?(l(),p("i",Me,d(t(e).dataEdit.status_bayar),1)):m("",!0)])])])])]),a("div",Re,[a("div",Ne,[$e,a("div",Ke,[a("div",null,[ze,a("b",Je,d(t(e).person.armada?t(e).person.armada.nama:"-"),1),We,a("b",He,d(t(e).person.armada&&t(e).person.armada.user?t(e).person.armada.user.nama_lengkap:"-"),1),Ye,a("b",qe,d(t(e).person.armada&&t(e).person.armada.user?t(e).person.armada.user.no_hp:"-"),1)])])])])])]),a("div",Ge,[a("button",{type:"button",class:"btn btn-sm btn-secondary",onClick:i[41]||(i[41]=(...s)=>t(e).setOpen&&t(e).setOpen(...s))}," Tutup ")])])])],2)):m("",!0)],64)}}};export{ts as default};
