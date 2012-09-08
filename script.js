//Fill destinations first

var results = document.getElementById("destList");
results.innerHTML = tmpl("dest_tmpl", {destinations: destinationData});

//Then set up filtering
var chooser = {
	choices: []
};

$( function () {
	$( "div.criteria" ).on( "click", "fieldset .resetFilters", function(event) {
		event.stopPropagation();
		var $t = $( this );
		var $criteria = $t.closest(".criteria");
		$criteria.find("fieldset.on" ).addClass("off").removeClass("on");
		$criteria.find("input:checked").attr('checked', false);
		$( "table.destinations tr").stop().fadeIn();
		chooser.choices= [];
	});
	$( "div.criteria" ).on( "click", "fieldset:not(.neutral)", function() {
		var $t = $( this );
		if ( $t.hasClass( "off" ) ) {
			$t.removeClass( "off" ).addClass( "on" );
		} else {
			$t.addClass( "off" ).removeClass( "on" );
		}
	});
	$( "div.criteria" ).on( "click", "label", function( e ) {
		e.stopPropagation();
		var $t = $( this ),
			cname = $t.find( "input" ).val(),
			sibs = $t.siblings( "label" ),
			removeIndex,
			classes;
		$( sibs ).each( function() {
			removeIndex = chooser.choices.indexOf( $( this ).find( "input" ).val() );
			if ( removeIndex > -1 ) chooser.choices.splice( removeIndex, 1 );
		});
		if ( cname.length ) {
			if ( cname.indexOf( "." ) > -1 ) {
				$.each( cname.split( "." ), function( i, nm ) {
					chooser.choices.push( nm );
				});
			} else {
				if (chooser.choices.indexOf(cname) === -1){
					chooser.choices.push( cname );
				}
			}
		}
		if ( !chooser.choices.length ) return;
		classes = chooser.choices.join( "." );
		$( "table.destinations tbody tr:not(." + classes + ")" ).stop().fadeOut();
		$( "table.destinations tbody tr." + classes ).stop().fadeIn();
	});
});