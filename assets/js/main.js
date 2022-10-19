// Variables globales

const
    formularioUI = document.querySelector('#formulario'),
    listadoAutosUI = document.getElementById('listaActividades'),
    indexPageLinkUI = document.querySelector('.nav-link');
    listadoPageLinkUI = document.querySelector('.list'),
    getUrl = window.location.pathname.split("/").slice(1).join("/"),
    pageSize = 10;
let arrayAutos = [],    
    curPage = 1;


// Funciones

const checkRut = (rut) => {
    var valor = rut.value.replace('.','');
    valor = valor.replace('-','');
    
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    rut.value = cuerpo + '-'+ dv
    
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    suma = 0;
    multiplo = 2;
    
    for(i=1;i<=cuerpo.length;i++) {
    
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        suma = suma + index;
        
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    dvEsperado = 11 - (suma % 11);
    
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    rut.setCustomValidity('');
}

const CrearItem = (nombre, rut, patente, marca, modelo, color) => {

    const item = {
        id: arrayAutos.length + 1,
        nombre: nombre,
        rut: rut,
        patente: patente,
        marca: marca,
        modelo: modelo,
        color: color,
    }

    arrayAutos.push(item);

    return item;
}

const GuardarDB = () => {

    localStorage.setItem('listado', JSON.stringify(arrayAutos));


    PintarDB();


}

const PintarDB = () => {

    listadoAutosUI.innerHTML = '';

    arrayAutos = JSON.parse(localStorage.getItem('listado'))

    if (arrayAutos == null) {
        arrayAutos = [];
    } else {
        arrayAutos.filter((row, index) => {
            let start = (curPage - 1) * pageSize;
            let end = curPage * pageSize;
            if (index >= start && index < end) return true;
        }).forEach(element => {
            listadoAutosUI.innerHTML += `
            <tr>       
                <td>${element.nombre}</td>
                <td>${element.rut}</td>
                <td>${element.patente}</td>
                <td>${element.marca}</td>
                <td>${element.modelo}</td>
                <td>${element.color}</td>
                <td><a class="btnDelete">eliminar</a></td>
            </tr>      
                `

        });
    }
    console.log(arrayAutos);
}

const EliminarDB = (id) => {

    let indexArray;
    arrayAutos.forEach((elemento, index) => {

        if (elemento.id === id) {
            indexArray = index;
        }
    });

    arrayAutos.splice(indexArray, 1);
    alert("Se elimino correctamente")
    GuardarDB();
}


// EventListener

formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let nombreUI = document.querySelector('#name').value,
        rutUI = document.querySelector('#rut').value,
        patenteUI = document.querySelector('#patente').value,
        marcaUI = document.querySelector('#marca').value,
        modeloUI = document.querySelector('#modelo').value,
        colorUI = document.querySelector('#color').value;

    CrearItem(nombreUI, rutUI, patenteUI, marcaUI, modeloUI, colorUI);
    alert("Se agrego un nuevo auto")
    GuardarDB();

    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', PintarDB);

listadoAutosUI.addEventListener("click", (e) => {

    e.preventDefault();
    // console.log(e.target.innerHTML );
    // let btn =  e.target.innerHTML.split("/").slice(1).join("/");
    // console.log(btn);

    if (e.target.innerHTML === 'eliminar') {
        let texto = (e.path[2].childNodes[1].innerHTML);
        if (e.target.innerHTML === 'eliminar') {
            // Acción de eliminar
            EliminarDB(texto);
        }
    }
})

