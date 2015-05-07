/**
 * 
 */

function validatePassword(pThis) {
	pThis.setCustomValidity("");
	if (pThis.value.length < 6) {
		pThis.setCustomValidity("Password must contain 6 or more characters.");
	}	
}
function validateRePassword(pThis) {
	pThis.setCustomValidity("");
	if (pThis.value != $("#password").val()) {
		pThis.setCustomValidity("Password and Re-entered Password must be the same.");
	}	
}