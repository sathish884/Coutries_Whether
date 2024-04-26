// Define a function createElements that creates HTML elements dynamically
function createElements(tagName, classes = [], textContent = '') {
    let element = document.createElement(tagName);

    // Add classes to the element if provided
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    // Set text content if provided
    if (textContent !== '') {
        element.textContent = textContent;
    }
    return element; // Return the created element
}

// Create a container div element with the class 'container'
const container = createElements('div', ['container']);

// Create an h1 element with classes 'text-center' and text content 'DOM Manipulation of RestCountries'
const h1Tag = createElements('h1', ['text-center'], 'DOM Manipulation of RestCountries');
// Set an ID attribute for the h1 element
h1Tag.setAttribute('id', 'title');

// Append the h1 element to the container
container.appendChild(h1Tag);

// Fetch data from the provided URL
fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
        return response.json(); // Parse the response as JSON
    })
    .then((data) => { // When data is retrieved successfully
        let rowCount = Math.ceil(data.length / 3); // Calculate the number of rows needed based on data length
console.log(data);
        // Loop through the rows
        for (let i = 0; i < rowCount; i++) {
            let row = createElements('div', ['row']); // Create a row div element

            // Loop through columns within the row
            for (let j = 0; j < 3; j++) {
                let dataIndex = i * 3 + j; // Calculate the index of the data
                if (dataIndex < data.length) { // Ensure the index is within the data length
                    let element = data[dataIndex]; // Get the data at the calculated index

                    // Create elements for displaying country information
                    let column = createElements('div', ['col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4']);
                    let card = createElements('div', ['card', 'border-5', 'h-100']);
                    let cardHead = createElements('div', ['card-header', 'p-3', 'text-center', 'bg-dark', 'text-white'], element.name.common);
                    let cardBody = createElements('div', ['card-body', 'text-center']);

                    let imgDiv = createElements('div', ['img-div', 'mb-3']);
                    let flagImage = createElements('img', ['img-thumbnail', 'card-img-top']);

                    // Set attributes for the flag image
                    flagImage.setAttribute('src', element.flags.png);
                    flagImage.setAttribute('alt', element.flags.alt);
                    // flagImage.setAttribute('width', '200');
                    // flagImage.setAttribute('height', '200');

                    // Append flag image to card body
                    imgDiv.appendChild(flagImage)
                    cardBody.appendChild(imgDiv);

                    // Create elements for country information
                    let nativeName = createElements('div', ['card-text']);
                    nativeName.innerText = `Native Name : ${element.name.official}`;
                    let region = createElements('div', ['card-text']);
                    region.innerText = `Region : ${element.region}`;
                    let population = createElements('div', ['card-text']);
                    population.innerText = `Population : ${element.population}`;
                    let countryCode = createElements('div', ['card-text'], `Country Code: ${element.idd.root}${element.idd.suffixes[0]}`);
                    let capital = createElements('div', ['card-text']);
                    capital.innerText = `Capital : ${element.capital}`;
                    let latlang = createElements('div', ['card-text'], `LatLang: (${element.latlng[0]}, ${element.latlng[1]})`);
                    let button = createElements('button', ['btn', 'btn-primary'], 'Check Weather');

                    // Add event listener for button click to fetch weather data
                    button.addEventListener('click', () => {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${element.name.common}&appid=ade33abcb26e1db2eba4c11dabe3a801&units=metric`)
                            .then((resp) => {
                                return resp.json(); // Parse response as JSON
                            })
                            .then((weatherData) => { // When weather data is retrieved successfully
                                console.log(weatherData);
                                // Display weather data in an alert
                                alert(`Weather : ${weatherData.weather[0].description}, Temperature : ${weatherData.main.temp} Wind Speed : ${weatherData.wind.speed}`);
                            })
                            .catch((err) => { // Handle errors in fetching weather data
                                console.log("Error fetching weather data", err);
                            });
                    });

                    // Append country information elements to card body
                    cardBody.appendChild(nativeName);
                    cardBody.appendChild(region);
                    cardBody.appendChild(population);
                    cardBody.appendChild(countryCode);
                    cardBody.appendChild(capital);
                    cardBody.appendChild(latlang);
                    cardBody.appendChild(button);

                    // Append card header and card body to card
                    card.appendChild(cardHead);
                    card.appendChild(cardBody);

                    // Append card to column and column to row
                    column.appendChild(card);
                    row.appendChild(column);
                }
            }
            // Append row to container
            container.appendChild(row);
        }
    })
    .catch((err) => { // Handle errors in fetching data
        console.log("Error fetching the data", err);
    });

// Append container to the document body
document.body.appendChild(container);
