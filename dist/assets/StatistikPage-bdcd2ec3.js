import{x as i,C as n,N as p,a as u,g as h,c as l,b as r,k as c}from"./index-d4c3e7ab.js";const m=i("statistik",{state:()=>({stats:{namaDropspot:[],jumlahPutra:[],jumlahPutri:[],totalSantri:[]}}),actions:{async getData(){try{await n.get("keuangan").then(t=>{if(t.data.code=200){const a=t.data.data.keuanganByDropspot;for(let s=0;s<a.length;s++){const e=a[s];this.dataArmada(e.nama_dropspot),this.jumlahSantriPutra(e.jumlah_penumpang_putra),this.jumlahSantriPutri(e.jumlah_penumpang_putri),this.totalSantri(e.jumlah_penumpang_total)}}})}catch{}},dataArmada(t){this.stats.namaDropspot.push(t)},jumlahSantriPutra(t){this.stats.jumlahPutra.push(t)},jumlahSantriPutri(t){this.stats.jumlahPutri.push(t)},totalSantri(t){this.stats.totalSantri.push(t)}}});p();const d=r("h3",{class:"titlePage"},"Statistik Dropspot",-1),_={id:"chart"},g={__name:"StatistikPage",setup(t){const a=m();a.getData();const s={series:[{name:"Santri Putra",data:a.stats.jumlahPutra},{name:"Santri Putri",data:a.stats.jumlahPutri},{name:"Total Santri",data:a.stats.totalSantri}],chartOptions:{chart:{type:"bar",height:5e3},plotOptions:{bar:{horizontal:!0,dataLabels:{position:"top"}}},dataLabels:{enabled:!0,offsetX:-6,style:{fontSize:"12px",colors:["#fff"]}},stroke:{show:!0,width:1,colors:["#fff"]},tooltip:{shared:!0,intersect:!1},xaxis:{categories:a.stats.namaDropspot}}};return(e,S)=>{const o=u("apexchart");return h(),l("div",null,[d,r("div",_,[c(o,{type:"bar",height:"5500",options:s.chartOptions,series:s.series},null,8,["options","series"])])])}}};export{g as default};