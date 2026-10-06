/* ============================================================
   PROYECTO: Aplicación de consola - Módulo 3
   Fundamentos de programación en JavaScript
   ============================================================
   Esta app corre en la consola del navegador y permite:
   - Realizar operaciones matemáticas básicas (funciones)
   - Gestionar una lista de estudiantes (arreglos y objetos)
   - Usar condicionales (if/switch) y bucles (for/while)
   - Validar las entradas del usuario
   ============================================================ */

console.log("%c=== APP DE CONSOLA - MÓDULO 3 ===", "font-weight:bold; font-size:14px;");
console.log("Escribí iniciarApp() en la consola para comenzar.\n");

/* ------------------------------------------------------------
   1) VARIABLES PREDEFINIDAS
   ------------------------------------------------------------ */
// Arreglo de objetos predefinido: cada estudiante tiene nombre y nota
const estudiantes = [
  { nombre: "Ana", nota: 8 },
  { nombre: "Luis", nota: 5 },
  { nombre: "Marta", nota: 9 },
  { nombre: "Pedro", nota: 4 },
];

// Objeto "calculadora" con métodos para cada operación matemática
const calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => (b !== 0 ? a / b : "Error: no se puede dividir por 0"),
  potencia: (a, b) => Math.pow(a, b),
};

/* ------------------------------------------------------------
   2) FUNCIONES DE VALIDACIÓN
   ------------------------------------------------------------ */

// Valida que el valor ingresado sea un número
function validarNumero(valor) {
  const numero = Number(valor);
  if (valor === null || valor.trim() === "" || isNaN(numero)) {
    return null; // valor inválido
  }
  return numero;
}

// Pide un número al usuario y repite hasta que sea válido
function pedirNumero(mensaje) {
  let entrada = prompt(mensaje);
  let numero = validarNumero(entrada);

  while (numero === null) {
    entrada = prompt("Valor inválido. " + mensaje + " (solo números)");
    numero = validarNumero(entrada);
  }
  return numero;
}

/* ------------------------------------------------------------
   3) MÓDULO DE OPERACIONES MATEMÁTICAS
   ------------------------------------------------------------ */

function moduloOperaciones() {
  const num1 = pedirNumero("Ingresá el primer número:");
  const num2 = pedirNumero("Ingresá el segundo número:");

  const opcion = prompt(
    "Elegí la operación:\n" +
      "1. Sumar\n" +
      "2. Restar\n" +
      "3. Multiplicar\n" +
      "4. Dividir\n" +
      "5. Potencia"
  );

  let resultado;

  // Estructura condicional switch para elegir la operación
  switch (opcion) {
    case "1":
      resultado = calculadora.sumar(num1, num2);
      break;
    case "2":
      resultado = calculadora.restar(num1, num2);
      break;
    case "3":
      resultado = calculadora.multiplicar(num1, num2);
      break;
    case "4":
      resultado = calculadora.dividir(num1, num2);
      break;
    case "5":
      resultado = calculadora.potencia(num1, num2);
      break;
    default:
      resultado = "Opción no válida";
  }

  console.log(`Resultado: ${resultado}`);
  alert(`Resultado: ${resultado}`);
  return resultado;
}

/* ------------------------------------------------------------
   4) MÓDULO DE ESTUDIANTES (ARREGLOS Y OBJETOS)
   ------------------------------------------------------------ */

// Recorre el arreglo con un for clásico y filtra aprobados (nota >= 6)
function obtenerAprobados(lista) {
  const aprobados = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nota >= 6) {
      aprobados.push(lista[i]);
    }
  }
  return aprobados;
}

// Recorre el arreglo con while para calcular el promedio general
function calcularPromedio(lista) {
  let suma = 0;
  let i = 0;
  while (i < lista.length) {
    suma += lista[i].nota;
    i++;
  }
  return lista.length > 0 ? (suma / lista.length).toFixed(2) : 0;
}

// Muestra la lista de estudiantes usando forEach
function mostrarEstudiantes(lista) {
  console.log("--- Lista de estudiantes ---");
  lista.forEach((est, index) => {
    console.log(`${index + 1}. ${est.nombre} - Nota: ${est.nota}`);
  });
}

// Agrega un nuevo estudiante al arreglo, con validaciones
function agregarEstudiante(lista) {
  let nombre = prompt("Nombre del estudiante:");

  // Validación: nombre no vacío
  while (!nombre || nombre.trim() === "") {
    nombre = prompt("El nombre no puede estar vacío. Ingresalo de nuevo:");
  }

  const nota = pedirNumero(`Nota de ${nombre} (0 a 10):`);

  lista.push({ nombre: nombre.trim(), nota: nota });
  console.log(`Estudiante "${nombre}" agregado con nota ${nota}.`);
  return lista;
}

function moduloEstudiantes() {
  const subOpcion = prompt(
    "Gestión de estudiantes:\n" +
      "1. Ver todos\n" +
      "2. Ver aprobados (nota >= 6)\n" +
      "3. Ver promedio general\n" +
      "4. Agregar estudiante"
  );

  switch (subOpcion) {
    case "1":
      mostrarEstudiantes(estudiantes);
      break;
    case "2":
      mostrarEstudiantes(obtenerAprobados(estudiantes));
      break;
    case "3":
      console.log(`Promedio general: ${calcularPromedio(estudiantes)}`);
      break;
    case "4":
      agregarEstudiante(estudiantes);
      break;
    default:
      console.log("Opción no válida.");
  }
}

/* ------------------------------------------------------------
   5) MENÚ PRINCIPAL (BUCLE DE LA APLICACIÓN)
   ------------------------------------------------------------ */

function iniciarApp() {
  let salir = false;

  // Bucle principal: se repite hasta que el usuario elija salir
  while (!salir) {
    const opcionMenu = prompt(
      "=== MENÚ PRINCIPAL ===\n" +
        "1. Operaciones matemáticas\n" +
        "2. Gestión de estudiantes\n" +
        "3. Salir"
    );

    if (opcionMenu === "1") {
      moduloOperaciones();
    } else if (opcionMenu === "2") {
      moduloEstudiantes();
    } else if (opcionMenu === "3") {
      salir = true;
      console.log("¡Gracias por usar la app!");
      alert("¡Gracias por usar la app!");
    } else {
      console.log("Opción no válida, intentá de nuevo.");
    }
  }
}

// Descomentá la siguiente línea para que arranque automáticamente al cargar
// iniciarApp();
