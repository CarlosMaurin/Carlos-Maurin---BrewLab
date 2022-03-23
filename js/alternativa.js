let batchContainer;
let eficienciaContainer;




//contendor de la cantidad de litros elegida por el usuario

const batch = document.querySelector(".batch");
batch.addEventListener("change", (e)=>{
    if(isNaN(e.target.value)){        
        batchContainer = 0;
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
    }else{
        eficienciaContainer = parseFloat(e.target.value);
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
    srmContainerAdicional.classList.add("srm-container", "mb-2", "text-center");
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

    const ArrayKilosAdicionales = document.querySelectorAll(".kilos-adicionales") ;
    ArrayKilosAdicionales.forEach(input => input.addEventListener("change", (e)=>{
        let existe = arrayKilos.some(kilo => kilo.kiloId === e.target.id);
        console.log(existe);
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
    }))


    
}


//----Codigo para capturar los kilos de la primera linea de fermentables----//


let arrayKilos = [];

const kilos = document.querySelector(".kilos");

kilos.addEventListener("change", (e)=>{
    let existe = arrayKilos.some(kilo => kilo.kiloId === e.target.id);
    console.log(existe);
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
    alfaContainerAdicionalInput.classList.add("alfa-container", "mb-2", "text-center");
    alfaContainerAdicional.appendChild(alfaContainerAdicionalInput);

    //---CODIGOS PARA INCOPORAR INPUTS DE TIEMPO---//

    let arrayTiempo = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
    const tiempoContainerAdicional = document.querySelector(".tiempo-container__adicional");
    const tiempoContainerAdicionalInput = document.createElement("select");
    tiempoContainerAdicionalInput.classList.add("tiempo-container", "mb-2", "text-center");
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
    gramosContainerAdicionalInput.classList.add("gramos-container", "mb-2", "text-center");
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


    //----Codigo para capturar los kilos de las lineas de fermentables agregadas con boton----//


    const gramosContainer = document.querySelectorAll(".gramos-container");
    gramosContainer.forEach(input => input.addEventListener("change", (e)=>{
        let existe = arrayGramos.some(gramo => gramo.gramoId === e.target.id);
        console.log(existe);
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
        sumarGramos();

    }) )
    
}

//----BOTON para agregar lineas de lupulos---//

const btnLupulo = document.querySelector(".btn-agregar-lupulo");
btnLupulo.addEventListener("click", agregarLupulos);


//----Codigo para capturar los gramos de la primera linea de lupulos----//


let arrayGramos = [];
const gramosContainer = document.querySelector(".gramos-container");
gramosContainer.addEventListener("change", (e)=>{
    let existe = arrayGramos.some(gramo => gramo.gramoId === e.target.id);
    console.log(existe);
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

arrayLevadura.push(new Levaduras("US-05", 0.75));
arrayLevadura.push(new Levaduras("S-04", 0.70));
arrayLevadura.push(new Levaduras("Windsor", 0.65));
arrayLevadura.push(new Levaduras("Nottinham", 0.80));


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

////////////////////////////////////////////////////////////////////
/////////-----------------CALCULOS DE INDICADORES-------------//////
////////////////////////////////////////////////////////////////////


//--------Boton para calcular indicadores-----------///
const calcular = document.querySelector(".calcular");
calcular.addEventListener("click", calcularIndicadores);


let arrayLibras = [];
let arrayExtracto = [];
let arrayDensidad = [];
function calcularIndicadores(){

    for(const kilo of arrayKilos){
        arrayLibras.push(kilo.valor * 0.453592);
        console.log(arrayLibras);
    }
    
    arrayExtracto.push(parseInt(extractoListado.value));
    console.log(arrayExtracto);


    const extractoNodeList = document.querySelectorAll(".extracto-node"); 
    extractoNodeList.forEach(input =>{
        arrayExtracto.push(parseInt(input.value));
    })  

    for(let i=0; i<arrayExtracto.length; i+=1){
        (arrayDensidad.push(arrayLibras[i] * arrayExtracto[i])) * eficiencia;
    }

    

    // arrayDensidad.reduce((prev, curr) => prev + curr);

}








