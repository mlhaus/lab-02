'use strict';
function renderFilter() {
  Person.allNationalities.sort();
  Person.allNationalities.forEach(nationality => {
    let $option = $('<option>').text(nationality).attr('value', nationality);
    $('#nationality-filter').append($option);
  });
}