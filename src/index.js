import './style.css';

function dataShow(dataList){
   let u_list=document.getElementById('datas');
    for(let u of dataList){
        let li=document.createElement('li');
        li.textContent=u.lastName.toUpperCase()+" "+u.firstName+" "+u.height+", "+u.eyeColor;
        u_list.appendChild(li);
    }
}


function tableShow(dataList){
    let u_table=document.getElementById('contacts');
    console.log(dataList);
    for(let u of dataList){
        // let uName=u.username;
        // let email=u.email;
        // let phone=u.phone;
        let tr=document.createElement('tr');
        let td_name=document.createElement("td");
        let td_email=document.createElement("td");
        let td_phone=document.createElement("td");
        u_table.appendChild(tr);
        td_name.textContent=u.username;
        u_table.appendChild(td_name);
        td_email.textContent=u.email;
        u_table.appendChild(td_email);
        td_phone.textContent=u.phone;
        u_table.appendChild(td_phone);

    }

}

document.addEventListener('DOMContentLoaded', async()=>{
    //document.getElementById('datas').textContent="";
    document.getElementById('show_alpha').addEventListener('click',async()=>{
        let response=await fetch('/users.json');
        let result=await response.json();
        let datas=result.users.sort(function(a,b){
            if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return -1; }
            if(a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return 1; }
            return 0;  
        });
        dataShow(datas);
    })

    document.getElementById('show_contacts').addEventListener('click',async()=>{
        let response=await fetch('/users.json');
        let result=await response.json();
        let datas=result.users;
        tableShow(datas);
    })

    document.getElementById('show_height').addEventListener('click', async()=>{
    let i_height=document.getElementById('i_height').value;
    //console.log(i_height);
    let response = await fetch('/users.json');
    let result = await response.json();
    let datas=result.users.filter(e=>e.height>i_height);
    let weight=0;
    for(let u of datas){
        weight+=u.weight;
    }
    //dataShow(datas);
    document.getElementById('weight').textContent=weight;
    })

    document.getElementById('show_eyes').addEventListener('click', async()=>{
        let response = await fetch('/users.json');
        let result = await response.json();
        let datas=result.users.filter(e=>e.eyeColor=="Brown");
        let eyes=datas.length;
        dataShow(datas)
        document.getElementById('eyes').textContent=eyes;
        })

})

