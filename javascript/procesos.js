var celdaSeleccionada;
var turno = 'Blanco';


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
    // Los Blancos siempre inician
    turno = 'Blanco';
    turnoMostrador.innerText = "Turno: " + turno;

    // Eliminar cualquier pieza existente
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            tablero.rows[i].cells[j].innerHTML = '';
        }
    }

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
    var color = pieza.alt.includes('Blanco') ? 'Blanco' : 'Negro';

    if (color === 'Blanco' && turno === 'Blanco') {
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
    } else if (color === 'Negro' && turno === 'Negro') {
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

    if (!piezaOrigen) {
        alert('No hay pieza para mover');
        return;
    }
    var colorOrigen = piezaOrigen.alt.includes('Blanco') ? 'Blanco' : 'Negro';

    if (celdaDestino.querySelector('.pieza-img')) {
        var piezaDestino = celdaDestino.querySelector('.pieza-img');
        var colorDestino = piezaDestino.alt.includes('Blanco') ? 'Blanco' : 'Negro';
    }

    if (colorOrigen === colorDestino) {
        return;
    }
    celdaDestino.innerHTML = '';
    celdaOrigen.innerHTML = '';
    celdaDestino.appendChild(piezaOrigen);
    eliminarMovimientosPosibles();

    //cambiar turno
    if (turno === 'Blanco') {
        turno = 'Negro';
    } else if (turno === 'Negro') {
        turno = 'Blanco';
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
            var color = pieza.includes('Blanco') ? 'Blanco' : 'Negro';

            if (tipo !== color) {
                targetCell.classList.add("movimientoAtaque");
            }

        }
    }

    if (tipo === 'peonBlanco') {
        checarColocar(fila - 1, columna);
        if (fila === 7) {
            checarColocar(fila - 2, columna);
        }
        checarAtacar(fila - 1, columna - 1, 'Blanco');
        checarAtacar(fila - 1, columna + 1, 'Blanco');

    } else if (tipo === 'peonNegro') {
        checarColocar(fila + 1, columna);
        if (fila === 2) {
            checarColocar(fila + 2, columna);
        }
        checarAtacar(fila + 1, columna - 1, 'Negro');
        checarAtacar(fila + 1, columna + 1, 'Negro');
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
            var color = pieza.includes('Blanco') ? 'Blanco' : 'Negro';

            if (tipo !== color) {
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
                var color = pieza.includes('Blanco') ? 'Blanco' : 'Negro';
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
                var color = pieza.includes('Blanco') ? 'Blanco' : 'Negro';
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
                var color = pieza.includes('Blanco') ? 'Blanco' : 'Negro';
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

//Ahora en adelante es para la partida importada

//Paso de la partida en la que nos encontramos
var currentStep = 0;
var lineNumber = 0;
var fileImported = false;

function loadFile() {
    var file = document.getElementById('fileInput').files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        var textArea = document.getElementById('historial');
        textArea.innerHTML = e.target.result;
        fileImported = true;
    };
    reader.readAsText(file);
}

function name(params) {

}
function countLines() {
    var historial = document.getElementById('historial');
    var lines = historial.innerHTML.split('\n');
    return lines.length;
}

function nextStep() {
    if (!fileImported) return;
    if (lineNumber < countLines()) {
        currentStep++;
        document.getElementById('step').textContent = 'Paso: ' + currentStep;
        // Si currentStep es impares, es el turno de las blancas
        if (currentStep % 2 === 0) {
            moverPiezaImport(turno);
        }
        if (currentStep % 2 !== 0) {
            lineNumber++;
            extractMoves(lineNumber);
            highlightLine(lineNumber);
            moverPiezaImport(turno);
        }


    }
}

function previousStep() {
    if (!fileImported) return;
    if (currentStep > 1) {
        currentStep--;
        document.getElementById('step').textContent = 'Paso: ' + currentStep;
        // Si currentStep es impares, es el turno de las blancas
        if (currentStep % 2 === 0) {
            lineNumber--;
            highlightLine(lineNumber);
            moverPiezaImport(turno);
        }
        if (currentStep % 2 !== 0) {
            extractMoves(lineNumber);
            moverPiezaImport(turno);
        }

    }
}

function extractMoves(lineNumber) {
    var historial = document.getElementById('historial');
    var lines = historial.innerHTML.split('\n');
    if (lineNumber < 1 || lineNumber > lines.length) {
        alert('Número de línea fuera de rango');
        return;
    }
    var currentLine = lines[lineNumber - 1];
    // Remove <mark> tags from the current line
    currentLine = currentLine.replace(/<mark>|<\/mark>/g, '');
    var regex = /(\d+)\.\s*(\S+)\s*(\S+)/;
    var match = regex.exec(currentLine);
    if (match) {
        document.getElementById('firstMove').textContent = 'Primer movimiento: ' + match[2];
        document.getElementById('secondMove').textContent = 'Segundo movimiento: ' + match[3];
    } else {
        alert('No se pudo extraer el movimiento');
    }
}

function highlightLine(lineNumber) {
    var historial = document.getElementById('historial');
    var content = historial.textContent.replace(/\r\n/g, '\n');
    var lines = content.split('\n');
    if (lineNumber < 1 || lineNumber > lines.length) {
        return;
    }
    // Remove existing marks
    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(/<mark>|<\/mark>/g, '');
    }
    // Add new mark
    lines[lineNumber - 1] = '<mark>' + lines[lineNumber - 1] + '</mark>';
    historial.innerHTML = lines.join('\n');
}

// Mover pieza con la partida importada
function moverPiezaImport(color) {
    var firstMoveElement = document.getElementById('firstMove');
    var secondMoveElement = document.getElementById('secondMove');

    if (color === 'Blanco') {
        var textoCompleto = firstMoveElement.textContent;
        var partes = textoCompleto.split(': ');
        var primerMovimiento = partes[1];
        switch (primerMovimiento.charAt(0)) {
            case 'N':
                // Caballo
                moverCaballo(primerMovimiento, color);
                break;
            case 'B':
                // Alfil
                moverAlfil(primerMovimiento, color);
                break;
            case 'R':
                // Torre
                moverTorre(primerMovimiento, color);
                break;
            case 'Q':
                // Reina
                moverReina(primerMovimiento, color);
                break;
            case 'K':
                // Rey
                moverRey(primerMovimiento, color);
                break;
            case 'O':
                castling(primerMovimiento, color);
                break;
            default:
                moverPeon(primerMovimiento, color);
                return;
        }
    } else if (color === 'Negro') {
        var textoCompleto = secondMoveElement.textContent;
        var partes = textoCompleto.split(': ');
        var segundoMovimiento = partes[1];
        switch (segundoMovimiento.charAt(0)) {
            case 'N':
                // Caballo
                moverCaballo(segundoMovimiento, color);
                break;
            case 'B':
                // Alfil
                moverAlfil(segundoMovimiento, color);
                break;
            case 'R':
                // Torre
                moverTorre(segundoMovimiento, color);
                break;
            case 'Q':
                // Reina
                moverReina(segundoMovimiento, color);
                break;
            case 'K':
                // Rey
                moverRey(segundoMovimiento, color);
                break;
            case 'O':
                castling(segundoMovimiento, color);
                break;
            default:
                moverPeon(segundoMovimiento, color);
                return;
        }
    }
    
}

function moverPeon(movimiento, color) {
    var comer = false;
    var tablero = document.getElementById('tablero');

    if (!tablero) {
        console.error('No se pudo encontrar el tablero');
        return;
    }

    if(movimiento.length < 3){
        var columna = movimiento.charAt(0);
        columna = columna.charCodeAt(0) - 96;
        var fila = 9 - parseInt(movimiento.charAt(1), 10);
    } else if(movimiento.length === 4){
        if(movimiento.charAt(1) === 'x'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
            comer = true;
        }
    }

    if (fila < 0 || fila >= tablero.rows.length) {
        console.error('Índice de fila fuera de rango');
        return;
    }

    var celda = tablero.rows[fila].cells[columna];

    //si contiene una pieza
    if (celda.querySelector('.pieza-img')) {
        celda.innerHTML = '';
    }

    if (comer) {
        if(color === 'Blanco'){
            if(tablero.rows[fila + 1] && tablero.rows[fila + 1].cells[columna + 1].querySelector(`img[src="images/peonBlanco.png"]`)){
                moverPieza(tablero.rows[fila + 1].cells[columna + 1], celda);
            } 
            if (tablero.rows[fila + 1] && tablero.rows[fila + 1].cells[columna - 1].querySelector(`img[src="images/peonBlanco.png"]`)){
                moverPieza(tablero.rows[fila + 1].cells[columna - 1], celda);
            }
        } else if(color === 'Negro'){
            if(tablero.rows[fila - 1] && tablero.rows[fila - 1].cells[columna + 1].querySelector(`img[src="images/peonNegro.png"]`)){
                moverPieza(tablero.rows[fila - 1].cells[columna + 1], celda);
            } 
            if (tablero.rows[fila - 1] && tablero.rows[fila - 1].cells[columna - 1].querySelector(`img[src="images/peonNegro.png"]`)){
                moverPieza(tablero.rows[fila - 1].cells[columna - 1], celda);
            }
        }
        return;
    }

    if (color === 'Blanco') {
        //revisar las dos celdas por debajo de la celda seleccionada
        if (tablero.rows[fila + 1] && tablero.rows[fila + 1].cells[columna].querySelector('.pieza-img')) {
            moverPieza(tablero.rows[fila + 1].cells[columna], celda);
        }
        if (tablero.rows[fila + 2] && tablero.rows[fila + 2].cells[columna].querySelector('.pieza-img')) {
            moverPieza(tablero.rows[fila + 2].cells[columna], celda);
        }
    } else if (color === 'Negro') {
        //revisar las dos celdas por encima de la celda seleccionada
        if (tablero.rows[fila - 1] && tablero.rows[fila - 1].cells[columna].querySelector('.pieza-img')) {
            moverPieza(tablero.rows[fila - 1].cells[columna], celda);
        }
        if (tablero.rows[fila - 2] && tablero.rows[fila - 2].cells[columna].querySelector('.pieza-img')) {
            moverPieza(tablero.rows[fila - 2].cells[columna], celda);
        }
    }
}

function moverCaballo(movimiento, color) {
    var tablero = document.getElementById('tablero');

    if (!tablero) {
        console.error('No se pudo encontrar el tablero');
        return;
    }

    var columnaEspecifica = null;
    
    if(movimiento.length === 3){
        var columna = movimiento.charAt(1);
        columna = columna.charCodeAt(0) - 96;
        var fila = 9 - parseInt(movimiento.charAt(2), 10);
    } else if(movimiento.length === 4){
        if(movimiento.charAt(1) === 'x'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        } else {
            columnaEspecifica = movimiento.charAt(1).charCodeAt(0) - 96;
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        }
    } else if(movimiento.length === 5){
        if(movimiento.charAt(1) === 'x' && movimiento.charAt(4) === '+'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        }
    }

    if (fila < 0 || fila >= tablero.rows.length) {
        console.error('Índice de fila fuera de rango');
        return;
    }
    var celda = tablero.rows[fila].cells[columna];

    //revisar las 8 posiciones
    var movimientosCaballo = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    for (var i = 0; i < movimientosCaballo.length; i++) {
        var movimientos = movimientosCaballo[i];
        var nuevaFila = fila + movimientos[0];
        var nuevaColumna = columna + movimientos[1];
        
        // Si se especificó una columna y la columna de la celda de movimiento no coincide, continuar con la siguiente iteración
        if (columnaEspecifica !== null && nuevaColumna !== columnaEspecifica) {
            continue;
        }

        // Comprobar si nuevaFila y nuevaColumna están dentro de los límites del tablero
        if (nuevaFila >= 0 && nuevaFila < tablero.rows.length && nuevaColumna >= 0 && nuevaColumna < tablero.rows[0].cells.length) {
            var celdaMovimiento = tablero.rows[nuevaFila].cells[nuevaColumna];
    
            if (celdaMovimiento.querySelector(`img[src="images/caballo${color}.png"]`)) {
                moverPieza(celdaMovimiento, celda);
            }
        }
    }
}

function moverAlfil(movimiento, color, reina = false) {

    var tablero = document.getElementById('tablero');

    if (!tablero) {
        console.error('No se pudo encontrar el tablero');
        return;
    }

    if(movimiento.length === 3){
        var columna = movimiento.charAt(1);
        columna = columna.charCodeAt(0) - 96;
        var fila = 9 - parseInt(movimiento.charAt(2), 10);
    } else if(movimiento.length === 4){
        if(movimiento.charAt(1) === 'x'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        } else {
            var columna = movimiento.charAt(1);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(2), 10);
        }
    } else if(movimiento.length === 5){
        if(movimiento.charAt(1) === 'x' && movimiento.charAt(4) === '+'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        }
    }

    if (fila < 0 || fila >= tablero.rows.length) {
        console.error('Índice de fila fuera de rango');
        return;
    }

    var celda = tablero.rows[fila].cells[columna];

    // Revisar diagonales
    var direcciones = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (var i = 0; i < direcciones.length; i++) {
        var dir = direcciones[i];
        var nuevaFila = fila;
        var nuevaColumna = columna;

        while (true) {
            nuevaFila += dir[0];
            nuevaColumna += dir[1];

            if (nuevaFila < 0 || nuevaFila >= tablero.rows.length || nuevaColumna < 0 || nuevaColumna >= tablero.rows[0].cells.length) {
                break;
            }

            var celdaDiagonal = tablero.rows[nuevaFila].cells[nuevaColumna];
            if(reina && celdaDiagonal.querySelector(`img[src="images/reina${color}.png`)){
                moverPieza(celdaDiagonal, celda);
            }

            if (!reina && celdaDiagonal.querySelector(`img[src="images/alfil${color}.png"]`)) {
                moverPieza(celdaDiagonal, celda);
            }
        }
    }
}

function moverTorre(movimiento, color, reina = false) {
    
    var tablero = document.getElementById('tablero');
    var columnaEspecifica = null;

    if (!tablero) {
        console.error('No se pudo encontrar el tablero');
        return;
    }

    if(movimiento.length === 3){
        var columna = movimiento.charAt(1);
        columna = columna.charCodeAt(0) - 96;
        var fila = 9 - parseInt(movimiento.charAt(2), 10);
    } else if(movimiento.length === 4){
        if(movimiento.charAt(1) === 'x'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        } else if(movimiento.charAt(3) === '+'){
            var columna = movimiento.charAt(1);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(2), 10);
        } else {
            columnaEspecifica = movimiento.charAt(1).charCodeAt(0) - 96;
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        }
    } else if(movimiento.length === 5){
        if(movimiento.charAt(1) === 'x' && movimiento.charAt(4) === '+'){
            var columna = movimiento.charAt(2);
            columna = columna.charCodeAt(0) - 96;
            var fila = 9 - parseInt(movimiento.charAt(3), 10);
        }
    }

    if (fila < 0 || fila >= tablero.rows.length) {
        console.error('Índice de fila fuera de rango');
        return;
    }

    var celda = tablero.rows[fila].cells[columna];

    // Revisar movimientos horizontales y verticales
    var direcciones = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (var i = 0; i < direcciones.length; i++) {
        var dir = direcciones[i];
        var nuevaFila = fila;
        var nuevaColumna = columna;

        while (true) {
            nuevaFila += dir[0];
            nuevaColumna += dir[1];

            if (nuevaFila < 0 || nuevaFila >= tablero.rows.length || nuevaColumna < 0 || nuevaColumna >= tablero.rows[0].cells.length) {
                break;
            }

            if (columnaEspecifica !== null && nuevaColumna !== columnaEspecifica) {
                continue;
            }

            var celdaMovimiento = tablero.rows[nuevaFila].cells[nuevaColumna];

            if(reina && celdaMovimiento.querySelector(`img[src="images/reina${color}.png`)){
                moverPieza(celdaMovimiento, celda);
            }

            // Aquí puedes revisar la celdaMovimiento
            if (!reina && celdaMovimiento.querySelector(`img[src="images/torre${color}.png"]`)) {
                moverPieza(celdaMovimiento, celda);
            }
            // Si hay una pieza en celdaMovimiento, detener la revisión
            if (celdaMovimiento.querySelector('.pieza-img')) {
                break;
            }

        }
    }
}

function moverReina(movimiento, color) {
    moverAlfil(movimiento, color, true);
    moverTorre(movimiento, color, true);
}

function moverRey(movimiento, color) {
    alert (movimiento);
    var columna = movimiento.charAt(1);
    columna = columna.charCodeAt(0) - 96;
    var fila = 9 - parseInt(movimiento.charAt(2), 10);
    var tablero = document.getElementById('tablero');

    if (!tablero) {
        console.error('No se pudo encontrar el tablero');
        return;
    }

    if (fila < 0 || fila >= tablero.rows.length) {
        console.error('Índice de fila fuera de rango');
        return;
    }

    var celda = tablero.rows[fila].cells[columna];

    //revisar las 8 posiciones
    var movimientosRey = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1],
        [0, 1], [1, -1], [1, 0], [1, 1]
    ];

    for (var i = 0; i < movimientosRey.length; i++) {
        var movimientos = movimientosRey[i];
        var nuevaFila = fila + movimientos[0];
        var nuevaColumna = columna + movimientos[1];

        // Comprobar si nuevaFila y nuevaColumna están dentro de los límites del tablero
        if (nuevaFila >= 0 && nuevaFila < tablero.rows.length && nuevaColumna >= 0 && nuevaColumna < tablero.rows[0].cells.length) {
            var celdaDestino = tablero.rows[nuevaFila].cells[nuevaColumna];
            var piezaDestino = celdaDestino.querySelector('img');

            // Comprobar si la celda destino está ocupada por una pieza del mismo color
            if (piezaDestino && piezaDestino.src.includes(color)) {
                continue; // Saltar a la siguiente iteración si la celda destino está ocupada por una pieza del mismo color
            }

            // Mover el rey a la celda destino
            moverPieza(celdaDestino, celda);
        }
    }
}

function castling(movimiento, color) {
    var tablero = document.getElementById('tablero');
    var matches = movimiento.match(/O/g);
    if (matches && matches.length === 2) {
        if (color === 'Blanco') {
            moverPieza(tablero.rows[8].cells[5],tablero.rows[8].cells[7]);
            moverPieza(tablero.rows[8].cells[8],tablero.rows[8].cells[6]);
            turno = 'Negro';
        } else if (color === 'Negro') {
            moverPieza(tablero.rows[1].cells[5],tablero.rows[1].cells[7]);
            moverPieza(tablero.rows[1].cells[8],tablero.rows[1].cells[6]);
            turno = 'Blanco';
        }
    } else if (matches && matches.length === 3) {
        if (color === 'Blanco') {
            moverPieza(tablero.rows[8].cells[5],tablero.rows[8].cells[3]);
            moverPieza(tablero.rows[8].cells[1],tablero.rows[8].cells[4]);
            turno = 'Negro';
        } else if (color === 'Negro') {
            moverPieza(tablero.rows[1].cells[5],tablero.rows[1].cells[3]);
            moverPieza(tablero.rows[1].cells[1],tablero.rows[1].cells[4]);
            turno = 'Blanco';
        }
    }
}
