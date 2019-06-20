const isName = (input) => {

	var re = /^[a-zA-Z ]{2,20}$/g;
	
	return (input.match(re));
}

const isEmail = (input) => {

	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;			
	
	return (input.match(re));
}


const isPassword = (input) => {

	var uppercase = /[A-Z]/g;
	var lowercase = /[a-z]/g;
	var digit = /[0-9]/g;
	//var special = /[!\$%\^&*@#_-\?]/g	
	//return ( input.match(uppercase) && input.match(lowercase) && input.match(digit) && (input.length >= 8) && (input.length <= 16) );

	return ( (input.length >= 8) && (input.length <= 16) );

}


export {isName, isEmail, isPassword};