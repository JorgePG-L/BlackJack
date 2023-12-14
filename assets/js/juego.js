
let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']
let puntosJugador = 0;
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll('small');

//referencias Html
let victoriasJugador = 0;
let victoriasComputador = 0;
const partidasGanadas  = document.querySelectorAll('a');

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computador-cartas')

const btnPedir = document.querySelector('#btnPedir')
const btnParar = document.querySelector('#btnParar')
const btnNuevo = document.querySelector('#btnNuevo')


const crearDeck = () => {
    for(let i = 2; i <= 10;i++) {
        for (let tipo of tipos){
            deck.push(i + tipo)
        }
        
    }
    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo)
        }
     }
    
    deck= _.shuffle(deck)
    
    return deck;   
}
crearDeck();

// para tomar una carta

const pedirCarta = () => {
    
    if ( deck.length === 0){
        throw 'No hay más cartas en el deck';
    }

    const carta = deck.pop()
    
    return carta;
}

const valorCarta = (carta ) => {
    const valor = carta.substring(0, carta.length - 1)
    
    
    return (isNaN(valor))?(valor === 'A') ? 11 : 10 : valor * 1 ;
    
}
//turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do{
        
        const carta = pedirCarta();
    puntosComputadora = puntosComputadora +  valorCarta(carta);

    
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png `
    imgCarta.classList.add('carta')
    partidasGanadas[1].innerText = puntosComputadora;
    divCartasComputadora.append(imgCarta)
    }
    while(( puntosComputadora <= puntosMinimos ) && ( puntosMinimos <= 21 ));
    
}


// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador +  valorCarta(carta);


    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png `
    imgCarta.classList.add('carta')
    victoriasComputador += 1;
    puntosHTML[1].innerText = victoriasComputador;
    divCartasJugador.append(imgCarta)
    if (puntosJugador > 21) {
        console.warn('lo siento perdiste')
        btnPedir.disabled = true;
        btnParar.disabled = true;
        turnoComputadora(1)
        puntosHTML[1].innerText = puntosComputadora;
    } else if (puntosJugador === 21){
        console.log('Genial ganaste')
        btnPedir.disabled = true;
        btnParar.disabled = true;
        turnoComputadora(puntosJugador)
    }


});

btnParar.addEventListener('click', () => {
    if (puntosJugador <= 21) {
        turnoComputadora(puntosJugador);
        
    }
    btnPedir.disabled = true;
    btnParar.disabled = true;
    

});
btnNuevo.addEventListener('click', () => {
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    puntosComputadora = 0
    puntosJugador = 0
    crearDeck();
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    btnPedir.disabled = false;
    btnParar.disabled = false;

});

