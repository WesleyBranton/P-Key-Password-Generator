/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

var upp,low,num,sym;
var len;

document.getElementById("yes").addEventListener("click",function(event) {
	buttonpress(event);
});
document.getElementById("no").addEventListener("click",function(event) {
	buttonpress(event);
});
document.getElementById("back").addEventListener("click",function() {
	location.reload();
	reset();
});
document.getElementById("minus").addEventListener("click",sub);
document.getElementById("plus").addEventListener("click",add);
document.getElementById("length").addEventListener("click",startgen);
document.addEventListener("load",reset);

function reset() {
	document.getElementById("yes").disabled = false;
	document.getElementById("yes").removeAttribute("style");
	document.getElementById("no").disabled = false;
	document.getElementById("no").removeAttribute("style");
}

function buttonpress(e) {
	document.getElementById("yes").disabled = true;
	document.getElementById("no").disabled = true;
	var target = e.target;
	var answer = target.id;
	if (answer == "yes") {
		var buttonValue = true;
		e.target.style.backgroundColor = "#339966";
	} else {
		var buttonValue = false;
		e.target.style.backgroundColor = "#FF3333";
	}
	var step = document.getElementById("text").textContent;
	if (step == "Uppercase") {
		upp = buttonValue;
		setTimeout(function(){ uppercase(); }, 2000);
	} else if (step == "Lowercase") {
		low = buttonValue;
		setTimeout(function(){ lowercase(); }, 2000);
	} else if (step == "Numbers") {
		num = buttonValue;
		setTimeout(function(){ number(); }, 2000);
	} else if (step == "Symbols") {
		sym = buttonValue;
		setTimeout(function(){ symbol(); }, 2000);
	}
}

function uppercase() {
	document.getElementById("text").textContent = "Lowercase";
	reset();
}

function lowercase() {
	document.getElementById("text").textContent = "Numbers";
	reset();
}

function number() {
	document.getElementById("text").textContent = "Symbols";
	reset();
}

function symbol() {
	document.getElementById("text").textContent = "Length";
	document.getElementById("yes").style.display = "none";
	document.getElementById("no").style.display = "none";
	document.getElementById("lengthsection").style.display = "block";
}

function length() {
	document.getElementById("text").textContent = "Password";
	reset();
}

function password() {
	loadingrestore();
	var uppercase = upp;
	var lowercase = low;
	var numbers = num;
	var symbols = sym;
	var length = len;
	var password = "";
	var upperbank = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var lowerbank = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var numbank = ["1","2","3","4","5","6","7","8","9","0"];
	var symbbank = ["@","#","$","%","&"];
	var typeselect;
	var charselect;
	for (i = 0; i < length; i++) {
		typeselect = Math.floor((Math.random() * 4));
		if (typeselect == 0) {
			if (uppercase) {
				charselect = Math.floor((Math.random() * 26));
				password = password + upperbank[charselect];
			} else {
				i--;
			}
		} else if (typeselect == 1) {
			if (lowercase) {
				charselect = Math.floor((Math.random() * 26));
				password = password + lowerbank[charselect];
			} else {
				i--;
			}
		} else if (typeselect == 2) {
			if (numbers) {
				charselect = Math.floor((Math.random() * 10));
				password = password + numbank[charselect];
			} else {
				i--;
			}
		} else {
			if (password != "") {
				if (symbols) {
					charselect = Math.floor((Math.random() * 5));
					password = password + symbbank[charselect];
				} else {
					i--;
				}
			} else {
				i--;
			}
		}
	}
	setTimeout(function(){ outputpassword(password); }, 2000);
}

function outputpassword(password) {
	var output = document.getElementById("generatingscreen");
	var outputNote = document.getElementById("restart");
	var outputMessage = document.getElementById("message");
	output.style.backgroundColor = "white";
	output.style.color = "black";
	output.style.wordWrap = "break-word";
	outputNote.textContent = "Click to create new password...";
	outputNote.wordWrap = "normal";
	outputMessage.textContent = password;
	output.addEventListener("click", function(){location.reload();reset();}, false);
}

function add() {
	var lengthbox = document.getElementById("length");
	var lengthnum = lengthbox.textContent;
	lengthnum = parseInt(lengthnum);
	if (lengthnum < 40) {
		lengthnum = lengthnum + 1;
	}
	lengthbox.textContent = lengthnum;
}

function sub() {
	var lengthbox = document.getElementById("length");
	var lengthnum = lengthbox.textContent;
	lengthnum = parseInt(lengthnum);
	if (lengthnum > 1) {
		lengthnum = lengthnum - 1;
	}
	lengthbox.textContent = lengthnum;
}

function startgen() {
	len = document.getElementById("length").textContent;
	len = parseInt(len);
	var loading = document.getElementById("generatingscreen");
	var op = 0.1;  // initial opacity
    loading.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
			document.getElementById("lengthsection").style.display = "none";
			errorChecking();
        }
        loading.style.opacity = op;
        loading.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function errorChecking() {
	var error = document.getElementById("generatingscreen");
	var errorTitle = document.getElementById("bold");
	var errorNote = document.getElementById("restart");
	var errorMessage = document.getElementById("message");
	if (!upp && !low && !num && !sym) {
		error.style.backgroundColor = "#FF3333";
		errorTitle.textContent = "ERROR!";
		errorMessage.textContent = "You did not select any character types.";
		errorNote.textContent = "Click to restart...";
		error.addEventListener("click", function(){location.reload();reset();}, false);
	} else if (!upp && !low && !num) {
		error.style.backgroundColor = "#FF3333";
		errorTitle.textContent = "ERROR!";
		errorMessage.textContent = "Your password cannot contain only symbols.";
		errorNote.textContent = "Click to restart...";
		error.addEventListener("click", function(){location.reload();reset();}, false);
	} else if (len < 8) {
		error.style.backgroundColor = "#FF8533";
		errorTitle.textContent = "WARNING!";
		errorMessage.textContent = "It is recommended that your password be at least 8 characters long. This password may be insecure.";
		errorNote.textContent = "Click to continue...";
		error.addEventListener("click", function(){password();}, false);
	} else if ((upp && !low && !num && !sym) || (!upp && low && !num && !sym) || (!upp && !low && num && !sym) || (!upp && !low && !num && sym)) {
		error.style.backgroundColor = "#FF8533";
		errorTitle.textContent = "WARNING!";
		errorMessage.textContent = "You have selected only one character type for your password. This password may be insecure.";
		errorNote.textContent = "Click to continue...";
		error.addEventListener("click", function(){password();}, false);
	} else {
		password();
	}
}

function loadingrestore() {
	var loading = document.getElementById("generatingscreen");
	var loadingTitle = document.getElementById("bold");
	var loadingNote = document.getElementById("restart");
	var loadingMessage = document.getElementById("message");
	var lineBreak = document.getElementById("linebreak");
	loading.style.backgroundColor = "black";
	loadingTitle.textContent = "";
	loading.removeChild(loadingTitle);
	loading.removeChild(lineBreak);
	loadingNote.textContent = "Please wait...";
	loadingMessage.textContent = "Generating Password";
	loading.removeEventListener("click", function(){password();}, false);
	loading.removeEventListener("click", function(){location.reload();}, false);
}