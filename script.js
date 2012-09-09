//Fill destinations first
destinationData.sort(function(a, b) {return a.name > b.name ? 1 : -1 ;});
var results = document.getElementById("destList");
results.innerHTML = tmpl("dest_tmpl", {destinations: destinationData});

//set up the tooltip
$(".destinations tbody td:not(:last-child,:first-child)").tooltip();
//set up the popover
var $visiblePopover;
$(".destinations tbody td:first-child").popover({
    content: function(){
        var $this = $(this);
        var img = "<img src='http://maps.googleapis.com/maps/api/staticmap?center="+$this.data("original-title")+"&zoom=3&size=200x200&maptype=roadmap&sensor=false'/>";
        return img;
    }
});

$(".destinations tbody td:first-child").on('click', function() {
  var $this = $(this);
  // check if the one clicked is now shown
  if ($this.data('popover').tip().hasClass('in')) {

    // if another was showing, hide it
    $visiblePopover && $visiblePopover.popover('hide');

    // then store reference to current popover
    $visiblePopover = $this;

  } else { // if it was hidden, then nothing must be showing
    $visiblePopover = '';
  }
});


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