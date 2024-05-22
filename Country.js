const countryName = new URLSearchParams(window.location.search).get('name')
const flagImage= document.querySelector('.country-details img')
const flagName=document.querySelector('.country-details h1')
const nativeName=document.querySelector('.native-Name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const subregion=document.querySelector('.subregion');
const capital=document.querySelector('.capital');
const tld=document.querySelector('.top-level-domain');
const currencies=document.querySelector('.currencies');
const language=document.querySelector('.languages');
const borderele=document.querySelector('.border-countries');

// console.log(countryName);
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {
     flagImage.src=data.flags.svg;
     flagName.innerText=data.name.common;
      if(data.name.nativeName){
        nativeName.innerText=Object.values(data.name.nativeName)[0].common;
      }else{
        nativeName.innerHTML=data.name.common;
      }
      population.innerText=data.population.toLocaleString('en-IN');
      region.innerText=data.region;
      if(data.subregion){
        subregion.innerText=data.subregion;
      }
      
      if(data.capital){
        capital.innerText=data.capital.join(', ');
      }
      
      tld.innerText=data.tld.join(', ');
      if(data.currencies){
        currencies.innerText=Object.values(data.currencies).map((currency)=>currency.name).join(', ');
      }
      if(data.languages){
        language.innerText=Object.values(data.languages).join(', ');
      }

      if(data.borders){
        data.borders.forEach((ele) => {
          fetch(`https://restcountries.com/v3.1/alpha/${ele}`)
          .then((res)=>res.json())
          .then(([borderCountry])=>{
            const tag=document.createElement('a');
            tag.innerText=borderCountry.name.common;
            tag.href=`Country.html?name=${borderCountry.name.common}`
            borderele.append(tag);
            // console.log(tag);
          })
        });
      }
    //  console.log(data);
  })