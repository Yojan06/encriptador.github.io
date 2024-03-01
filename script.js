const campo_texto = document.querySelector("#caja_principal");
const campo_mensaje = document.querySelector("#caja_secundaria");
const mensaje_advertencia = document.getElementById("advertencia");

const matriz_code = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];


//Esta funcion es llamada en el html con onclick = nombre de la funcion
function btnEncriptar(){
    const texto = encriptar(campo_texto.value);
    campo_mensaje.value = texto;
    document.getElementById("caja_secundaria").style.backgroundImage="linear-gradient(#04080a,#010203)";
}



function encriptar (fraseEncriptada){
    for (let i = 0 ; i<matriz_code.length; i++){ //Bucle
        if(fraseEncriptada.includes(matriz_code[i][0])){ //Condicion 
            fraseEncriptada = fraseEncriptada.replaceAll(
                matriz_code[i][0],
                matriz_code[i][1]
            )
        }

    }
    campo_texto.value = "";
    return fraseEncriptada
    
}

// API 

function btn_pegar(){
    navigator.clipboard.readText().then(textoPegado=>{
        campo_texto.value = textoPegado;
    })
}


function btnDesencriptar(){
    const texto_desencriptado = desEncriptar(campo_texto.value);
    campo_mensaje.value = texto_desencriptado;
    document.getElementById("caja_secundaria").style.backgroundImage="linear-gradient(#04080a,#010203)";
}

function desEncriptar (fraseDesencriptada){
    for (let i =0; i < matriz_code.length; i++){
        if (fraseDesencriptada.includes(matriz_code[i][1])){
            fraseDesencriptada = fraseDesencriptada.replaceAll(
                matriz_code[i][1],
                matriz_code[i][0]
            )
        }
    }
    campo_texto.value = "";
    return fraseDesencriptada;
}


function btnCopy(){
    textoCopiado = campo_mensaje.value;
    navigator.clipboard.writeText(textoCopiado);
    campo_mensaje.value = "";

    document.getElementById("caja_secundaria").style.backgroundImage="url(img/gift.gif),linear-gradient(#04080a,#010203)";
}

// Validacion para no permitir mayusculas, numeros ni caracteres especiales

function validacion(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàèìòùáéíóúäëïöüñ";

    especiales = [8,13,32];
    tecla_especial = false;

    for (var i in especiales){
        if (key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial){
        //alert("SOLO SE PERMITEN LETRAS MINUSCULAS");
        mensaje_advertencia.value = "SOLO SE PERMITEN LETRAS MINUSCULAS";
        mensaje_advertencia.disabled = false;
        return false;
    }

    mensaje_advertencia.value = "";
    mensaje_advertencia.disabled = true;
}

// Convertir de mayuscula a minuscula
// ESTA FUNCION SE LLAMA EN HTML CON oninput="conversion(this)"
function conversion(){
    campo_texto.value = campo_texto.value.toLowerCase();
}