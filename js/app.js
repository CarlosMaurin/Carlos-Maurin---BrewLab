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
    extractoContainerAdicional.classList.add("extracto-container", "mb-2", "text-center");
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


    //---CALCULOS DE COLOR PARA LINEAS DE FERMENTABLES AGREGADAS CON BOTON---///
    const fermColorInput = document.querySelectorAll(".ferm-input")
    fermColorInput.forEach(input => input.addEventListener("change", (e)=>{
        let existe = arrayColor.some(color => color.colorId === e.target.id);
        if(existe){
            arrayColor = arrayColor.map(color =>{
                if(color.colorId == e.target.id){
                    return{
                        colorId: e.target.id,
                        color: srmContainerAdicional.value,
                    }
                }else{
                    return color;
                }
            })
        }else{
            arrayColor.push({
                colorId: e.target.id,
                color: srmContainerAdicional.value,
            })
        }
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
/////////---CALCULOS DE COLOR PRIMERA LINEA DE FERMENTABLES---//////
////////////////////////////////////////////////////////////////////

let arrayColor = [];

const fermColor = document.querySelector(".ferm");
fermColor.addEventListener("change", (e)=>{
    let existe = arrayColor.some(color => color.colorId === e.target.id);
    if(existe){
        arrayColor = arrayColor.map(color => {
            if(color.colorId == e.target.id){
                return{
                    colorId: e.target.id,
                    color: srmListado.value,
                }
            }else{
                return color;
            }
        })
    }else{
        arrayColor.push({
            colorId: e.target.id,
            color: parseInt(srmListado.value),
        });
    }
    
})


// let arr1 = [1, 3, 5, 7];

// let arr2 = [2, 4, 6, 8];
// let arr3 = [];

// for(let i=0; i<arr1.length; i+=1){
//     arr3.push(arr1[i] * arr2[i]);
//     console.log(arr3);
// }

// let nuevo = [];
// let primero = [{tito: 25, tarado: 3}, {tito: 10, tarado: 5}];
// let segundo = [{arg: 2, br: 5}, {arg: 2, br: 10}];




// for(let i=0; i<primero.length; i+=1){
//     nuevo.push(primero[i].tito * segundo[i].br);
//     console.log(nuevo);
// }



let arrayTiempo;

const tiempo = document.querySelector(".tiempo-container");

tiempo.addEventListener("change", (e)=>{
    arrayTiempo = e.target.value;
    console.log(arrayTiempo);
})




const calcular = document.querySelector(".calcular");

calcular.addEventListener("click", calculoSRM);


const beer13 = document.createElement("a");
    




let mcuTotal;
let srm;
let arraySRM = [];
function calculoSRM(){
    for(let i=0; i<arrayKilos.length; i+=1){
        arraySRM.push(arrayColor[i].color * arrayKilos[i].valor);
        console.log(arraySRM);
    }
    mcuTotal = ((arraySRM.reduce((prev, curr) => prev + curr)) / batchContainer) * 8.462;
    srm = Math.round(1.5 * mcuTotal ** 0.7);
    console.log(srm);





    const beer = document.querySelector(".beer");
    if((srm >= 1) && (srm <=3)){
        beer.appendChild()
    }else if((srm >= 4) && (srm <=5)){
        document.write("<img src='beer-4-5.PNG'/>");
    }else if((srm >= 6) && (srm <=7)){
        document.write("<img src='beer-6-7.PNG'/>");
    }else if((srm >= 8) && (srm <=9)){
        document.write("<img src='beer-8-9.PNG'/>");
    }else if((srm >= 10) && (srm <=12)){
        document.write("<img src='beer-10-12.PNG'/>");
    }else if((srm >= 13) && (srm <=16)){
        document.write("<img src='beer-13-16.PNG'/>");
    }else if((srm >= 17) && (srm <=20)){
        document.write("<img src='beer-17-20.PNG'/>");
    }else if((srm >= 21) && (srm <=25)){
        document.write("<img src='beer-21-25.PNG'/>");
    }else if((srm >= 26) && (srm <=30)){
        document.write("<img src='beer-26-30.PNG'/>");
    }else if((srm >= 31) && (srm <=35)){
        document.write("<img src='beer-31-35.PNG'/>");
    }else if((srm >= 36) && (srm <=39)){
        document.write("<img src='beer-36-39.PNG'/>");
    }else if((srm >= 40) && (srm <=50)){
        document.write("<img src='beer-40-50.PNG'/>");
    }else if(srm > 50){
        document.write("<img src='beer+50.PNG'/>");
    }



}






