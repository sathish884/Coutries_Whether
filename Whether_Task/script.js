function createElements(tagName, classes = [], textContent = '') {
    let element = document.createElement(tagName);

    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    if (textContent !== '') {
        element.textContent = textContent;
    }
    return element;
}

const container = createElements('div', ['container']);

const h1Tag = createElements('h1', ['text-center'], 'DOM Manipulation of RestCountries');
h1Tag.setAttribute('id', 'title');

container.appendChild(h1Tag);

fetch('https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let rowCount = Math.ceil(data.length / 3);

        for (let i = 0; i < rowCount; i++) {
            let row = createElements('div', ['row']);

            for (let j = 0; j < 3; j++) {
                let dataIndex = i * 3 + j;
                if (dataIndex < data.length) {
                    let element = data[dataIndex];

                    console.log(element);

                    let column = createElements('div', ['col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4']);

                    let card = createElements('div', ['card', 'border-5', 'h-100']);
                    let cardHead = createElements('div', ['card-header', 'p-3', 'text-center', 'bg-dark', 'text-white'], element.name);
                    let cardBody = createElements('div', ['card-body', 'text-center']);

                    let flagImage = createElements('img', ['img-thumbnail', 'mb-3', 'card-img-top']);
                    flagImage.setAttribute('src', element.flag);
                    flagImage.setAttribute('alt', element.name);
                    flagImage.setAttribute('width', '200');
                    flagImage.setAttribute('height', '100');

                    cardBody.appendChild(flagImage);

                    let nativeName = createElements('div', ['card-text']);
                    nativeName.innerText = `Native Name : ${element.nativeName}`;
                    let region = createElements('div', ['card-text']);
                    region.innerText = `Region : ${element.region}`;
                    let population = createElements('div', ['card-text']);
                    population.innerText = `Population : ${element.population}`;
                    let countryCode = createElements('div', ['card-text'], `Country Code: ${element.alpha3Code}`);
                    let capital = createElements('div', ['card-text']);
                    capital.innerText = `Capital : ${element.capital}`;
                    let latlang = createElements('div', ['card-text'], `LatLang: (${element.latlng[0]}, ${element.latlng[1]})`);
                    let button = createElements('button', ['btn', 'btn-primary'], 'Check Weather');

                    let countryName = element.name

                    button.addEventListener('click', () => {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.name}&appid=ade33abcb26e1db2eba4c11dabe3a801&units=metric`).then((resp) => {
                            return resp.json();
                        }).then((weatherData) => {
                            console.log(weatherData);
                            alert(`Weather : ${weatherData.weather[0].description}, Temperature : ${weatherData.main.temp} Wind Speed : ${weatherData.wind.speed}`)
                            // Display weather data here
                        }).catch((err) => {
                            console.log("Error fetching weather data", err);
                        });
                    });

                    cardBody.appendChild(nativeName);
                    cardBody.appendChild(region);
                    cardBody.appendChild(population);
                    cardBody.appendChild(countryCode);
                    cardBody.appendChild(capital);
                    cardBody.appendChild(latlang);
                    cardBody.appendChild(button);
                    card.appendChild(cardHead);
                    card.appendChild(cardBody);
                    column.appendChild(card);
                    row.appendChild(column);
                }
            }
            container.appendChild(row);
        }
    })
    .catch((err) => {
        console.log("Error fetching the data", err);
    });

document.body.appendChild(container);
