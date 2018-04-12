$(() => {
  
  localStorage.clear()
  let movies = []
  let tvShows = []

  $('#clearButton').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Pick')
    $('#dataTwo').text('From')
    $('#dataThree').text('Above')
  })

  $('#peopleButton').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Name')
    $('#dataTwo').text('Height')
    $('#dataThree').text('Birth Year')

    if(!localStorage.getItem('storedPeople')){
      $.ajax({
        type: 'GET',
        url: 'https://swapi.co/api/people'
      }).done((res) => {
        let people = res.results
        for(p of people) {
          storedPeople.push({name: p.name, height: p.height, birth_year: p.birth_year})
          $('#tableBody').append(createPersonRow(p))
        }
        localStorage.setItem('storedPeople', JSON.stringify(storedPeople))
      })
    } else {
      for(p of storedPeople) {
        $('#tableBody').append(createPersonRow(p))
      }
    }
  })

  $('#planetButton').click(() => {
    $('#tableBody').empty()
    $('#dataOne').text('Name')
    $('#dataTwo').text('Diameter')
    $('#dataThree').text('Climate')
    
    if(!localStorage.getItem('storedPlanets')) {
      $.get('https://swapi.co/api/planets/')
      .done((res) => {
        let planets = res.results
        for(p of planets) {
          storedPlanets.push({name: p.name, diameter: p.diameter, climate: p.climate})
          $('#tableBody').append(createPlanetRow(p))
        }
        localStorage.setItem('storedPlanets', JSON.stringify(storedPlanets))
      })
    } else {
      for(p of storedPlanets) {
        $('#tableBody').append(createPlanetRow(p))
      }
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
        $('#personInfoPanel').text(`${person.name}'s hair is: ${person.hair_color}`)
      })
  })
})