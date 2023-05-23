$(document).ready(function() {
    $('#translateBtn').click(function() {
      var text = $('#text').val();
      var sourceLanguage = $('#sourceLanguage').val();
      var targetLanguage = $('#targetLanguage').val();

      translateText(text, sourceLanguage, targetLanguage);
    });

    function translateText(text, sourceLanguage, targetLanguage) {
      var endpoint = 'https://api.mymemory.translated.net/get';

      $.ajax({
        url: endpoint,
        type: 'GET',
        data: {
          q: text,
          langpair: sourceLanguage + '|' + targetLanguage
        },
        success: function(response) {
          var translation = response.responseData.translatedText;
          $('#translatedText').text(translation);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });