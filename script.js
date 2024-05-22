const countriesContainer = document.querySelector('.countries-container');
const filterByRegion =  document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData


fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data)=> {
    renderCountries(data)
    allCountriesData = data
});

filterByRegion.addEventListener('change' , (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res)=>res.json())
    .then((data)=>{renderCountries(data)});
})


function renderCountries(data){
    countriesContainer.innerHTML='';
    data.forEach((element) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href=`\Country.html?name=${element.name.common}`

        // console.log(Object.values(element.name));
        countryCard.innerHTML = `<img src="${element.flags.svg}" alt="${element.name.common}">
                                    <div class="card-text">
                                        <h3 class="card-title">${element.name.common}</h3>
                                        <p><b>Population: </b> ${element.population.toLocaleString('en-IN')}</p>
                                        <p><b>Region: </b>${element.region}</p>
                                        <p><b>Capital: </b> ${element.capital?.[0]}</p>
                                    </div>`
        countriesContainer.append(countryCard)
    })
}


searchInput.addEventListener('input',  (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
  })
  themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
  })
  