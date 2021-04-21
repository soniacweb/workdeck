const emojis = document.querySelectorAll('.avatar')

emojis.forEach(emoji => {
       
        emoji.addEventListener("click", (e) => {
                

                emojis.forEach( (emoji) => {
                if(emojis.className === 'avatar active'){
                emojis.classList.remove('active')
                 }
                })
                e.target.classList.add("active")
                console.log(e.target)
        })
})
