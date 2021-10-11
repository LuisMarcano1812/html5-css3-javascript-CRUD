// Variables globales

const formularioAP = document.querySelector('#formulario');
const listaActividadesP = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false
  }

  arrayActividades.push(item);
  return item;
}

const GuardarDB = () => {
  localStorage.setItem('Pendiente', JSON.stringify(arrayActividades));
  PintarDB();
}

const PintarDB = () => {

    listaActividadesP .innerHTML = '';

  arrayActividades = JSON.parse(localStorage.getItem('Pendiente'));
  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{

    arrayActividades.forEach(element => {

      if(element.estado){
        listaActividadesP .innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">favorite</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesP .innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">favorite</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });

  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  arrayActividades[indexArray].estado = true
  ;

  GuardarDB();

}

// EventListener

formularioAP.addEventListener('submit', (e) => {

  e.preventDefault();
  let actividadP = document.querySelector('#actividad').value;

  CrearItem(actividadP);
  GuardarDB();

  formularioAP.reset();

});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesP.addEventListener('click', (e) => {

  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    let deleteAction = (e.target.innerHTML === 'delete') ? EliminarDB(texto) : false
    let editAction = (e.target.innerHTML === 'done') ? EditarDB(texto) : false
   
  }

});