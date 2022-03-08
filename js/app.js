
var api = '//b19.local/swish-roulette/api';
var api = '//b19.se/swish-roulette/api';

var debug = true;


$.when( $.ready ).then(function() {
  // Document is ready.
  if(debug) { console.log('ready-start'); }

  /* Load categories */
  getCategories();

  getRandomInCategory('insamlingskontroll');


  if(debug) { console.log('ready-end'); }
});


function getRandomInCategory(term) {
  var url = api + "/getRandomInCategory/" + term;
  $.getJSON( url, function( data ) {
    var items = [];
    // console.log(data);
    // $.each( data, function( key, val ) { });
    if(data) {
      $( '#swish-organisation-name' ).html(data['orgName']);
      $( '#swish-organisation-number' ).html(data['orgNumber']);
      $( '#swish-organisation-homepage' ).html('<a href=\"' + data['web'] + '\" target=\"_blank\">' + data['orgName'] + '</a>');
      var variants = getFunkyPresentation(data['entry']);
      $( '#swish-entry-variants').html(variants);
    }
  });
}

function getFunkyPresentation(term) {
  var url = api + "/getFancyPresentation/" + term;
  $.getJSON( url, function( data ) {
    var items = [];
    // console.log(data);
    $.each( data, function( key, val ) {
      // console.log(key, val);
      items.push("<li>" + val + "</li>");
    });
    // console.log(items);
    $( '#swish-entry-variants').html(items.join(""));
  });
}


function getCategories() {
  var url = api + "/getCategories";
  $.getJSON( url, function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      category_caption = val['category'];
      category_quantity = val['quantity'];
      items.push( "<li id='" + category_caption + "'>" + category_caption + "</li>" );
      // console.log(key, val, category_caption);
    });
    $( 'ul#categories-list' ).html( items.join("") );
  });
}
