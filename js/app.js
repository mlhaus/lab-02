'use strict';
$('#photo-gallery').hide();
const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};
$.ajax('./data/page-1.json', ajaxSettings)
  .then(function (data) {
    const arrayOfCreatures = data;
    arrayOfCreatures.forEach(creatureObj => {
      let actualCreature = new Creature(creatureObj);
      actualCreature.render('#photo-gallery');
    });
    $('#photo-gallery').find('.photo-template').remove();
    $('.spinner').fadeOut(500);
    $('#photo-gallery').fadeIn(500);
  });

function Creature(creature) {
  this.title = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
}

Creature.prototype.render = function(placeholder) {
  let $template = $(placeholder).find('.photo-template');
  let $photo = $template.clone();
  $photo.removeClass('photo-template');
  $photo.find('.photo-title').text(this.title);
  $photo.find('.photo-image').attr('src', this.image_url);
  $photo.find('.photo-image').attr('alt', this.title);
  $photo.find('.photo-description').text(this.description);
  $photo.attr('data-keyword', this.keyword);
  $photo.attr('data-horns', this.horns);
  console.log($photo);
  $(placeholder).append($photo);
};
