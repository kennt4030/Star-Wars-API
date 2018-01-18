$(() => {

    let loaded = false
  
    $('#clearButton').click(() => {
      $('#tableBody').empty()
      $('#dataOne').text('Pick')
      $('#dataTwo').text('From')
      $('#dataThree').text('Above')
      loaded = false
    })
  
    $('#peopleButton').click(() => {
      if(!loaded) {
        loaded = true
  
        $.ajax({
          type: 'GET',
          url: 'https://swapi.co/api/people'
        }).done((res) => {
          $('#dataOne').text('Name')
          $('#dataTwo').text('Height')
          $('#dataThree').text('Birth Year')
  
          let people = res.results
          for(p of people) {
            $('#tableBody').append(createPersonRow(p))
          }
        })
      }
    })
  
    $('#planetButton').click(() => {
      if(!loaded){
        loaded = true
  
        $.get('https://swapi.co/api/planets/')
          .done((res) => {
            $('#dataOne').text('Name')
            $('#dataTwo').text('Diameter')
            $('#dataThree').text('Climate')
  
            let planets = res.results
            for (p of planets) {
              $('#tableBody').append(createPlanetRow(p))
            }
          })
      }
    })
  
    function createPersonRow(person) {
      let row = $(`<tr></tr>`)
      let name = $(`<td>${person.name}</td>`)
      let height = $(`<td>${person.height}</td>`)
      let birth = $(`<td>${person.birth_year}</td>`)
  
      row.append(name, height, birth)
  
      return row
    }
  
    function createPlanetRow(planet) {
      let row = $(`<tr></tr>`)
      let name = $(`<td>${planet.name}</td>`)
      let diameter = $(`<td>${planet.diameter}</td>`)
      let climate = $(`<td>${planet.climate}</td>`)
  
      row.append(name, diameter, climate)
  
      return row
    }
    
    $('#searchPersonForm').submit((e) => {
      e.preventDefault()
      
      let input = $('#inputName').val()
      $('#inputName').val('')  
      $.get(`https://swapi.co/api/people/?search=${input}`)
        .done((res) => {
          let person = res.results[0]
          $('#personInfoPanel').text(`${person.name}'s hair is color is: ${person.hair_color}`)
        })
    })
  })