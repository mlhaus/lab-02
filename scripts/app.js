'use strict';
$(() => {
  $('#photo-gallery').hide();
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/people.json', ajaxSettings)
    .then(data => {
      const arrayOfPeople = data.results;
      arrayOfPeople.forEach(person => {
        const actualPerson = new Person(person);
        Person.all.push(actualPerson);
      });
    })
    .then(() => {
      renderPeople();
      renderFilter();
      handleFilter();
      $('.spinner').fadeOut();
      $('#photo-gallery').fadeIn();
    });
});
