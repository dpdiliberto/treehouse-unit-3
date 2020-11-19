// ---------"Name" form section---------

// Select first input element and make focus by default
const name = document.querySelector('#name')
name.focus();

// Add an error message and make it hidden by default
name.insertAdjacentHTML('beforebegin', '<div id="required-name" class="required"></div>');
const nameErrorDiv = document.querySelector('#required-name');
nameErrorDiv.style.display = 'none';

// --------- "Email" form section ---------

// Add an error message and make it hidden by default
const email = document.querySelector('#mail');
email.insertAdjacentHTML('beforebegin', '<div id="required-email" class="required"></div>');
const emailErrorDiv = document.querySelector('#required-email');
emailErrorDiv.style.display = 'none';

// --------- "Job Role" form section ---------

//Make "other-title" field hidden by default
const otherTitleInput = document.querySelector('#other');
const otherTitleLabel = otherTitleInput.previousElementSibling;
otherTitleInput.style.display = 'none';
otherTitleLabel.style.display = 'none';

const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', e => {
    let jobRoleSelection = e.target.value;
    if (jobRoleSelection === 'other') {
        otherTitleInput.style.display = 'block';
        otherTitleLabel.style.display = 'block';
    } else {
        otherTitleInput.style.display = 'none';
        otherTitleLabel.style.display = 'none';
    }
});

// --------- "T-shirt Info" form section ---------

const designSelectElement = document.querySelector('#design');
const colorSelectOptions = document.querySelector('#color');
const designSelectElements = document.querySelectorAll('#design option');
const colorsSelectElements = document.querySelectorAll('#color option');
const designDefault = document.querySelector('[value="select-theme"]');

const jsPunsShirts = document.querySelectorAll('.shirt-colors .js-puns');
const heartJsShirts = document.querySelectorAll('.shirt-colors .heart-js');

colorsSelectElements.forEach(element => element.remove());

// Hide color options by default
colorSelectOptions.parentNode.style.display = 'none';


// T-shirt color updates based on chosen design
designSelectElement.addEventListener('change', e => {
    designDefault.remove();
    colorSelectOptions.parentNode.style.display = 'block';
    colorsSelectElements.forEach(element => element.remove());
    let selection = e.target.value;
    if (selection === 'js-puns') {
        jsPunsShirts.forEach(element => colorSelectOptions.appendChild(element));
        colorSelectOptions[0].selected = true;
    } 
    else {
        heartJsShirts.forEach(element => colorSelectOptions.appendChild(element));
        colorSelectOptions[0].selected = true;
    }
});

// ---------"Register for Activities" form section---------

const checkboxes = document.querySelectorAll('.activities input');

// Add cost label at bottom of activities section
const costLabel = document.createElement('label');
costLabel.style.display = 'none';
document.querySelector('.activities').appendChild(costLabel);
let activitiesCost = 0;

// Add an error message and make it hidden by default
let checkboxError = document.createElement('div');
let activityLegend = document.querySelector('[type="checkbox"]').parentNode.parentNode;
activityLegend.insertAdjacentHTML('afterbegin', '<label id="required-activity" class="required">Please select at least one activity.</label>');
const activityErrorMessage = document.querySelector('#required-activity')
activityErrorMessage.style.display = 'none';

// Add event listener to "Activities" section
document.querySelector('.activities').addEventListener('change', e => {
    const clicked = e.target;
    costLabel.style.display = 'block';
    costLabel.textContent = ``;

    const clickedTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = clicked.getAttribute('data-cost');

    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxTime = checkboxes[i].getAttribute('data-day-and-time');
        
        // Disable activities with competing schedules
        if (clickedTime === checkboxTime && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }

        // Calculate a total cost for selected activities
        } else if (clicked === checkboxes[i]) {
            if (clicked.checked) {
                activitiesCost += parseInt(clickedCost);
            } else {
                activitiesCost -= parseInt(clickedCost);
            }
        }
    }   
    costLabel.textContent = `Total: $${activitiesCost}`;
});

// ---------"Payment Info" form section---------

const paymentElement = document.querySelector('#payment');
const paymentOptionElements = document.querySelectorAll('#payment option');
const selectPaymentElement = document.querySelector('[value="select method"]');

// Disable ability to select "Select Payment Method", set default payment to "credit card", and hide other payment option divs
//selectPaymentElement.hidden = true;
selectPaymentElement.remove();

let selectedPayment = 'credit-card';
const payPalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin');

payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

const ccNum = document.querySelector('#cc-num');
const ccZIP = document.querySelector('#zip');
const ccCVV = document.querySelector('#cvv');

const creditCardInfo = document.querySelector('#credit-card');

// Create block of divs to contain the 3 possible payment error messages (credit card number, ZIP, CVV) and make invisible by default
creditCardInfo.insertAdjacentHTML('beforebegin', '<div id="required-cc-num" class="required"></div><div id="required-cc-zip" class="required"></div> <div id="required-cc-cvv" class="required"></div>');
const ccNumDiv = document.querySelector('#required-cc-num');
const ccZIPDiv = document.querySelector('#required-cc-zip');
const ccCVVDiv = document.querySelector('#required-cc-cvv');

function resetCCError() { 
    ccNumDiv.style.display = 'none';
    ccZIPDiv.style.display = 'none';
    ccCVVDiv.style.display = 'none';
    ccNum.style.borderColor = '#6f9ddc';
    ccZIP.style.borderColor = '#6f9ddc';
    ccCVV.style.borderColor = '#6f9ddc';
}
resetCCError();

// Add event listener to display selected payment option
paymentElement.addEventListener('change', e => {
    selectPaymentElement.remove();
    document.querySelector(`.${selectedPayment}`).style.display = 'none';
    selectedPayment = e.target.value;

    for (let i = 0; i < paymentOptionElements.length; i++) {
        if (selectedPayment === paymentOptionElements[i].value) {
                document.querySelector(`.${selectedPayment}`).style.display = 'block';
        }
    }

    // If user switches from "credit card" to "paypal", reset error state
    if (selectedPayment!=='credit-card') {
        resetCCError();
    }
})

// ---------Add form validations to each section---------

// Function to set valid and invalid input states for element
function validator (input, testCase, inputErrorDiv, message) {
    inputErrorDiv.textContent = message;
    if (testCase) {
        input.style.borderColor = '#6f9ddc';
        inputErrorDiv.style.display = 'none';
        return true;
    } else {
        input.style.borderColor = 'red';
        inputErrorDiv.style.display = 'block';
        return false;
    }
}

// ---------"Name" form validation---------

// Validate if the name field has at least 1 word character
const nameValidator = () => {
    const nameValue = name.value;
    return validator(name, /^\w+\s?(\w+)?$/.test(nameValue), nameErrorDiv, 'Please enter valid name.');
}

// ---------"Email" form validation---------

// Validate if the email field follows a valid format
const emailValidator = () => {
    const emailValue = email.value;
    return validator(email, /^[^@]+@[^@.]+\.(com|net|org)$/i.test(emailValue), emailErrorDiv, 'Please enter valid email address.');
}

// ---------"Register for Activites" form validation---------

// Validate the activities field
const checkboxValidator = () => {
    let checkedCount = 0;

    // Cycle through checkboxes to determine how many are checked
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedCount++;
        }
    }

    // Validate if at least 1 box is checked
    if (checkedCount > 0) {
        activityErrorMessage.style.display = 'none';
        return true;
    } else {
        activityErrorMessage.style.display = 'block';
        return false;
    }
}

// ---------"Payment Info" form validation---------

// Credit card number validator that tests if the credit card field is blank
const creditCardNumBlankValidator = () => {
    ccNumDiv.textContent = '- Please enter a credit card number.';
    if (/^\s*$/.test(ccNum.value)) {
        ccNum.style.borderColor = 'red';
        ccNumDiv.style.display = 'block';
        return true;
    } else {
        ccNum.style.borderColor = '#6f9ddc';
        ccNumDiv.style.display = 'none';
        return false;
    }
}

// Credit card number validator that tests that there are 13 to 16 digit characters inputted
const creditCardNumValidator = () => {
    return validator(ccNum, /^\d{13,16}$/.test(ccNum.value), ccNumDiv, '- Please enter valid 13 to 16 digit credit card number.');
}

// Credit card zip validator that tests that there are 5 digit characters inputted
const creditCardZipValidator = () => {
    return validator(ccZIP, /^\d{5}$/.test(ccZIP.value), ccZIPDiv, '- Please enter valid 5 digit zip code.');
}

// Credit card CVV validator that tests that there are 3 digit characters inputted
const creditCardCVVValidator = () => {
    return validator(ccCVV, /^\d{3}$/.test(ccCVV.value), ccCVVDiv, '- Please enter valid 3 digit CVV.');
}

const submit = document.querySelector('button');
const form = document.querySelector('form');

// ---------Run validations---------
// Runs real-time validations on the "Email" field
email.addEventListener('keyup', (e) => {
    const validated = emailValidator();
    if (validated) {
        emailErrorDiv.style.display = 'none';
    } else {
        emailErrorDiv.style.display = 'block';
    }
})

// Runs validations on each field when the button is submitted
form.addEventListener('submit', (e) => {

    nameValidator();
    emailValidator();
    checkboxValidator();
    if (selectedPayment === 'credit-card') {
        if (!creditCardNumBlankValidator()) {
            creditCardNumValidator();
        }
        creditCardZipValidator();
        creditCardCVVValidator();
    } else {
        resetCCError();
    }

   // Prevent form from submitting if any input is invalid  
    if (selectedPayment === 'credit-card') {
        if (!nameValidator() || !emailValidator() || !checkboxValidator() || creditCardNumBlankValidator() || !creditCardNumValidator() || !creditCardZipValidator() || !creditCardCVVValidator()) {
            e.preventDefault();
        }
    } else if (!nameValidator() || !emailValidator() || !checkboxValidator()) {
        e.preventDefault();
    }
});