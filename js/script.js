
/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){

	hideErrors();

	if(formHasErrors()){

		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){

	// Confirm that the user wants to reset the form.
	if ( confirm('Clear order?') ){

		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
	
	let errorFlag = false;

	// Validation of required fields
	let requiredFields = ["fullname", "tel", "email"];

	for(let i = 0; i < requiredFields.length; i++){
		let inputField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(inputField)){
			document.getElementById(requiredFields[i] + "_error").style.cssText = "display: block; visibility: visible";

			if(!errorFlag){
				inputField.focus();
				inputField.select();
			}

			errorFlag = true;
		}
	}

    // Validating a 10 digit phone number
    let regex = new RegExp(/^\d{10}$/);
	let telNumber = document.getElementById("tel").value;

	if(!regex.test(telNumber)){
		document.getElementById("telformat_error").style.cssText = "display: block; visibility: visible";

		if(!errorFlag){
			document.getElementById("tel").focus();
			document.getElementById("tel").select();
		}

		errorFlag = true;
	}

	// Validating Email field
	let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	let emailField = document.getElementById("email").value;

	if(!emailRegex.test(emailField)){
		
		document.getElementById("emailformat_error").style.cssText = "display: block; visibility: visible";

		if(!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}

	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors(){
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ ){
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input
 *
 * param   fieldValue A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldValue){
	// Check if the text field has a value
	if ( fieldValue.value == null || trim(fieldValue.value) == "" )
	{
		// Invalid entry
		return false;
	}
	
	// Valid entry
	return true;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Handles the load event of the document.
 */
function load(){

	// Hide all errors when function loads
	hideErrors();

	// Event listener for 'submit' button
	document.getElementById("contactForm").addEventListener("submit", validate);

	// Event listener for 'reset' button
	document.getElementById("contactForm").addEventListener("reset", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
