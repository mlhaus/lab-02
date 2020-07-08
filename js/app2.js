'use strict';
$(function() {
  $('#dog-gallery').hide();
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('./data/dogs.json', ajaxSettings)
    .then((data) => {
      // console.log(data);
      const arrayOfDogs = data;
      arrayOfDogs.forEach(dogObj => {
        // console.log(dogObj.name);
        const actualDog = new Dog(dogObj);
        // console.log(actualDog);
        actualDog.render('#dog-gallery');
      });
      $('.dog-template').remove();
    })
    .then(() => {
      const typeArr = Dog.prototype.allDogTypes;
      typeArr.sort();
      typeArr.forEach(type => {
        $('#type-filter').append($('<option>').attr('value', type).text(type));
      });
    })
    .then(() => {
      handleTypeFilter();
      $('.spinner').fadeOut(500);
      $('#dog-gallery').fadeIn(500);
    });

  function handleTypeFilter() {
    $('#type-filter').on('change', function() {
      if($(this).val() !== 'default') {
        $('.dog').hide();
        $(`.dog[data-type*="${$(this).val()}"]`).fadeIn();
      } else {
        $('.dog').fadeIn();
      }
    });
  }

  function Dog(obj) {
    this.name = obj.name;
    this.image_url = obj.image_url;
    this.hobbies = obj.hobbies;
    this.type = obj.type;
  }

  Dog.prototype.allDogTypes = [];

  Dog.prototype.render = function(placeholder) {
    let $template = $(placeholder).find('.dog-template');
    let $dog = $template.clone();
    $dog.removeClass('dog-template');
    $dog.find('.dog-name').text(this.name);
    $dog.find('.dog-image').attr('src', this.image_url);
    $dog.find('.dog-image').attr('alt', this.name);
    let $hobbies = $dog.find('.dog-hobbies');
    $hobbies.empty();
    this.hobbies.forEach(hobby => {
      $hobbies.append($('<li>').text(hobby));
    });
    $dog.attr('data-type', this.type);
    if(this.allDogTypes.indexOf(this.type) < 0) {
      this.allDogTypes.push(this.type);
    }
    $(placeholder).append($dog);
  };
});
