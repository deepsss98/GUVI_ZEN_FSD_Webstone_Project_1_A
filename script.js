import {countryCodes} from "./countrycode.js"; // File imported to display name country name since the API returns only country code

const body=document.getElementById("body");
body.setAttribute("style","background-image: linear-gradient(to right top, #12eee0, #00ddff, #00c4ff, #57a2ff, #bd74f2, #c863de, #d051c8, #d53eb2, #b554c8, #8e65d5, #5f72db, #167ad8);background-attachment:fixed;");

const div=document.createElement("div");
div.classList.add("container")
document.body.append(div);

const title_head=document.createElement("h1");
title_head.setAttribute("id","title");
title_head.classList.add("text-center");
title_head.innerText="Nationalize API";

const para=document.createElement("p");
para.setAttribute("id","description");
para.classList.add("text-center");
para.innerText="Implementation of Nationalize API Search Filter Based on Name Search using async/await with fetch to find the nationality";

const div_inside=document.createElement("div");
div_inside.classList.add("container","d-flex","justify-content-center","mt-1","mb-1");

//Search text to be highlighted
const highlight=()=>{
document.getElementById("search").style.fontWeight="bold";
document.getElementById("search").style.color="blue";
document.getElementById("search").style.backgroundColor="yellow";
}

//Search filter Input Field box
const search_textbox=document.createElement("input");
search_textbox.setAttribute("type","text");
search_textbox.setAttribute("id","search");
search_textbox.setAttribute("placeholder","Search");
search_textbox.addEventListener("focus",highlight);
search_textbox.classList.add("w-50","border-success","border-1");

//Search button
const search_button=document.createElement("button");
search_button.classList.add("btn","btn-success");
search_button.innerText="Search";
div.append(search_button);
div_inside.append(search_textbox,search_button);

//Result Division Display
const div_display_result=document.createElement("div");
div_display_result.setAttribute("id","div_display_result");
div_display_result.classList.add("container","d-flex","justify-content-center","align-items-center","flex-row","flex-wrap");

div.append(title_head,para,div_inside,div_display_result);

const search_nationality_based_on_name= async() => {
try{
   let name_value=document.getElementById("search").value;
   if(name_value==="")
   {
    document.getElementById("div_display_result").innerHTML="";
    setTimeout(() => {
        alert("Name field is empty !! Please enter the name in search filter");
    }, 1000);
   }
   else
   {
   const nationalize_url=`https://api.nationalize.io?name=${name_value}`;
   const response = await fetch(nationalize_url);
   const result = await response.json(); //Converting raw data to readable stream
   display_countries(result);
   }
}
catch(err){
    console.error(err);
}
}

search_button.addEventListener("click",search_nationality_based_on_name);

const display_countries= (res) =>{
    let countries_and_probability_info="",cname=[];
if(res.country.length===0)
{
    countries_and_probability_info+=`
    <div class="shadow border border-dark border-2 rounded p-3 m-2" style="width: 20rem;height: 10rem;background-image: linear-gradient(to right top, #ccbe9b, #a4a789, #818f7a, #64766b, #4e5d59);">
    <div class="text-white fw-bold bg-secondary bg-gradient p-2 text-center">Nationality search for the name "${res.name}"</div>
    <div>
      <label for="" style="font-weight: bold;color: darkolivegreen;">No Nationality found for the searched Name "${res.name}"</label>
    </div>
    </div>`
}
else if(res.country.length>=2)
{
    for(let i=0;i<2;i++)
    {
        let flag=false;
        loop2:for(let j=0;j<Object.keys(countryCodes).length;j++)
        {
           if(res.country[i].country_id===Object.keys(countryCodes)[j])
           {
                cname.push(Object.values(countryCodes)[j]);
                flag=true;
                break loop2;
           }
        }
        flag===false?Object.keys(countryCodes):"";
    }
    for(let i=0;i<2;i++)
    {
    countries_and_probability_info+=`
    <div class="shadow border border-dark border-2 rounded p-3 m-2" style="width: 20rem;height: 10rem;background-image: linear-gradient(to right top, #ccbe9b, #a4a789, #818f7a, #64766b, #4e5d59);">
    <div class="text-white fw-bold bg-secondary bg-gradient p-2 text-center">Nationality search for the name "${res.name}" - Country ${i+1}</div>
    <div>
      <label for="" class="fw-bold text-dark">Country Name: </label>
      <label for="">${cname[i]}</label>
    </div>
    <div>
      <label for="" class="fw-bold text-dark">Probability: </label>
      <label for="">${res.country[i].probability}</label>
    </div>
    </div>`
     }
}
else
{
    let flag=false;
        loop2:for(let j=0;j<Object.keys(countryCodes).length;j++)
        {
           if(res.country[i].country_id===Object.keys(countryCodes)[j])
           {
                cname.push(Object.values(countryCodes)[j]);
                flag=true;
                break loop2;
           }
        }
        flag===false?Object.keys(countryCodes):"";


        countries_and_probability_info+=`
    <div class="shadow border border-dark border-2 rounded p-3 m-2" style="width: 20rem;height: 10rem;background-image: linear-gradient(to right top, #ccbe9b, #a4a789, #818f7a, #64766b, #4e5d59);">
    <div class="text-white fw-bold bg-secondary bg-gradient p-2 text-center">Nationality search for the name "${res.name}" - Only one country found</div>
    <div>
      <label for="" class="fw-bold text-dark">Country Name: </label>
      <label for="">${cname[0]}</label>
    </div>
    <div>
      <label for="" class="fw-bold text-dark">Probability: </label>
      <label for="">${res.country[0].probability}</label>
    </div>
    </div>`
}

document.getElementById("div_display_result").innerHTML=countries_and_probability_info;
   document.getElementById("search").style.color="";
   document.getElementById("search").style.backgroundColor="";
   document.getElementById("search").style.fontWeight="";

}
