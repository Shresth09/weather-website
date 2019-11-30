 
console.log('client js loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    m1.textContent = 'Loading...'
    const location = search.value

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            m1.textContent='enter correct location'
            
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            m1.textContent= 'weather of '+data.location
            m2.textContent = data.forecast
            
            
        }
    })
})
   
    
}) 