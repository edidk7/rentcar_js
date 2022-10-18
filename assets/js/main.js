// Variables globales

const
    formularioUI = document.querySelector('#formulario'),
    listadoAutosUI = document.getElementById('listaActividades'),
    indexPageLinkUI = document.querySelector('.nav-link');
    listadoPageLinkUI = document.querySelector('.list');
let arrayAutos = [];

const autos = [{
    id: '0',
    marca: 'Chevrolet',
}]


// Funciones

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
        arrayAutos.forEach(element => {
            listadoAutosUI.innerHTML += `
            <tr>       
                <td>${element.nombre}</td>
                <td>${element.rut}</td>
                <td>${element.patente}</td>
                <td>${element.marca}</td>
                <td>${element.modelo}</td>
                <td>${element.color}</td>
                <td><button class="btnDelete">eliminar</button></td>
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
    
    GuardarDB();

    formularioUI.reset();
});



document.addEventListener('DOMContentLoaded', PintarDB);

listadoAutosUI.addEventListener("click", (e) => {

    e.preventDefault();
    // console.log(e);

    if (e.target.innerHTML === 'eliminar') {
        let texto = (e.path[2].childNodes[1].innerHTML);
        if (e.target.innerHTML === 'eliminar') {
            // Acción de eliminar
            EliminarDB(texto);
        }
    }
})

//Active Link Page Location
const getUrl = window.location.pathname.split("/").slice(1).join("/");
if( getUrl === "index.html"){
    indexPageLinkUI.classList.add("active");
} else if(getUrl === "listado.html"){
    indexPageLinkUI.classList.remove("active");
    listadoPageLinkUI.classList.add("active");
}
