var celdaSeleccionada;
var turno = 'blanco';

function agregarPieza(celda, tipo) {
    // Elimina cualquier pieza existente en la celda    
    celda.innerHTML = '';

    // Crea la imagen de la pieza
    var img = document.createElement("img");
    img.alt = tipo;
    img.className = "pieza-img";

    // Asigna la ruta de la imagen según el tipo de pieza
    switch (tipo) {
        case 'peonBlanco':
            img.src = 'images/peonBlanco.png';
            break;
        case 'peonNegro':
            img.src = 'images/peonNegro.png';
            break;
        case 'caballoBlanco':
            img.src = 'images/caballoBlanco.png';
            break;
        case 'caballoNegro':
            img.src = 'images/caballoNegro.png';
            break;
        case 'alfilBlanco':
            img.src = 'images/alfilBlanco.png';
            break;
        case 'alfilNegro':
            img.src = 'images/alfilNegro.png';
            break;
        case 'torreBlanco':
            img.src = 'images/torreBlanco.png';
            break;
        case 'torreNegro':
            img.src = 'images/torreNegro.png';
            break;
        case 'reinaBlanco':
            img.src = 'images/reinaBlanco.png';
            break;
        case 'reinaNegro':
            img.src = 'images/reinaNegro.png';
            break;
        case 'reyBlanco':
            img.src = 'images/reyBlanco.png';
            break;
        case 'reyNegro':
            img.src = 'images/reyNegro.png';
            break;
        default:
            console.error('Tipo de pieza no válido');
            return;
    }

    // Agrega la imagen a la celda
    celda.appendChild(img);
}

// Llama a la función según sea necesario para agregar las piezas en sus lugares
function inicializarTablero() {
    var tablero = document.getElementById('tablero');

    // Agrega peones blancos
    for (let i = 1; i <= 8; i++) {
        agregarPieza(tablero.rows[2].cells[i], 'peonNegro');
    }

    // Agrega peones negros
    for (let i = 1; i <= 8; i++) {
        agregarPieza(tablero.rows[7].cells[i], 'peonBlanco');
    }

    // Agrega las otras piezas negras
    agregarPieza(tablero.rows[1].cells[1], 'torreNegro');
    agregarPieza(tablero.rows[1].cells[2], 'caballoNegro');
    agregarPieza(tablero.rows[1].cells[3], 'alfilNegro');
    agregarPieza(tablero.rows[1].cells[4], 'reinaNegro');
    agregarPieza(tablero.rows[1].cells[5], 'reyNegro');
    agregarPieza(tablero.rows[1].cells[6], 'alfilNegro');
    agregarPieza(tablero.rows[1].cells[7], 'caballoNegro');
    agregarPieza(tablero.rows[1].cells[8], 'torreNegro');

    // Agrega las otras piezas blancas
    agregarPieza(tablero.rows[8].cells[1], 'torreBlanco');
    agregarPieza(tablero.rows[8].cells[2], 'caballoBlanco');
    agregarPieza(tablero.rows[8].cells[3], 'alfilBlanco');
    agregarPieza(tablero.rows[8].cells[4], 'reinaBlanco');
    agregarPieza(tablero.rows[8].cells[5], 'reyBlanco');
    agregarPieza(tablero.rows[8].cells[6], 'alfilBlanco');
    agregarPieza(tablero.rows[8].cells[7], 'caballoBlanco');
    agregarPieza(tablero.rows[8].cells[8], 'torreBlanco');

    //test
    agregarPieza(tablero.rows[4].cells[4], 'torreBlanco');
}

// click en la celda
function clickEnCelda(celda) {
    // Si la celda ya tiene una pieza, no hace nada

    if (celda.classList.contains('movimientoPosible')) {
        moverPieza(celdaSeleccionada, celda);
        return;
    }

    if (celda.classList.contains('movimientoAtaque')) {
        moverPieza(celdaSeleccionada, celda);
        return;
    }

    if (!celda.querySelector('.pieza-img')) {
        return;
    }

    // Elimina los movimientos posibles anteriores
    eliminarMovimientosPosibles();

    //guarda la celda seleccionada para mover
    celdaSeleccionada = celda;

    // Obtiene la pieza de la celda
    var pieza = celda.querySelector('.pieza-img');
    var color = pieza.alt.includes('Blanco') ? 'blanco' : 'negro';

    if (color === 'blanco' && turno === 'blanco') {
        switch (pieza.alt) {
            case 'peonBlanco':
                mostrarMovimientosPeon(celda, 'peonBlanco');
                break;
            case 'caballoBlanco':
                mostrarMovimientosCaballo(celda);
                break;
            case 'alfilBlanco':
                mostrarMovimientosAlfil(celda);
                break;
            case 'torreBlanco':
                mostrarMovimientosTorre(celda);
                break;
            case 'reinaBlanco':
                mostrarMovimientosReina(celda);
                break;
            case 'reyBlanco':
                mostrarMovimientosRey(celda);
                break;
            default:
                console.error('Tipo de pieza no válido');
                return;
        }
    } else if (color === 'negro' && turno === 'negro'){
        switch (pieza.alt) {
            case 'peonNegro':
                mostrarMovimientosPeon(celda, 'peonNegro');
                break;
            case 'caballoNegro':
                mostrarMovimientosCaballo(celda);
                break;
            case 'alfilNegro':
                mostrarMovimientosAlfil(celda);
                break;
            case 'torreNegro':
                mostrarMovimientosTorre(celda);
                break;
            case 'reinaNegro':
                mostrarMovimientosReina(celda);
                break;
            case 'reyNegro':
                mostrarMovimientosRey(celda);
                break;
            default:
                console.error('Tipo de pieza no válido');
                return;
        }
    }
}


function eliminarMovimientosPosibles() {
    var movimientosPosibles = document.querySelectorAll('.movimientoPosible');
    for (let i = 0; i < movimientosPosibles.length; i++) {
        movimientosPosibles[i].classList.remove('movimientoPosible');
    }
    var movimientosAtaque = document.querySelectorAll('.movimientoAtaque');
    for (let i = 0; i < movimientosAtaque.length; i++) {
        movimientosAtaque[i].classList.remove('movimientoAtaque');
    }
}

// mover pieza
function moverPieza(celdaOrigen, celdaDestino) {
    // Mueve la pieza a la celda de destino
    
    var piezaOrigen = celdaOrigen.querySelector('.pieza-img');
    var colorOrigen = piezaOrigen.alt.includes('Blanco') ? 'blanco' : 'negro';

    if (celdaDestino.querySelector('.pieza-img')) {
        var piezaDestino = celdaDestino.querySelector('.pieza-img');
        var colorDestino = piezaDestino.alt.includes('Blanco') ? 'blanco' : 'negro';
    }

    if (colorOrigen === colorDestino) {
        return;
    }
    celdaDestino.innerHTML = '';
    celdaOrigen.innerHTML = '';
    celdaDestino.appendChild(piezaOrigen);
    eliminarMovimientosPosibles();
    
    //cambiar turno
    if (turno === 'blanco') {
        turno = 'negro';
    } else if (turno === 'negro') {
        turno = 'blanco';
    }
    var turnoMostrador = document.getElementById('turnoMostrador');
    turnoMostrador.innerText = "Turno: " + turno;
}

// Muestra los movimientos posibles para el peón blanco
function mostrarMovimientosPeon(celda, tipo) {
    // Obtiene la fila y columna de la celda
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Funcion para verificar si es valido la celdas de movimiento
    function checarColocar(row, col) {
        var tablero = document.getElementById("tablero");
        if (row >= 1 && row < tablero.rows.length - 1 && col >= 1 && col < tablero.rows[row].cells.length - 1) {
            
            var targetCell = tablero.rows[row].cells[col];
            if (!targetCell.querySelector('.pieza-img')) {
                targetCell.classList.add("movimientoPosible");
            }
        }
    }

    // Funcion para verificar si hay una pieza enemiga
    function checarAtacar(row, col, tipo) {
        var tablero = document.getElementById("tablero");
        if (row >= 1 && row < tablero.rows.length - 1 && col >= 1 && col < tablero.rows[row].cells.length - 1) {
            var targetCell = tablero.rows[row].cells[col];
            if (!targetCell.querySelector('.pieza-img')) {
                return;
            }

            var pieza = targetCell.querySelector('.pieza-img').alt;
            var color = pieza.includes('Blanco') ? 'blanco' : 'negro';
            
            if (tipo !== color){
                targetCell.classList.add("movimientoAtaque");
            }
            
        }
    }

    if (tipo === 'peonBlanco') {
        checarColocar(fila - 1, columna);
        if (fila === 7) {
            checarColocar(fila - 2, columna);
        }
        checarAtacar(fila - 1, columna - 1, 'blanco');
        checarAtacar(fila - 1, columna + 1, 'blanco');

    } else if (tipo === 'peonNegro') {
        checarColocar(fila + 1, columna);
        if (fila === 2) {
            checarColocar(fila + 2, columna);
        }
        checarAtacar(fila + 1, columna - 1, 'negro');
        checarAtacar(fila + 1, columna + 1, 'negro');
    }
}

// Muestra los movimientos posibles para el caballo 
function mostrarMovimientosCaballo(celda) {
    // Obtiene la fila y columna de la celda
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Funcion para verificar si es valido la celdas de movimiento
    function checarColocar(row, col, tipo) {
        var tablero = document.getElementById("tablero");
        if (row >= 1 && row < tablero.rows.length - 1 && col >= 1 && col < tablero.rows[row].cells.length - 1) {
            
            var targetCell = tablero.rows[row].cells[col];
            if (!targetCell.querySelector('.pieza-img')) {
                targetCell.classList.add("movimientoPosible");
                return;
            }

            var pieza = targetCell.querySelector('.pieza-img').alt;
            var color = pieza.includes('Blanco') ? 'blanco' : 'negro';
            
            if (tipo !== color){
                targetCell.classList.add("movimientoAtaque");
            }

        }
    }

    // hacia arriba
    checarColocar(fila - 2, columna + 1, turno);
    checarColocar(fila - 2, columna - 1, turno);

    // hacia abajo
    checarColocar(fila + 2, columna + 1, turno);
    checarColocar(fila + 2, columna - 1, turno);

    // hacia la derecha
    checarColocar(fila + 1, columna + 2, turno);
    checarColocar(fila - 1, columna + 2, turno);

    // hacia la izquierda
    checarColocar(fila + 1, columna - 2, turno);
    checarColocar(fila - 1, columna - 2, turno);
}

// Muestra los movimientos posibles para el alfil
function mostrarMovimientosAlfil(celda) {
    // Obtiene la fila y columna de la celda
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Flags for each direction
    var flags = {
        upRight: true,
        downLeft: true,
        upLeft: true,
        downRight: true
    };

    // Funcion para verificar si es valido la celdas de movimiento
    function checarColocar(row, col, direction, tipo) {
        var tablero = document.getElementById("tablero");
        
        if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
            var targetCell = tablero.rows[row].cells[col];
            if (targetCell.querySelector('.pieza-img')) {
                var pieza = targetCell.querySelector('.pieza-img').alt;
                var color = pieza.includes('Blanco') ? 'blanco' : 'negro';
                if (flags[direction] && tipo !== color) {
                    targetCell.classList.add("movimientoAtaque");
                }
                flags[direction] = false;
            } else if (flags[direction]) { 
                targetCell.classList.add("movimientoPosible");  
            }
        }
    }

    // movimientos
    for (let i = 1; i <= 8; i++) {
        checarColocar(fila - i, columna + i, 'upRight', turno);
        checarColocar(fila + i, columna - i, 'downLeft', turno);
        checarColocar(fila - i, columna - i, 'upLeft', turno);
        checarColocar(fila + i, columna + i, 'downRight', turno);
    }
}

// Muestra los movimientos posibles para la torre
function mostrarMovimientosTorre(celda) {
    // Obtiene la fila y columna de la celda
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Flags for each direction
    var flags = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    // Funcion para verificar si es valido la celdas de movimiento
    function checarColocar(row, col, direction, tipo) {
        var tablero = document.getElementById("tablero");
        if (row >= 1 && row <= 8 && col >= 1 && col <= 8) {
            var targetCell = tablero.rows[row].cells[col];
            if (targetCell.querySelector('.pieza-img')) {
                var pieza = targetCell.querySelector('.pieza-img').alt;
                var color = pieza.includes('Blanco') ? 'blanco' : 'negro';
                if (flags[direction] && tipo !== color) {
                    targetCell.classList.add("movimientoAtaque");
                }
                flags[direction] = false;
            } else if (flags[direction]) { 
                targetCell.classList.add("movimientoPosible");  
            }
        }
    }

    // movimientos
    for (let i = 1; i <= 8; i++) {
        checarColocar(fila - i, columna, 'up', turno);
        checarColocar(fila + i, columna, 'down', turno);
        checarColocar(fila, columna - i, 'left', turno);
        checarColocar(fila, columna + i, 'right', turno);
    }
}

// Muestra los movimientos posibles para la reina
function mostrarMovimientosReina(celda) {
    mostrarMovimientosAlfil(celda);
    mostrarMovimientosTorre(celda);
}

// Muestra los movimientos posibles para la rey
function mostrarMovimientosRey(celda) {
    // Obtiene la fila y columna de la celda
    var fila = celda.parentNode.rowIndex;
    var columna = celda.cellIndex;

    // Funcion para verificar si es valido la celdas de movimiento
    function checarColocar(row, col, tipo) {
        var tablero = document.getElementById("tablero");
        if (row >= 1 && row < tablero.rows.length - 1 && col >= 1 && col < tablero.rows[row].cells.length - 1) {
            
            var targetCell = tablero.rows[row].cells[col];
            if (!targetCell.querySelector('.pieza-img')) {
                targetCell.classList.add("movimientoPosible");
            } else {
                var pieza = targetCell.querySelector('.pieza-img').alt;
                var color = pieza.includes('Blanco') ? 'blanco' : 'negro';
                if (tipo !== color) {
                    targetCell.classList.add("movimientoAtaque");
                }
            }
        }
    }

    checarColocar(fila - 1, columna, turno);
    checarColocar(fila + 1, columna, turno);
    checarColocar(fila, columna - 1, turno);
    checarColocar(fila, columna + 1, turno);
    checarColocar(fila - 1, columna - 1, turno);
    checarColocar(fila - 1, columna + 1, turno);
    checarColocar(fila + 1, columna - 1, turno);
    checarColocar(fila + 1, columna + 1, turno);
}
