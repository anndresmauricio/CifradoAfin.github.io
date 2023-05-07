

const now = new Date();
const year = now.getFullYear();
const day = now.getDate();
const month = now.getMonth() + 1;

const secretKey = `seguridad${day}${month}${year}`;

function doLogin() {
    try {

        let userName = document.getElementById("inputNameLogin")?.value.toLowerCase();
        let userPass = document.getElementById("inputPassLogin")?.value;

        if (userName === secretKey || userPass === secretKey) {
            sessionStorage.clear()
            alert("sessionStorage limpio")
            cleanForm();
            return;
        }

        let userNameSS = sessionStorage.getItem('userName')?.toString().toLowerCase();
        let userMailSS = sessionStorage.getItem('userMail')?.toString().toLowerCase();
        let userPassSS = sessionStorage.getItem('userPass')?.toString();
        let attemptsSS = parseInt(sessionStorage.getItem('attempts'))
        let delayTimeSS  = parseInt(sessionStorage.getItem('timer')) 


        if (userNameSS === null || userNameSS === undefined) {
            alert("Ningun usuario registrado, Por Favor Registrarse")
            cleanForm();
            return;
        }

        if ((userName === userNameSS || userName === userMailSS) && userPass === decrypt(userPassSS)) {
            alert("Inicio de Sesion Correcto");
            window.location.href = 'index.html';
            cleanForm();
            return;
        }

        if (attemptsSS <= 3 && attemptsSS > 0) {
            sessionStorage.setItem('attempts', (attemptsSS - 1));
            cleanForm();
            alert("Datos ingresados errados, intentar de nuevo");
        }
        else if (attemptsSS === 0) {
            alert(`Supero la cantidad maxima de intentos permitidos, dispositivo bloqueado por: ${delayTimeSS/60000} minutos`);
            sessionStorage.setItem('attempts', '3');
            sessionStorage.setItem('timer', (delayTimeSS + 30000));
            cleanForm();
            disableScreen();
        }
    } catch (error) {
        alert(`Error interno al autenticar ${error}`);
    }
}

function cleanForm(){
    document.getElementById("inputNameLogin").value     = '';
    document.getElementById("inputPassLogin").value     = '';
    document.getElementById("inputNameRegister").value  = '';
    document.getElementById("inputMailRegister").value  = '';
    document.getElementById("inputPassRegister").value  = '';
}

function encrypt(text) {
    const encodedText = btoa(text);
    const encrypted = encodedText.split('').reverse().join('') + secretKey;
    return encrypted;
}

function decrypt(encryptedText) {
    const withoutKey = encryptedText.substring(0, encryptedText.length - secretKey.length);
    const decodedText = atob(withoutKey.split('').reverse().join(''));
    return decodedText;
}

function initUser() {

    if (!confirm("¿Desea continuar con el registro?")) return;

    let userName = document.getElementById("inputNameRegister").value;
    let userMail = document.getElementById("inputMailRegister").value;
    let userPass = document.getElementById("inputPassRegister").value;

    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userMail', userMail);
    sessionStorage.setItem('userPass', encrypt(userPass));
    sessionStorage.setItem('attempts', '3');
    // sessionStorage.setItem('timer', '180000');
    sessionStorage.setItem('timer', '30000');

    alert(`usuario: ${userName} creado correctamente: `)
}


function disableScreen() {
    try {

        let delayTime = parseInt(sessionStorage.getItem('timer')) 

        var div = document.createElement("div");
        div.className += "overlay";
        document.body.appendChild(div);

        setTimeout(() => {
            console.log("Delayed for 1 second.");
            div.remove();
        }, delayTime);

    } catch (error) {

    }
}





