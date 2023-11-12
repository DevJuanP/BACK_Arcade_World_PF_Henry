const randomDate = () => {
    const hoy = new Date();
    //const dosMesesAtras = new Date();
    const eneroDate = new Date("2023-01-01");

    //dosMesesAtras.setMonth(hoy.getMonth() - 2);
  
    const tiempoAleatorio = (1-((Math.random())**2)) * (hoy.getTime() - eneroDate.getTime()) + eneroDate.getTime();
    const fechaAleatoria = new Date(tiempoAleatorio);
  
    return fechaAleatoria;
}

module.exports = randomDate