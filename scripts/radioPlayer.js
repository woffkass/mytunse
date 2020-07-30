export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioCoverImg = document.querySelector('.radio-cover__img')
    const radioHeaderBig = document.querySelector('.radio-header__big')
    const radioNavigation = document.querySelector('.radio-navigation')
    const radioItem = document.querySelectorAll('.radio-item')
    const radioStop = document.querySelector('.radio-stop')
    const radioVolume = document.querySelector('.radio-volume')
    const radioVolumeDown = document.querySelector('.radio-volume-down')
    const radioVolumeUp = document.querySelector('.radio-volume-up')

    const activedRadio = document.querySelector('.player-radio')

    const audio = new Audio()
    audio.type = 'audio/aac'

    radioStop.disabled = true

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play')
            radioStop.classList.remove('fa-stop')
        } else {
            radio.classList.add('play')
            radioStop.classList.remove('fa-play')
            radioStop.classList.add('fa-stop')
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'))
        elem.classList.add('select')
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target
        const parrent = target.closest('.radio-item')

        selectItem(parrent)
        
        const title = parrent.querySelector('.radio-name').textContent
        radioHeaderBig.textContent = title

        const urlImg = parrent.querySelector('.radio-img').src
        radioCoverImg.src = urlImg

        radioStop.disabled = false
        audio.src = target.dataset.radioStantion
        audio.play()
        changeIconPlay()
        radioVolume.value = audio.volume * 100
        
    })

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
        changeIconPlay()
    })

    radioVolume.addEventListener('input', () =>{
        audio.volume = radioVolume.value / 100
    })

    radioVolumeUp.addEventListener('click', () => {
        audio.volume = 1
        radioVolume.value = 100
    })

    radioVolumeDown.addEventListener('click', () => {
        if (audio.volume > 0) {
            radiovolumeLevel = audio.volume 
            audio.volume = 0
            radioVolume.value = 0
            radioVolumeDown.classList.remove('fa-volume-down')
            radioVolumeDown.classList.add('fa-volume-off')
        } else {
            audio.volume = radiovolumeLevel
            radioVolume.value = radiovolumeLevel * 100
            radioVolumeDown.classList.remove('fa-volume-off')
            radioVolumeDown.classList.add('fa-volume-down')
        }
    })
    
    let radiovolumeLevel = audio.volume
    
    activedRadio.parentElement.addEventListener('click', () => {
        if (!activedRadio.classList.contains('active')) {
            audio.pause()
        }
    })
   
}