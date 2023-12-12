
let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','I','Q','K']


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
    console.log(deck)
    console.log('pedircarta ' + carta)
    return carta;
}

pedirCarta();