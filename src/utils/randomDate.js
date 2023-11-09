const randomDate = () => {
    const hoy = new Date();
    const dosMesesAtras = new Date();
    dosMesesAtras.setMonth(hoy.getMonth() - 2);
  
    const tiempoAleatorio = ((Math.random())**2) * (hoy.getTime() - dosMesesAtras.getTime()) + dosMesesAtras.getTime();
    const fechaAleatoria = new Date(tiempoAleatorio);
  
    return fechaAleatoria;
}

module.exports = randomDate