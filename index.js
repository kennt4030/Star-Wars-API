$(() => {

    let loaded = false

 $('#infoButton').click(() => {
     if(!loaded) {
     $.ajax({
         type: 'GET',
         url: 'https://swapi.co/api/people'
     }).done((res) => {
        let people = res.results
         for(p of people) {
            
            $('#tableBody').append(createTableRow(p))
        }
        loaded = true   
     })
    }
  })


  function createTableRow(person) {
        let row = $(`<tr></tr>`)
        let height = $(`<td>${person.height}</td>`)
        let name = $(`<td>${person.name}</td>`)
        let birth = $(`<td>${person.birth_year}</td>`)     

        row.append(name)
        row.append(height)
        row.append(birth)

        return row
  }

  $('#clearButton').click(() => {
      $('#tableBody').empty()
      loaded =false
  })

})