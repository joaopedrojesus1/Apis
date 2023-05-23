$(document).ready(function() {
    $('#searchBtn').click(function() {
      var selectedDate = $('#dateSelect').val();

      $.ajax({
        url: 'https://disease.sh/v3/covid-19/historical/all?lastdays=all',
        method: 'GET',
        success: function(response) {
          var historicalData = response['cases'];
          var deathsData = response['deaths'];

          var casesCount = historicalData[selectedDate];
          var deathsCount = deathsData[selectedDate];

          $('#cases').text('Casos em ' + selectedDate + ': ' + casesCount);
          $('#deaths').text('Mortes em ' + selectedDate + ': ' + deathsCount);
        },
        error: function() {
          alert('Falha ao obter os dados da COVID-19');
        }
      });
    });
  });
  // Preenche as opções de data no seletor
  $(document).ready(function() {
    $.ajax({
      url: 'https://disease.sh/v3/covid-19/historical/all?lastdays=all',
      method: 'GET',
      success: function(response) {
        var historicalData = response['cases'];

        Object.keys(historicalData).forEach(function(date) {
          $('#dateSelect').append('<option value="' + date + '">' + date + '</option>');
        });
      },
      error: function() {
        alert('Falha ao obter os dados da COVID-19');
      }
    });
  });