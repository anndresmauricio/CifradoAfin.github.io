alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"

var ractive = new Ractive({
  el: '#container',
  template: '#template',
  data: {}
});


// Función para encontrar el máximo común divisor de dos números
function mcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return mcd(b, mod(a , b));
  }
}

// Función para encontrar el inverso multiplicativo de k modulo m
function inverso_multiplicativo(k, m) {
  for (let i = 1; i <= m; i++) {
    if (mod((k * i) , m) === 1) {
      return i;
    }
  }
  return null;
}

// Función para cifrar un mensaje decifrado con el cifrado afin
function cifrar_afin(mensaje, k, b) {
  const m = alfabeto.length;
  let mensaje_cifrado = "";

  for (let letra of mensaje) {
    if (alfabeto.includes(letra.toUpperCase())) {
      const a = alfabeto.indexOf(letra.toUpperCase());
      const letra_cifrada = alfabeto[(a * k + b) % m];
      mensaje_cifrado += letra_cifrada;
    } else {
      mensaje_cifrado += letra;
    }
  }

  return mensaje_cifrado;
}

// Función para descifrar un mensaje cifrado con el cifrado afin
function descifrar_afin(mensaje_cifrado, k, b) {

  const m = alfabeto.length;

  if(k === -1)
  {
    let ab = calcularAB(mensaje_cifrado);
    document.getElementById('value_a').value = k = ab.a;
    document.getElementById('value_b').value = b = ab.b;
  }

  let mensaje_descifrado = "";
  const k_inverso = inverso_multiplicativo(k, m);
  
  for (let letra of mensaje_cifrado) {

    if (alfabeto.includes(letra.toUpperCase())) {

      const c = alfabeto.indexOf(letra.toUpperCase());
      const value = ((c - b) * k_inverso);
      const module = mod(value , m);
      const letra_descifrada = alfabeto[module];

      mensaje_descifrado += letra_descifrada;
    } else {
      mensaje_descifrado += letra;
    }
  }
  return mensaje_descifrado;

}

function charValue(char) {
  char = char.toLowerCase();
  const value = char.charCodeAt(0) - 'a'.charCodeAt(0);
  if(value === 144) return 14;
  let valueIndex = (value >= 0 && value <= 25 || value === 144) ? value : -1;
  return valueIndex > 13 ?  valueIndex + 1 : valueIndex
}


String.prototype.limpia = function() {
  return this.normalize('NFD')
             .replace(/[\u0300-\u036f]/g, "")
             .replace(/[^a-zA-Z\s]/g, "")
             .replace(/\s+/g, " ")
             .trim();
}

String.prototype.letrasFrecuentes = function() {
  let freq = {};
  // contar la frecuencia de cada letra
  this.toLowerCase().replace(/[^a-z]/g, '').split('').forEach(function(char) {
    freq[char] = (freq[char] || 0) + 1;
  });

  // ordenar el objeto por valores
  let sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);

  // devolver las dos letras con mayor frecuencia
  let mostFrequentLetters = sortedFreq.slice(0, 2).map(arr => arr[0]);
  return mostFrequentLetters;
}

function mod(n,m) {
  return ((n % m) + m ) % m;
}

function calcularAB(text) {
  let frecuentes = text.letrasFrecuentes();

  document.getElementById('letrasFrecuentes').value = "1.  " + frecuentes[0].toUpperCase() + " \n" + 
                                                      "2.  " + frecuentes[1].toUpperCase() ;

  let best_a = frecuentes[0];
  let best_b = frecuentes[1];
  
  let modulo = alfabeto.length;

  let b = charValue(best_b) % modulo;
  let a = ((charValue(best_a) - b) * inverso_multiplicativo(charValue('e'), modulo)) % modulo;
  return {a: a, b: b};
}


function validaDatos(text, a, b) {

  if (text === '' || text === undefined || text === null) {
    alert('Debe ingresar un mensaje a cifrar');
    return false;
  }

  if (a === '' || a === undefined || a === null) {
    alert('Debe ingresar un valor valido para A ');
    return false;
  }

  if (b === '' || b === undefined || b === null) {
    alert('Debe ingresar un valor valido para B');
    return false;
  }

  return true;
}