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

const container = createElements('div', ['container', 'p-5']);

fetch('https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let rowCount = Math.ceil(data.length / 4);

        for (let i = 0; i < rowCount; i++) {
            let row = createElements('div', ['row', 'm-3']);

            for (let j = 0; j < 4; j++) {
                let dataIndex = i * 4 + j;
                if (dataIndex < data.length) {
                    let element = data[dataIndex];

                    let column = createElements('div', ['col-lg-3', 'col-sm-12']);

                    let card = createElements('div', ['card', 'border-5']);
                    let cardHead = createElements('div', ['card-header', 'p-3', 'text-center', 'bg-dark', 'text-white'], element.name);
                    let cardBody = createElements('div', ['card-body', 'text-center']);

                    let flagImage = createElements('img', ['img-thumbnail']);
                    flagImage.setAttribute('src', element.flag);
                    flagImage.setAttribute('alt', element.name);
                    flagImage.setAttribute('width', '100');
                    flagImage.setAttribute('height', 'auto');

                    cardBody.appendChild(flagImage);

                    let countryCode = createElements('p', [], `Country Code: ${element.alpha3Code}`);
                    let capital = createElements('p', [], `Capital: ${element.capital}`);
                    let region = createElements('p', [], `Region: ${element.region}`);
                    let population = createElements('p', [], `Population: ${element.population.toLocaleString()}`);
                    let button = createElements('button', ['btn', 'btn-primary'], 'Check Weather');

                    button.addEventListener('click', () => {
                        fetch(`https://openweathermap.org/api/${element.capital}`)
                            .then((resp) => {
                                return resp.json();
                            })
                            .then((weatherData) => {
                                console.log(weatherData);
                                // Display weather data here
                            })
                            .catch((err) => {
                                console.log("Error fetching weather data", err);
                            });
                    });

                    cardBody.appendChild(countryCode);
                    cardBody.appendChild(population);
                    cardBody.appendChild(capital);
                    cardBody.appendChild(region);
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
