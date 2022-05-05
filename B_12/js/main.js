$(document).ready(function() {
  $('.slt-level').select2({ 
    width: '100%',
    minimumResultsForSearch: -1 
  });
  $('.slt-level').on('change', function() {
    console.log($(this).val());
  });
});