$(() => {

 $('#infoButton').click(() => {
     $.ajax({
         type: 'GET',
         url: 'https://swapi.co/api/people'
     }).done((res) => {
        let data = res.results
        for(person of people){
            console.log(person.name)
        }
     })
  })

})