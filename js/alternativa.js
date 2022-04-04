let batchContainer;
let eficienciaContainer;



//contendor de la cantidad de litros elegida por el usuario

const batch = document.querySelector(".batch");
batch.addEventListener("change", (e)=>{
    if(isNaN(e.target.value)){        
        batchContainer = 0;
        Swal.fire({
            title: 'Por favor ingresar la cantidad de litros a producir',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else{
        batchContainer = parseInt(e.target.value);
        
    }
    console.log(batchContainer);
})

//contendor de la eficiencia elegida por el usuario


const eficiencia = document.querySelector(".eficiencia");
eficiencia.addEventListener("change", (e)=>{
    if(isNaN(e.target.value)){        
        eficienciaContainer = 0;
        Swal.fire({
            title: 'Por favor ingresar un número entre 0 y 1 (se recomienda entre 0.7 y 0.85)',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else if((e.target.value>0) && (e.target.value<=1)){
        eficienciaContainer = parseFloat(e.target.value);
    }else{
        eficienciaContainer = 0;
        Swal.fire({
            title: 'Por favor ingresar un número entre 0 y 1 (se recomienda entre 0.7 y 0.85)',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    console.log(eficienciaContainer);
})

////////////////////////////////////////////////////////////////////
/////////---------------------SECCION DE GRANOS----------------////
//////////////////////////////////////////////////////////////////

// constructor de objetos para granos //
class Granos{
    constructor(nombre, extracto, srm){
        this.nombre= nombre;
        this.extracto= extracto;
        this.srm= srm;
    }
}



// genero array para pushear los objetos de granos //
let fermentables = [];

fermentables.push(new Granos("Pilsen", 37, 2));
fermentables.push(new Granos ("Cara30", 35, 30));
fermentables.push(new Granos ("Cara60", 34, 60));
fermentables.push(new Granos ("Cara120", 33, 120));
fermentables.push(new Granos ("Chocolate", 29, 400));


//----codigo para autocompletar la primera linea de "extracto"-----//
const extractoListado = document.querySelector(".extracto-container");
const listadoFerm = document.querySelector(".ferm");
listadoFerm.addEventListener("change", (e)=>{
    let seleccionar = e.target.value;
    let seleccion = fermentables.find(ferm => ferm.nombre == seleccionar);
    if(seleccion == undefined){
        extractoListado.value = '';
    }else{
        extractoListado.value = seleccion.extracto;
    }
})



//----codigo para autocompletar la primera linea de "srm"-----//
const srmListado = document.querySelector(".srm-container");
const listadoSrm = document.querySelector(".srm");
listadoFerm.addEventListener("change", (e)=>{
    let seleccionar = e.target.value;
    let seleccion = fermentables.find(ferm => ferm.nombre == seleccionar);
    if(seleccion == undefined){
        srmListado.value = '';
    }else{
        srmListado.value = seleccion.srm;
    }
})



//---variable para generar un contador que me genere Ids en los inputs de kilos que se agregan con boton--//

let kilosLenght = 1;
let colorLenght = 1;
let extractoLenght = 1;
let ArrayKilosAdicionales;


// creo la funcion que incorpora lineas de granos en el browser//

function agregarGranos(){

    //---CODIGOS PARA INCOPORAR INPUTS DE FERMENTABLES---//
    const selectContainer = document.querySelector(".select-container");
    const select= document.createElement("select");
    select.classList.add("listado-ferm", "ferm-input");
    select.setAttribute("id", `ferm-color-${colorLenght+=1}`);
    selectContainer.appendChild(select);

    const optionDefault = document.createElement("option");
    const optionDefaultTexto = document.createTextNode("Seleccione un grano");
    optionDefault.appendChild(optionDefaultTexto);
    select.appendChild(optionDefault);

    for(fermentable of fermentables){
        const option = document.createElement("option");
        option.textContent = fermentable.nombre;
        select.appendChild(option);
    }

    //------CODIGOS PARA INCORPORAR INPUTS DE EXTRACTO---//

    const extractoContainer = document.querySelector(".extracto-container-adicional");
    const extractoContainerAdicional = document.createElement("input");
    extractoContainerAdicional.classList.add("extracto-container", "mb-2", "text-center", "extracto-node");
    extractoContainer.appendChild(extractoContainerAdicional);

    //------CODIGOS PARA INCORPORAR INPUTS DE SRM---//

    const srmContainer = document.querySelector(".srm-container-adicional");
    const srmContainerAdicional = document.createElement("input");
    srmContainerAdicional.classList.add("srm-container", "mb-2", "text-center", "srm-node");
    // srmContainerAdicional.setAttribute("id", `ferm-color-${colorLenght+=1}`);
    srmContainer.appendChild(srmContainerAdicional);

    //------CODIGOS PARA INCORPORAR INPUTS DE KILOS---//

    const kilosContainer = document.querySelector(".kilos-container-adicional");
    const kilosContainerAdicional = document.createElement("input");
    kilosContainerAdicional.classList.add("kilos-container", "mb-2", "kilos-adicionales", "text-center");
    kilosContainer.appendChild(kilosContainerAdicional);
    
    //---codigo para generar un contador que me genere Ids en los inputs de kilos que se agregan con boton--//
    kilosContainerAdicional.setAttribute("id", `kilos${kilosLenght+=1}`);

    //-----Codigos para autocompletar las lineas de "extracto y srm" agregadas con boton---///
    select.addEventListener("change", (e)=>{
        let seleccionar = e.target.value;
        let seleccion = fermentables.find(ferm => ferm.nombre == seleccionar);
        if(seleccion == undefined){
            extractoContainerAdicional.value = '';
        }else{
            extractoContainerAdicional.value = seleccion.extracto;
        }
    })


    //-----Codigos para autocompletar las lineas de "srm" agregadas con boton---///

    select.addEventListener("change", (e)=>{
        let seleccionar = e.target.value;
        let seleccion = fermentables.find(ferm => ferm.nombre == seleccionar);
        if(seleccion == undefined){
            srmContainerAdicional.value = '';
        }else{
            srmContainerAdicional.value = seleccion.srm;
        }
    })

    //----Codigo para capturar los kilos de las lineas de fermentables agregadas con boton----//

    ArrayKilosAdicionales = document.querySelectorAll(".kilos-adicionales") ;
    ArrayKilosAdicionales.forEach(input => input.addEventListener("change", (e)=>{
        let existe = arrayKilos.some(kilo => kilo.kiloId === e.target.id);
        console.log(existe);
        if(isNaN(e.target.value)){
            Swal.fire({
                title: 'Por favor ingresar un número entero',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }else{
            if(existe){
                arrayKilos = arrayKilos.map(kilo => {
                    if(kilo.kiloId === e.target.id){
                        return{
                            kiloId: e.target.id,
                            valor: parseInt(e.target.value)
                        }
                    }else{
                        return kilo;
                    }
                })
                console.log(arrayKilos);
    
            }else{
                arrayKilos.push({
                    kiloId: e.target.id,
                    valor: parseInt(e.target.value),
                })
                console.log(arrayKilos);
            }
        }
        sumarkilos();
    }))


    
}


//----Codigo para capturar los kilos de la primera linea de fermentables----//


let arrayKilos = [];

const kilos = document.querySelector(".kilos");

kilos.addEventListener("change", (e)=>{
    let existe = arrayKilos.some(kilo => kilo.kiloId === e.target.id);
    console.log(existe);
    if(isNaN(e.target.value)){
        Swal.fire({
            title: 'Por favor ingresar un número entero',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else{
        if(existe){
            arrayKilos = arrayKilos.map(kilo => {
                if(kilo.kiloId === e.target.id){
                    return{
                        kiloId: e.target.id,
                        valor: parseInt(e.target.value)
                    }
                }else{
                    return kilo;
                }
            })
            console.log(arrayKilos);
    
        }else{
            arrayKilos.push({
                kiloId: e.target.id,
                valor: parseInt(e.target.value),
            })
            console.log(arrayKilos);
        }
        sumarkilos();
    }
})





//----BOTON para agregar lineas de fermentables---//

const botonGranos = document.querySelector(".main-nueva__btn");
botonGranos.addEventListener("click", (agregarGranos));

//-----------CODIGO PARA SUMAR LOS KILOS----------//

const totalKilos = document.querySelector(".suma-kilos");

function sumarkilos(){
    let sumaTotalFinal = 0;
    sumaTotalFinal = arrayKilos.map(kilo => {
        sumaTotalFinal = sumaTotalFinal + kilo.valor;
        console.log(sumaTotalFinal);
        totalKilos.value = sumaTotalFinal;

    })    
}





////////////////////////////////////////////////////////////////////
/////////---------------------SECCION DE LUPULOS----------------////
////////////////////////////////////////////////////////////////////


// genero array para pushear los objetos de lupulos //

class LupuloObj{
    constructor(nombre, AA,){
        this.nombre= nombre;
        this.AA= AA;
    }
}

// genero array para pushear los objetos de lupulos //

let arrayLupulos = [];


arrayLupulos.push(new LupuloObj("Cascade Arg", 0.086));
arrayLupulos.push(new LupuloObj("Kent Goldings", 0.05));
arrayLupulos.push(new LupuloObj("Bravo", 0.12));
arrayLupulos.push(new LupuloObj("Ekuanot", 0.11));
arrayLupulos.push(new LupuloObj("Simcoe", 0.11));


//----codigo para autocompletar la primera linea de "AA"-----//


const alfa = document.querySelector(".alfa-container");
const listadoLupulo = document.querySelector(".listado-lupulo");
listadoLupulo.addEventListener("change", (e)=>{
    let seleccionar = e.target.value;
    let seleccion = arrayLupulos.find(lupulo => seleccionar === lupulo.nombre);

    if(seleccion == undefined){
        alfa.value = "";
    }else{
        alfa.value = seleccion.AA;
    }
})


let gramosContainerBis;
// creo la funcion que incorpora lineas de lupulos en el browser//
let lupuloLenght = 1;
function agregarLupulos(){

    //---CODIGOS PARA INCOPORAR INPUTS DE LUPULOS---//
    
    const listadoLupuloInput = document.querySelector(".listado-lupulo__adicional");
    const selectLupulo = document.createElement("select");
    selectLupulo.classList.add("lupulo-input", "listado-lupulo");
    listadoLupuloInput.appendChild(selectLupulo);

    const optionDefaultLupulo = document.createElement("option");
    const optionDefaultLupuloTexto = document.createTextNode("Seleccione lúpulo");
    optionDefaultLupulo.appendChild(optionDefaultLupuloTexto);
    selectLupulo.append(optionDefaultLupulo);

    for(const lupulo of arrayLupulos){
        const optionLupulo = document.createElement("option");
        optionLupulo.textContent = lupulo.nombre;
        selectLupulo.appendChild(optionLupulo); 
    }

    //---CODIGOS PARA INCOPORAR INPUTS DE AA---//

    const alfaContainerAdicional = document.querySelector(".alfa-container__adicional");
    const alfaContainerAdicionalInput = document.createElement("input");
    alfaContainerAdicionalInput.classList.add("alfa-container", "mb-2", "text-center", "alfa-node");
    alfaContainerAdicional.appendChild(alfaContainerAdicionalInput);

    //---CODIGOS PARA INCOPORAR INPUTS DE TIEMPO---//

    let arrayTiempo = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
    const tiempoContainerAdicional = document.querySelector(".tiempo-container__adicional");
    const tiempoContainerAdicionalInput = document.createElement("select");
    tiempoContainerAdicionalInput.classList.add("tiempo-container", "mb-2", "text-center", "tiempo-node");
    tiempoContainerAdicional.appendChild(tiempoContainerAdicionalInput);

    const optionDefaultTiempo = document.createElement("option");
    const optionDefaultTiempoTexto = document.createTextNode("Minutos de hervor")
    optionDefaultTiempo.appendChild(optionDefaultTiempoTexto);
    tiempoContainerAdicionalInput.appendChild(optionDefaultTiempo);

    for(const tiempo of arrayTiempo){
        const optionTiempo = document.createElement("option");
        optionTiempo.textContent = tiempo;
        tiempoContainerAdicionalInput.appendChild(optionTiempo);
    }


    //---CODIGOS PARA INCOPORAR INPUTS DE GRS---//

    const gramosContainerAdicional = document.querySelector(".gramos-container__adicional");
    const gramosContainerAdicionalInput = document.createElement("input");
    gramosContainerAdicionalInput.classList.add("gramos-container", "mb-2", "text-center", "gramos-container-bis");
    gramosContainerAdicionalInput.setAttribute("id", `hop${lupuloLenght+=1}`);
    gramosContainerAdicional.appendChild(gramosContainerAdicionalInput);


    //-----Codigos para autocompletar las lineas de "AA" agregadas con boton---///

    selectLupulo.addEventListener("change", (e)=>{
        let seleccionar = e.target.value;
        let seleccion = arrayLupulos.find(lupulo => lupulo.nombre === seleccionar);
        console.log(seleccion);
        console.log(seleccionar);
        if(seleccion == undefined){
            alfaContainerAdicionalInput.value = "";
        }else{
            alfaContainerAdicionalInput.value = seleccion.AA
        }
    })


    //----Codigo para capturar los gramos de las lineas de lupulos agregadas con boton----//


    gramosContainerBis = document.querySelectorAll(".gramos-container-bis");
    gramosContainerBis.forEach(input => input.addEventListener("change", (e)=>{
        let existe = arrayGramos.some(gramo => gramo.gramoId === e.target.id);
        console.log(existe);
        if(isNaN(e.target.value)){
            Swal.fire({
                title: 'Por favor ingresar un número entero',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }else{
            if(existe){
                arrayGramos = arrayGramos.map(gramo => {
                    if(gramo.gramoId == e.target.id){
                        return {
                            gramoId: e.target.id,
                            valor: parseInt(e.target.value),
                        }    
                    }else{
                        return gramo;
                    }
                })
                console.log(arrayGramos);
    
            }else{
                arrayGramos.push({
                    gramoId: e.target.id,
                    valor: parseInt(e.target.value),
                })
                console.log(arrayGramos);
            }
        }
        sumarGramos();

    }) )
    
}

//----BOTON para agregar lineas de lupulos---//

const btnLupulo = document.querySelector(".btn-agregar-lupulo");
btnLupulo.addEventListener("click", agregarLupulos);


//----Codigo para capturar los gramos de la primera linea de lupulos----//


let arrayGramos = [];
gramosContainer = document.querySelector(".gramos-container");
gramosContainer.addEventListener("change", (e)=>{
    let existe = arrayGramos.some(gramo => gramo.gramoId === e.target.id);
    console.log(existe);
    if(isNaN(e.target.value)){
        Swal.fire({
            title: 'Por favor ingresar un número entero',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else{
        if(existe){
            arrayGramos = arrayGramos.map(gramo => {
                if(gramo.gramoId == e.target.id){
                    return {
                        gramoId: e.target.id,
                        valor: parseInt(e.target.value),
                    }   
                }else{
                    return gramo;
                }
            })
            console.log(arrayGramos);
    
        }else{
            arrayGramos.push({
                gramoId: e.target.id,
                valor: parseInt(e.target.value),
            })
            console.log(arrayGramos);
        }
    }
    sumarGramos();
})


//-----------CODIGO PARA SUMAR LOS GRAMOS DE LUPULO----------//

const totalGramos = document.querySelector(".suma-gramos");

function sumarGramos(){
    let sumaTotalFinal = 0;
    sumaTotalFinal = arrayGramos.map(gramo => {
        sumaTotalFinal = sumaTotalFinal + gramo.valor;
        console.log(sumaTotalFinal);
        totalGramos.value = sumaTotalFinal;

    })    
}




////////////////////////////////////////////////////////////////////
/////////---------------------SECCION DE LEVADURA---------------////
////////////////////////////////////////////////////////////////////

class Levaduras {
    constructor(cepa, atenuacion){
        this.cepa = cepa;
        this.atenuacion = atenuacion;
    }
}

let arrayLevadura = [];

arrayLevadura.push(new Levaduras("US-05", 0.78));
arrayLevadura.push(new Levaduras("S-04", 0.75));
arrayLevadura.push(new Levaduras("Windsor", 0.74));
arrayLevadura.push(new Levaduras("Nottinham", 0.82));


const atenuacion = document.querySelector(".atenuacion");
const listadoLevadura = document.querySelector(".listado-levadura");
listadoLevadura.addEventListener("change", (e)=>{
    let seleccionar = e.target.value;
    let seleccion = arrayLevadura.find(leva => leva.cepa === seleccionar);
    if(seleccion == undefined){
        atenuacion.value = "";
    }else{
        atenuacion.value = seleccion.atenuacion;
    }
})

let levaduraAtenuacion;

listadoLevadura.addEventListener("change", (e)=>{
    let seleccionar = e.target.value;
    let seleccionado = arrayLevadura.find(leva => leva.cepa === seleccionar);
    if(seleccionado == undefined){
        levaduraAtenuacion = "";
    }else{
        levaduraAtenuacion = seleccionado.atenuacion;
    }
})

const levaGrs = document.querySelector(".leva-grs");
levaGrs.addEventListener("change", (e)=>{
    if(isNaN(e.target.value)){
        Swal.fire({
            title: 'Por favor ingresar la cantidad de gramos. Se recomienda una tasa de inoculación de 0.7 a 1 gramos por litro',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
})



////////////////////////////////////////////////////////////////////
/////////-----------------CALCULOS DE INDICADORES-------------//////
////////////////////////////////////////////////////////////////////


//--------Boton para calcular indicadores-----------///
const calcular = document.querySelector(".calcular");
calcular.addEventListener("click", calcularIndicadores);

let galones;
let arrayLibras = [];
let arrayExtracto = [];
let arrayDensidad = [];
let arraySrm = [];
let arrayMcu = [];
let srm;
let factorCorreccion = 7.489;
let correccionDensidad;   
let arrayOnzas = [];
let arrayTiempo = [];
let arrayMinutos = [];
let arrayAA = [];
let arrayIbu = [];
let densidadFinal;
let abv;

function calcularIndicadores(){


    //------CODIGO PARA CALCULAR DENSIDAD INICIAL-------///

    for(const kilo of arrayKilos){
        arrayLibras.push(kilo.valor / 0.453592);
        console.log(arrayLibras);
    }
    
    arrayExtracto.push(parseInt(extractoListado.value));
    console.log(arrayExtracto);


    const extractoNodeList = document.querySelectorAll(".extracto-node"); 
    extractoNodeList.forEach(input =>{
        arrayExtracto.push(parseInt(input.value));
    })  

    for(let i=0; i<arrayExtracto.length; i+=1){
        arrayDensidad.push(arrayLibras[i] * arrayExtracto[i] * eficienciaContainer);
        console.log(arrayDensidad);
    }
    arrayDensidad = arrayDensidad.reduce((prev, curr) => prev + curr);
    galones = batchContainer * 0.264172;
    
    arrayDensidad = (Math.round((arrayDensidad / galones) +1000)) / 1000;
    


    ///----------------CODIGO PARA CALCULAR COLOR--------------////


    arraySrm.push(parseInt(listadoSrm.value));
    console.log(arraySrm);


    const colorNodeList = document.querySelectorAll(".srm-node");

    colorNodeList.forEach(input => {
        arraySrm.push(parseInt(input.value));
        console.log(arraySrm);
    })

    for(i=0; i<arraySrm.length; i+=1){
        arrayMcu.push(arraySrm[i] * arrayKilos[i].valor);
        console.log(arrayMcu);
    }
    arrayMcu = arrayMcu.reduce((prev, curr) => prev + curr);
    arrayMcu = (arrayMcu / batchContainer) * 8.462;    
    
    srm = Math.round(1.5 * arrayMcu ** 0.7);

    console.log(srm);



    ////-------------CODIGO PARA CALCULAR IBUs----------------------///


    
    if(arrayDensidad <= 1050){
        correccionDensidad = 1;
    }else{
        correccionDensidad = 1 + (((arrayDensidad - 1050) / 1000) / 0.2);
    }


    for(const gramo of arrayGramos){
        arrayOnzas.push(gramo.valor * 0.035274);
        console.log(arrayOnzas);
    }
    

    const tiempoContainer = document.querySelector(".tiempo-container");
    arrayTiempo.push(parseInt(tiempoContainer.value));
    console.log(arrayTiempo);

    const tiempoNodeList = document.querySelectorAll(".tiempo-node");
    tiempoNodeList.forEach(input => {
        arrayTiempo.push(parseInt(input.value));
        console.log(arrayTiempo)
    })

    arrayTiempo.forEach(input => {
        if((input >= 0 ) && (input <=9)){
            arrayMinutos.push(0.06);
        }else if((input >= 10 ) && (input <=19)){
            arrayMinutos.push(0.15);
        }else if((input >= 20 ) && (input <=29)){
            arrayMinutos.push(0.19);
        }else if((input >= 30 ) && (input <=44)){
            arrayMinutos.push(0.24);
        }else if((input >= 45 ) && (input <=59)){
            arrayMinutos.push(0.27);
        }else if((input >= 60 ) && (input <=74)){
            arrayMinutos.push(0.30);
        }else if(input >= 75 ){
            arrayMinutos.push(0.34);
        }
        console.log(arrayMinutos);
    })


    arrayAA.push(parseFloat(alfa.value));
    const alfaNodeList = document.querySelectorAll(".alfa-node");
    alfaNodeList.forEach(input => {
        arrayAA.push(parseFloat(input.value));
        console.log(arrayAA);
    })


    for(let i=0; i<arrayMinutos.length; i+=1){
        arrayIbu.push(((arrayOnzas[i] * arrayMinutos[i] * factorCorreccion) / (galones * correccionDensidad)) *100);
        console.log(arrayIbu);
    }

    arrayIbu = arrayIbu.reduce((prev, curr) => prev + curr);
    arrayIbu = arrayIbu.toFixed(1);

    densidadFinal = (1 - levaduraAtenuacion) * (arrayDensidad*1000 - 1000);
    densidadFinal = densidadFinal / 1000 + 1;
    densidadFinal = parseFloat(densidadFinal.toFixed(3));
    console.log(densidadFinal);

    abv = (arrayDensidad - densidadFinal) * 131.25;
    abvString = abv.toFixed(2);
    abvString = abvString+"%";

    const indicadorColor = document.querySelector(".indicador-color"); 

    if((srm >= 1) && (srm <=3)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-1-3.png'/>`;
    }else if((srm >= 4) && (srm <=5)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-4-5.png'/>`;
    }else if((srm >= 6) && (srm <=7)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-6-7.png'/>`;
    }else if((srm >= 8) && (srm <=9)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-8-9.png'/>`;
    }else if((srm >= 10) && (srm <=12)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-10-12.png'/>`;
    }else if((srm >= 13) && (srm <=16)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-13-16.png'/>`;
    }else if((srm >= 17) && (srm <=20)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-17-20.png'/>`;
    }else if((srm >= 21) && (srm <=25)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-21-25.png'/>`;
    }else if((srm >= 26) && (srm <=30)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-26-30.png'/>`;
    }else if((srm >= 31) && (srm <=35)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-31-35.png'/>`;
    }else if((srm >= 36) && (srm <=39)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-36-39.png'/>`;
    }else if((srm >= 40) && (srm <=50)){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint-40-50.png'/>`;
    }else if(srm > 50){
        indicadorColor.innerHTML = `<img class="img-beer" src='../images/beer/pint+50.png'/>`;
    }


    const introducirColor = document.querySelector(".color");
    introducirColor.textContent = srm;

    const introducirOg = document.querySelector(".og");
    introducirOg.textContent = arrayDensidad;

    const introducirFg = document.querySelector(".fg");
    introducirFg.textContent = densidadFinal;

    const introducirAbv = document.querySelector(".abv");
    introducirAbv.textContent = abvString;

    const introducirIbu = document.querySelector(".ibu");
    introducirIbu.textContent = arrayIbu;





    let barraOg = (((arrayDensidad - 1) * 1000) / 200)*100;

    const indicadorOg = document.querySelector(".indicador-og");
    indicadorOg.style.width = `${barraOg}%`;
    indicadorOg.style.height = "1.3rem";
    indicadorOg.style.borderRadius = "0.5rem";
    indicadorOg.style.setProperty("background-color", "green");



    let barraFg = (((densidadFinal - 1) * 1000) / (200 * (1 - levaduraAtenuacion))) * 100;
    const indicadorFg = document.querySelector(".indicador-fg");
    indicadorFg.style.width = `${barraFg}%`;
    indicadorFg.style.height = "1.3rem";
    indicadorFg.style.borderRadius = "0.5rem";
    indicadorFg.style.setProperty("background-color", "red");



    let barraAbv = (abv / ((1.2 - (((200*(1-levaduraAtenuacion))/1000)+1)) * 131.25)) * 100;
    const indicadorAbv = document.querySelector(".indicador-abv");
    indicadorAbv.style.width = `${barraAbv}%`;
    indicadorAbv.style.height = "1.3rem";
    indicadorAbv.style.borderRadius = "0.5rem";
    indicadorAbv.style.setProperty("background-color", "lightblue");


    const indicadorIbu = document.querySelector(".indicador-ibu");
    let balance = arrayIbu / ((arrayDensidad - 1)*1000);
    
    if((balance >= 0.1) && (balance <=0.25)){
        indicadorIbu.innerHTML = `<img class="img-hop" src="../images/hops/hop1.png" alt="">`;
    }else if((balance > 0.25) && (balance <=0.5)){
        indicadorIbu.innerHTML = `<img class="img-hop" src="../images/hops/hop2.png" alt="">`;
    }else if((balance > 0.5) && (balance <=0.75)){
        indicadorIbu.innerHTML = `<img class="img-hop" src="../images/hops/hop3.png" alt="">`;
    }else if((balance > 0.75) && (balance <=1)){
        indicadorIbu.innerHTML = `<img class="img-hop" src="../images/hops/hop4.png" alt="">`;
    }else if(balance >1){
        indicadorIbu.innerHTML = `<img class="img-hop" src="../images/hops/hop5.png" alt="">`;
    }
}



function limpiarCampos (){

    //-------------------------------------------------//
    //codigos para limpiar campos en batch y eficiencia//
    //-------------------------------------------------//

    batch.value = "";
    eficiencia.value = "";    

    //--------------------------------------------//
    //codigos para limpiar campos en fermentables//
    //------------------------------------------//
    totalKilos.value = "";
    arrayKilosLimpieza = arrayKilos.splice(0);


    //primera linea de fermentables//    
    kilos.value = "";
    listadoFerm.value = "Seleccione un grano";
    extractoListado.value = "";
    srmListado.value = "";

    //lineas de fermentables agregadas con boton//
    
    if( ArrayKilosAdicionales != undefined){
        ArrayKilosAdicionales.forEach(kilos => {
            kilos.value = "";
        })    
    }
    
    const fermInputLimpieza = document.querySelectorAll(".ferm-input");
    if(fermInputLimpieza != undefined){
        fermInputLimpieza.forEach(ferm => {
            ferm.value = "Seleccione un grano";
        })    
    }
    const extractoNodeListLimpieza = document.querySelectorAll(".extracto-node");
    if(extractoNodeListLimpieza != undefined){
        extractoNodeListLimpieza.forEach(ext => {
            ext.value = "";
        })
    }

    const srmNodeListLimpieza = document.querySelectorAll(".srm-node");
    if(srmNodeListLimpieza != undefined){
        srmNodeListLimpieza.forEach(srm => {
            srm.value = "";
        })
    }
    //---------------------------------------//
    //codigos para limpiar campos en lupulos//
    //-------------------------------------//

    totalGramos.value = "";
    arrayGramosLimpieza = arrayGramos.splice(0);

    //primera linea de lupulos//    

    listadoLupulo.value = "Seleccione lúpulo";
    gramosContainer.value = "";
    alfa.value = "";
    const tiempoContainerLimpieza = document.querySelector(".tiempo-container")
    tiempoContainerLimpieza.value = "Minutos de hervor";

    //lineas de lupulos agregadas con boton//
        
    if(gramosContainerBis != undefined){
        gramosContainerBis.forEach(gramos => {
            gramos.value = "";
        })    
    }

    const lupuloInputLimpieza = document.querySelectorAll(".lupulo-input");
    if(lupuloInputLimpieza != undefined){
        lupuloInputLimpieza.forEach(lupulo => {
            lupulo.value = "Seleccione lúpulo";
        })    
    }
    const alfaNodeListLimpieza = document.querySelectorAll(".alfa-node");
    if(alfaNodeListLimpieza != undefined){
        alfaNodeListLimpieza.forEach(alfa => {
            alfa.value = "";
        })
    }
    const tiempoNodeListLimpieza = document.querySelectorAll(".tiempo-node");
    if(tiempoNodeListLimpieza != undefined){
        tiempoNodeListLimpieza.forEach(tiempo => {
            tiempo.value = "Minutos de hervor";
        })    
    }
    
    //----------------------------------------//
    //codigos para limpiar campos en levadura//
    //--------------------------------------//

    listadoLevadura.value = "Seleccione levadura";
    atenuacion.value = "";
    levaGrs.value = "";

    const introducirColor = document.querySelector(".color");
    introducirColor.textContent = "";
    const indicadorColor = document.querySelector(".indicador-color");
    const beerImg = document.querySelector(".img-beer");
    indicadorColor.removeChild(beerImg);

    const introducirOg = document.querySelector(".og");
    introducirOg.textContent = "";
    const removeOg = document.querySelector(".remove-og");
    const estiloOg = document.querySelector(".indicador-og");
    removeOg.removeChild(estiloOg);

    const introducirFg = document.querySelector(".fg");
    introducirFg.textContent = "";
    const removeFg = document.querySelector(".remove-fg");
    const estiloFg = document.querySelector(".indicador-fg");
    removeFg.removeChild(estiloFg);

    const introducirAbv = document.querySelector(".abv");
    introducirAbv.textContent = "";
    const removeAbv = document.querySelector(".remove-abv");
    const estiloAbv = document.querySelector(".indicador-abv");
    removeAbv.removeChild(estiloAbv);

    const introducirIbu = document.querySelector(".ibu");
    introducirIbu.textContent = "";

    const indicadorIbu = document.querySelector(".indicador-ibu");
    const hopImg = document.querySelector(".img-hop");
    indicadorIbu.removeChild(hopImg);

    



}



const limpiar = document.querySelector(".limpiar");
limpiar.addEventListener("click", limpiarCampos);














