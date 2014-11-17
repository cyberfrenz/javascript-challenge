"use strict";

function onReady() {
	var elem = document.getElementsByName("state")[0];

	 for ( var i = 0; i < usStates.length; i++) {
	 	var opt = document.createElement("option");
	 	opt.value = usStates[i].code; 
	 	var text = document.createTextNode(usStates[i].name);
	 	opt.appendChild(text);
	 	elem.appendChild(opt);
	 }

	 var form = document.getElementById("signup");
	 form.addEventListener('submit', onSubmit);
	 var job = document.getElementById('occupation');
	 job.addEventListener('change', jobChange);
	 document.getElementById('cancelButton').addEventListener("click", redirect);
}

function onSubmit(evt) {
	var valid = true;
    try {
        valid = validateForm(this);
        }
    catch (exception) {
        valid = false;
        }
	if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city','state', 'zip', 'birthdate'];
    var valid = true;
    if( document.getElementById('occupation').value == 'other') {
        requiredFields.push('occupationOther');
    }
    for (var i =0; i < requiredFields.length; i++) {
        valid &= validateRequiredField(requiredFields[i], form);
    }
    return valid;
}

function validateRequiredField(field, form) {
	if (0 == form[field].value.trim().length) { // test to make sure nothing is empty 
        form[field].className = 'form-control invalid';
        return false;
    } else {
        if (field == 'zip') { // this tests for the correct zip code
        	var zipRegExp = new RegExp('^\\d{5}$');
        	if (form[field].value != zipRegExp) {
                form[field].className = 'form-control invalid';
        		return false;
        	}
        } else if (field == 'birthdate') { // test for correct birthdate
        	var currDate = new Date();
        	var bDay = new Date(form[field].value);
        	if(currDate.getFullYear() - bDay.getFullYear() < 13 || (currDate.getFullYear() - bDay.getFullYear() == 13 
        	&& ( currDate.getMonth() - bDay.getMonth() < 0  || currDate.getDate() - bDay.getDate() < 0 ) ) ) { // tests for wrong b days
        		form[field].className = 'form-control invalid';
                document.getElementById("birthdateMessage").innerHTML = "User must be 13 years or older to signup";
        		return false;
        	}
        } else { // returns true when everything is filled out
            form[field].className = 'form-control'; 
            return true;
            }
        }    
}
function redirect() {
    if (window.confirm("Are you sure?")) {
	window.location.href = "https://www.google.com/";
    }
}

function jobChange() {
    if (this.value == 'other') {
        document.getElementsByName('occupationOther')[0].style.display = 'inline'; 
    }
	
}

document.addEventListener('DOMContentLoaded', onReady);
