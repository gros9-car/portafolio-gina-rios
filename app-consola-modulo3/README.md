# Proyecto: Aplicación de consola — Módulo 3

**Módulo 3: Fundamentos de programación en JavaScript**

## Descripción

Aplicación en JavaScript que corre en la consola del navegador. Combina dos módulos:

1. **Operaciones matemáticas**: suma, resta, multiplicación, división y potencia.
2. **Gestión de estudiantes**: manejo de un arreglo de objetos (nombre y nota), con listado, filtrado de aprobados, cálculo de promedio y alta de nuevos estudiantes.

Todo se maneja mediante un menú interactivo por `prompt()`, con validación de datos en cada paso.

## Cómo ejecutarlo

1. Abrí el archivo `index.html` en el navegador.
2. Abrí la consola de desarrollador (F12 → pestaña "Console").
3. Escribí `iniciarApp()` y presioná Enter.
4. Seguí las instrucciones que aparecen en los cuadros de diálogo (`prompt`).

## Estructura del código (`script.js`)

| Sección | Contenido |
|---|---|
| Variables predefinidas | Arreglo `estudiantes` (objetos) y objeto `calculadora` con las operaciones |
| Validaciones | `validarNumero()`, `pedirNumero()` — evitan que se ingresen valores no numéricos o vacíos |
| Operaciones matemáticas | `moduloOperaciones()` — usa `switch` para elegir la operación y llama a los métodos de `calculadora` |
| Estudiantes | `obtenerAprobados()` (usa `for`), `calcularPromedio()` (usa `while`), `mostrarEstudiantes()` (usa `forEach`), `agregarEstudiante()` |
| Menú principal | `iniciarApp()` — bucle `while` que muestra el menú hasta que el usuario elige salir |

## Conceptos de JavaScript aplicados

- **Variables**: `let` y `const`.
- **Condicionales**: `if / else`, `switch`.
- **Bucles**: `for`, `while`, `forEach`.
- **Funciones**: funciones puras, funciones flecha, funciones que llaman a otras funciones (modularización).
- **Arreglos y objetos**: arreglo de objetos `estudiantes`, objeto `calculadora` con métodos.
- **Validaciones**: control de entradas vacías o no numéricas antes de operar.

## Ejemplo de uso

```
iniciarApp()

=== MENÚ PRINCIPAL ===
1. Operaciones matemáticas
2. Gestión de estudiantes
3. Salir
> 1

Ingresá el primer número: 10
Ingresá el segundo número: 5
Elegí la operación:
1. Sumar ... 5. Potencia
> 1

Resultado: 15
```

## Entregables incluidos

- Código fuente: `index.html`, `script.js`
- Este archivo `README.md` con la explicación de la funcionalidad
- (Se recomienda agregar capturas de pantalla de la ejecución al momento de entregar)

## Posibles mejoras futuras

- Persistir la lista de estudiantes en `localStorage`.
- Agregar más operaciones (raíz cuadrada, módulo, etc.).
- Migrar la interfaz de `prompt/alert` a una interfaz HTML con formularios.
