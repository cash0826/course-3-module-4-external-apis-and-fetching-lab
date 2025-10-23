// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

function fetchWeatherAlerts(state) {
    fetch(`${weatherApi}${state}`)
    .then(response =>  response.json())
    .then(data => displayAlerts(data))
    .catch(errorObject => displayError(errorObject.message))
};

function displayAlerts(data) {
    if(data.features.length === 0) {
        const alertsDisplay = document.querySelector('#alerts-display');
        const noAlertsMessage = document.createElement('h2');
        noAlertsMessage.textContent = `No active weather alerts`;
        alertsDisplay.appendChild(noAlertsMessage);
        return;
    } else {
        const summary = document.createElement('h2');
        summary.textContent = `${data.title}: ${data.features.length}`;
        const alertList = document.createElement('ul');
        data.features.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${feature.properties.headline}</strong><br/>`;
            alertList.appendChild(listItem);
        });
        const alertsDisplay = document.querySelector('#alerts-display');
        alertsDisplay.appendChild(summary);
        alertsDisplay.appendChild(alertList);
}};

function validateStateCode(stateCode) {
    const validStates = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
        "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
        "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
        "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
        "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
    ];
    if (stateCode.length !== 2) {
        displayError("Please enter a valid 2-letter state code.");
        return false;
    } else if (!validStates.includes(stateCode)) {
        displayError("Please enter a valid state abbreviation");
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const stateInput = document.querySelector('#state-input');
    const fetchButton = document.querySelector('#fetch-alerts');
    fetchButton.addEventListener('click', () => {
        const stateCode = stateInput.value.trim().toUpperCase();
        clearInputs();
        if (validateStateCode(stateCode)) {
            fetchWeatherAlerts(stateCode);
        }
    });
    stateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            fetchButton.click();
        }
    });
});

//Clear and Reset the UI. Clear the input field and any previous results.
function clearInputs() {
    const stateInput = document.querySelector('#state-input');
    const alertsDisplay = document.querySelector('#alerts-display');
    const errorMessage = document.querySelector('#error-message');
    alertsDisplay.innerHTML = '';
    stateInput.value = '';
    alertsDisplay.innerHTML = '';
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
};

//Error Handling
function displayError(message) {
    const errorElement = document.querySelector('#error-message');
    errorElement.textContent = message;
    errorElement.classList.add('error');
    errorElement.classList.remove('hidden');
};