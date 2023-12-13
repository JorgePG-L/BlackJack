
let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']
let puntosJugador = 0;
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll('small');
//referencias Html
const divCartasJugador = document.querySelector('#jugador-cartas')
const btnPedir = document.querySelector('#btnPedir')

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

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador +  valorCarta(carta);


    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png `
    imgCarta.classList.add('carta')
    puntosHTML[0].innerText = puntosJugador;
    divCartasJugador.append(imgCarta)
    if (puntosJugador > 21) {
        console.warn('lo siento perdiste')
        btnPedir.disabled = true;
    } else if (puntosJugador === 21){
        console.log('Genial ganaste')
        btnPedir.disabled = true;
    }


});