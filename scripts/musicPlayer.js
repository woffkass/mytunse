import { addZero } from './subScript.js'

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio')
    const audioImg = document.querySelector('.audio-img')
    const audioHeader = document.querySelector('.audio-header')
    const audioPlayer = document.querySelector('.audio-player')
    const audioNavigation = document.querySelector('.audio-navigation')
    const audioButtonPlay = document.querySelector('.audio-button__play')
    const audioTimePassed = document.querySelector('.audio-time__passed')
    const audioProgress = document.querySelector('.audio-progress')
    const audioProgressTiming = document.querySelector('.audio-progress__timing')
    const audioTimeTotal = document.querySelector('.audio-time__total')

    const playList = ['hello', 'flow', 'speed']

    let trackIndex = 0

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused
        const track = playList[trackIndex]
        
        audioPlayer.src = `./audio/${track}.mp3`
        audioImg.src = `./audio/${track}.jpg`
        audioHeader.textContent = track.toUpperCase()

        if (isPlayed) {
            audioPlayer.pause()
        } else {
            audioPlayer.play()
        }
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--
        } else {
            trackIndex = playList.length - 1
        }
        loadTrack()
    }

    const nextTrack = () => {
        if (trackIndex !== playList.length - 1) {
            trackIndex++
        } else {
            trackIndex = 0
        }
        loadTrack()
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play')
            audioButtonPlay.classList.toggle('fa-play')
            audioButtonPlay.classList.toggle('fa-pause')

            if (audioPlayer.paused) {
                audioPlayer.play()
            } else {
                audioPlayer.pause()
            }

            const track = playList[trackIndex]
            audioHeader.textContent = track.toUpperCase()
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack()
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack()
        }
    })

    audioPlayer.addEventListener('ended', () => {
        nextTrack()
        audioPlayer.play()
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime
        const duration = audioPlayer.duration
        const progerss = (currentTime / duration) * 100

        audioProgressTiming.style.width = progerss + '%'

        let minutePassed = Math.floor(currentTime / 60) || '0'
        let secondsPassed = Math.floor(currentTime % 60) || '0'

        let minuteTotal = Math.floor(duration / 60) || '0'
        let secondsTotal = Math.floor(duration % 60) || '0'

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
    })

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX
        const allWidth = audioProgress.clientWidth
        const progress = (x / allWidth) * audioPlayer.duration
        audioPlayer.currentTime = progress
    })
}