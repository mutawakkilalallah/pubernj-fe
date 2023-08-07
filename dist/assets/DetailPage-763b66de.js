import{x as c,B as d,i as m,o as _,c as e,b as a,u as s,t as i,C as r,F as h,g as n}from"./index-b7bccb03.js";const u=c("table_penumpang_detail",{state:()=>({item:{},fotoDiri:""}),actions:{async getDataDetail(o){try{await d.get(`penumpang/${o}`).then(t=>{(t.data.code=200)&&(this.item=t.data.data,this.getImage(t.data.data.santri_uuid,"medium"))})}catch{}},async getImage(o){try{const t={responseType:"blob"};await d.get("santri/image/"+o,t).then(l=>{this.fotoDiri=URL.createObjectURL(l.data)})}catch(t){console.log("error",t)}}}}),p=a("h3",{class:"titlePage"},"Detail Data Penumpang",-1),b=a("hr",null,null,-1),g={class:"row"},y={class:"col-md-3"},w=["src"],v={class:"col-md-2"},k=a("b",null,"NIUP",-1),x=a("b",null,"Nama",-1),D=a("b",null,"Jenis Kelamin",-1),f=a("b",null,"Tetala",-1),P=a("b",null,"Umur",-1),j={class:"col-md-2"},T=a("b",null,"Wilayah",-1),B=a("b",null,"Daerah",-1),K=a("b",null,"Kamar",-1),N=a("b",null,"Lembaga",-1),R=a("b",null,"Jurusan",-1),U={class:"col-md-5"},I=a("b",null,"Provinsi",-1),J=a("b",null,"Kabupaten",-1),S=a("b",null,"Kecamatan",-1),$=a("b",null,"Kode Pos",-1),C=a("b",null,"Jalan",-1),L=a("hr",null,null,-1),F={class:"row"},V={class:"col-md-4"},A={class:"card"},E=a("div",{class:"card-header bg-primary text-white"},"Tujuan",-1),H={class:"card-body"},M=a("p",{class:"card-title mb-0"},"Dropspot :",-1),O={class:"card-text"},W=a("p",{class:"card-title mb-0 mt-3"},"Daerah :",-1),q={class:"card-text"},z=a("p",{class:"card-title mb-0 mt-3"},"PIC :",-1),G={class:"card-text mb-0"},Q=a("br",null,null,-1),X={class:"card-text"},Y={class:"col-md-4"},Z={class:"card"},tt=a("div",{class:"card-header bg-primary text-white"},"Pembayaran",-1),at={class:"card-body"},st=a("p",{class:"card-title mb-0"},"Tarif :",-1),it={class:"card-text"},et=a("p",{class:"card-title mb-0 mt-3"},"Jumlah Pembayaran :",-1),nt={class:"card-text"},ot=a("p",{class:"card-title mb-0 mt-3"},"Status Pembayaran :",-1),rt={key:0,class:"badge bg-danger"},lt={key:1,class:"badge bg-success"},dt={key:2,class:"badge bg-warning"},ct={key:3,class:"badge bg-info"},mt={class:"col-md-4"},_t={class:"card"},ht=a("div",{class:"card-header bg-primary text-white"},"Armada",-1),ut={class:"card-body"},pt=a("p",{class:"card-title mb-0"},"BUS :",-1),bt={class:"card-text"},gt=a("p",{class:"card-title mb-0 mt-3"},"Pendamping :",-1),yt={class:"card-text"},wt=a("p",{class:"card-title mb-0 mt-3"},"No. HP :",-1),vt={class:"card-text"},ft={__name:"DetailPage",setup(o){const t=u(),l=m();return _(()=>{t.getDataDetail(l.params.uuid)}),(kt,xt)=>(n(),e(h,null,[p,b,a("div",g,[a("div",y,[a("img",{src:s(t).fotoDiri,alt:"foto-diri",class:"img-thumbnail",style:{height:"300px","object-fit":"cover"}},null,8,w)]),a("div",v,[k,a("p",null,i(s(t).item.santri?s(t).item.santri.niup:"-"),1),x,a("p",null,i(s(t).item.santri?s(t).item.santri.nama_lengkap:"-"),1),D,a("p",null,i(s(t).item.santri?s(t).item.santri.jenis_kelamin:"-"),1),f,a("p",null,i(s(t).item.santri?s(t).item.santri.raw.tempat_lahir+", "+s(t).item.santri.raw.tanggal_lahir:"-"),1),P,a("p",null,i(s(t).item.santri?`${s(t).item.santri.raw.umur} Tahun`:"-"),1)]),a("div",j,[T,a("p",null,i(s(t).item.santri?s(t).item.santri.wilayah:"-"),1),B,a("p",null,i(s(t).item.santri?s(t).item.santri.blok:"-"),1),K,a("p",null,i(s(t).item.santri&&s(t).item.santri.raw.domisili_santri?s(t).item.santri.raw.domisili_santri[s(t).item.santri.raw.domisili_santri.length-1].kamar:"-"),1),N,a("p",null,i(s(t).item.santri&&s(t).item.santri.raw.pendidikan?s(t).item.santri.raw.pendidikan[s(t).item.santri.raw.pendidikan.length-1].lembaga:"-"),1),R,a("p",null,i(s(t).item.santri&&s(t).item.santri.raw.pendidikan?s(t).item.santri.raw.pendidikan[s(t).item.santri.raw.pendidikan.length-1].jurusan:"-"),1)]),a("div",U,[I,a("p",null,i(s(t).item.santri?s(t).item.santri.provinsi:"-"),1),J,a("p",null,i(s(t).item.santri?s(t).item.santri.kabupaten:"-"),1),S,a("p",null,i(s(t).item.santri?s(t).item.santri.kecamatan:"-"),1),$,a("p",null,i(s(t).item.santri?s(t).item.santri.raw.kodepos:"-"),1),C,a("p",null,i(s(t).item.santri?s(t).item.santri.raw.jalan:"-"),1)])]),L,a("div",F,[a("div",V,[a("div",A,[E,a("div",H,[M,a("b",O,i(s(t).item.dropspot?s(t).item.dropspot.nama:"-"),1),W,a("b",q,i(s(t).item.dropspot?s(t).item.dropspot.area.nama:"-"),1),z,a("b",G,i(s(t).item.dropspot?s(t).item.dropspot.area.pic:"-"),1),Q,a("b",X,i(s(t).item.dropspot?s(t).item.dropspot.area.no_hp:"-"),1)])])]),a("div",Y,[a("div",Z,[tt,a("div",at,[st,a("b",it,i(s(t).item.dropspot?`Rp. ${s(t).item.dropspot.harga}`:"-"),1),et,a("b",nt,i(s(t).item.dropspot?`Rp. ${s(t).item.jumlah_bayar}`:"-"),1),ot,s(t).item.status_bayar==="belum-lunas"?(n(),e("i",rt,i(s(t).item.status_bayar),1)):r("",!0),s(t).item.status_bayar==="lunas"?(n(),e("i",lt,i(s(t).item.status_bayar),1)):r("",!0),s(t).item.status_bayar==="kurang"?(n(),e("i",dt,i(s(t).item.status_bayar),1)):r("",!0),s(t).item.status_bayar==="lebih"?(n(),e("i",ct,i(s(t).item.status_bayar),1)):r("",!0)])])]),a("div",mt,[a("div",_t,[ht,a("div",ut,[pt,a("b",bt,i(s(t).item.armada?s(t).item.armada.nama:"-"),1),gt,a("b",yt,i(s(t).item.armada?s(t).item.armada.pendamping.nama:"-"),1),wt,a("b",vt,i(s(t).item.armada?s(t).item.armada.pendamping.no_hp:"-"),1)])])])])],64))}};export{ft as default};
