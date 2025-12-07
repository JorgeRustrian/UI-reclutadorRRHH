Table SELECCIONADOR {
  id_seleccionador int [pk, increment]
  nombre varchar
  correo varchar
  telefono varchar
  puesto varchar
}

Table VACANTE {
  id_vacante int [pk, increment]
  id_seleccionador int [ref: > SELECCIONADOR.id_seleccionador]
  titulo varchar
  descripcion varchar
  requisitos varchar
  estado varchar
}

Table CANDIDATO {
  id_candidato int [pk, increment]
  nombre varchar
  correo varchar
  telefono varchar
  cv_url varchar
}

Table POSTULACION {
  id_postulacion int [pk, increment]
  id_candidato int [ref: > CANDIDATO.id_candidato]
  id_vacante int [ref: > VACANTE.id_vacante]
  estado varchar      
  fecha_aplicacion datetime
}

Table PRUEBA {
  id_prueba int [pk, increment]
  id_vacante int [ref: > VACANTE.id_vacante]
  titulo varchar
  descripcion varchar
  url_prueba varchar   
}