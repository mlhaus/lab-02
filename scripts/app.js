'use strict';
$(() => {
  $('#photo-gallery').hide();
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      const arrayOfPeople = data.results;
      arrayOfPeople.forEach(person => {
        const actualPerson = new Person(person);
        Person.all.push(actualPerson);
      });
    })
    .then(
      $.ajax('./data/page-2.json', ajaxSettings)
        .then(data => { 
          const arrayOfPeople = data.results;
          arrayOfPeople.forEach(person => {
            const actualPerson = new Person(person);
            Person.all.push(actualPerson);
          });
        })
    )
    .then(() => {
      Person.numPages = Math.ceil(Person.all.length / Person.peoplePerPage);
      renderPeople();
      renderFilters(); 
      handleFilters();
      $('.spinner').fadeOut();
      $('#photo-gallery').fadeIn();
    });
});
