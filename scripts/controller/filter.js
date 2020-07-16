'use strict';
function handleFilter() {
  $('#nationality-filter').on('change', function() {
    if($(this).val() !== '') {
      $('.person').hide();
      $(`.person[data-nationality*="${$(this).val()}"]`).fadeIn();
    } else {
      $('.person').fadeIn();
    }
  });
}