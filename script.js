const searchh = async() =>{
    let url ="https://api-mobilespecs.azharimm.site/v2/brands";

    try{
        let fetch_url = await fetch(url);
        let convert = await fetch_url.json();
        find(convert);
    }catch(err){
         document.getElementById('result').innerHTML="Not Found"
    }
}

function find({data}) {

    let input = document.getElementById('inputfield').value;
   data.filter(async(datas)=>{
      if(datas.brand_name.toLowerCase()===input.toLowerCase()){
        try{
         let fetch_url = await fetch(datas.detail);
         let convert = await fetch_url.json();
         let data = convert.data.phones;
         fetchphones(data);
        }catch(err){
         document.getElementById('result').innerHTML="Not Found"
        }
      }
   });
}

function fetchphones(phones){
    let result= document.getElementById('result');
    result.innerHTML=`<hr id="hrr"> <div id="sub"></div>`
     phones.map(async(phone)=>{
    let fetch_url = await fetch(phone.detail);
    let convert = await fetch_url.json();
    let data = convert.data;
     show(data);
  });
}

function show({phone_name,thumbnail,specifications,os}){
    
    let sub= document.getElementById('sub');
    let div1= document.createElement('div');
    div1.id="card";
    sub.appendChild(div1);
    div1.innerHTML= 
    `<img src="${thumbnail}" alt="${phone_name}">
    <h5>${phone_name}</h5>
    <p>Internal: ${specifications[5].specs[1].val}</p>
    <p>Chip: ${specifications[4].specs[1].val}</p>
    <p>OS: ${os}</p>`
}

document.getElementById('inputfield').addEventListener("keyup",function(event){
  
    if(event.key=="Enter"){
      searchh();
    }
  });