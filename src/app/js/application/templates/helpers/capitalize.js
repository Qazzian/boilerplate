define(['hbs/handlebars','underscore'], function ( Handlebars ,_){
  function capitalize (  ) {
      console.log(arguments);
      var text = _.filter(arguments,function(arg){
          return (typeof arg == "string");
      }).join(" ");
      return text.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

  Handlebars.registerHelper( 'capitalize', capitalize );
  return capitalize;
});
