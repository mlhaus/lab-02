'use strict';
function renderPeople() {
  Person.all.forEach(person => $('#photo-gallery').append(person.render()));
  $('.person-template').remove();
  showPeople(1);
}