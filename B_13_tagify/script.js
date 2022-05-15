$(document).ready(function () {
    var $input = $('input[name=tags-jquery]')
    .tagify({
            whitelist : [
                {"id":1, "value":"some string"}
            ]
        })
        .on('add', function(e, tagName){
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function(e, tagName) {
            console.log('JQEURY EVENT: ',"invalid", e, ' ', tagName);
        });

// get the Tagify instance assigned for this jQuery input object so its methods could be accessed
    var jqTagify = $input.data('tagify');

    // bind the "click" event on the "remove all tags" button
    $('.tags-jquery--removeAllBtn').on('click', jqTagify.removeAllTags.bind(jqTagify))

    $('.tags-jquery--copy').click(function() {
        let copyText = jqTagify.value.map(item => item.value).join(',');
        navigator.clipboard.writeText(copyText);
    });
});