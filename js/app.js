$(document).ready(function () {

	var	$phones = $('#phones');
	var x = [];
	var y = "";
	$('.alert').hide();
	// Ajax request for json data to populate phones
	$.ajax({
		type: 'GET',
		url: 'products.json',
		success: function (phones) {
			$.each(phones, function(i, phone) {
				$('.products-list').append(''
					+'<li class="product">'
					+'<a href="#" class="photo product-photo">'
					+'<img src="' +phone.image.small+ '" height="130" class="phone-image">'
					+'</a>'
					+'<h2 <a href="#" class="phone-name">'+phone.name+'</a></h2>'
					+'<ul class="product-description">'
					+'<li class='+phone.specs.manufacturer+'><span>Manufacturer: </span>'+phone.specs.manufacturer+'</li>'
					+'<li class='+phone.specs.storage+'><span>Storage: </span>'+phone.specs.storage+' GB</li>'
					+'<li class='+phone.specs.os+'><span>OS: </span>'+phone.specs.os+'</li>'
					+'<li class='+phone.specs.camera+'><span>Camera: </span>'+phone.specs.camera+' Mpx</li>'
					+'<li><span>Description: </span>'+phone.description+'</li>'
					+'</ul>'
					+'<p class="product-price">'+phone.price+'</p>'
					+'</li>'
				);
				// END
			});
		}
	});
	// Pushing the value of the checkbox clicked or un-clicked to an array of x
		$('input[type="checkbox"]').on('change', function run(){
			$(".product").hide();
			var category = this.value;
			if ($(this).is(':checked')) {
				x.push(category)
				var y = (".") + x.join(", .");
				var nonexist = /(?=.*^)(?=.*Apple)(?=.*Android)/;
				var phoneError = nonexist.test(y);
				if (x.length != 0 ){
					$(y).parent('.product-description').parent('.product').fadeIn();
					if (phoneError === true) {
						$(".product").hide();
						$(".alert").fadeIn();
					}
				}
			} else {
				$(".product").fadeIn();
				var toDelete = x.indexOf(category);
				if(toDelete != -1) {
	    			x.splice(toDelete, 1);
	    			run();
				}
				$(".alert").fadeOut();

			}
		})
	// END
	// --------------
	// Clear Filter function to delete everything in the x array as well as uncheck the boxes and show all
	$( "#clear-check" ).click(function() {
  		$('input[type=checkbox]').attr('checked',false);
  		x = [];
  		y = "";
  		$(".product").fadeIn()
  		$(".alert").fadeOut();
	});
	// END	
});