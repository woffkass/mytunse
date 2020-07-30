import { addZero } from './subScript.js'

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoProgress = document.querySelector('.video-progress')
    const videoVolume = document.querySelector('.video-volume')
    const videoTimeTotal = document.querySelector('.video-time__total')
    const videoFullscreen = document.querySelector('.video-fullscreen')
    const volumeUp = document.querySelector('.volume-up')
    const volumeDown = document.querySelector('.volume-down')
    const activedVideo = document.querySelector('.player-video')

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.remove('fa-play')
            videoButtonPlay.classList.add('fa-pause')
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
        } else {
            videoPlayer.pause()
        }
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
    }


    videoPlayer.addEventListener('click', togglePlay)
    videoButtonPlay.addEventListener('click', togglePlay)
    
    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)
    videoButtonStop.addEventListener('click', stopPlay)

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime / duration) * 100

        let minutePassed = Math.floor(currentTime / 60)
        let secondsPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondsTotal = Math.floor(duration % 60)

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
    })

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen()
    })

    videoVolume.addEventListener('input', () =>{
        videoPlayer.volume = videoVolume.value / 100
    })

    volumeUp.addEventListener('click', () => {
        videoPlayer.volume = 1
        videoVolume.value = 100
    })

    volumeDown.addEventListener('click', () => {
        if (videoPlayer.volume > 0) {
            volumeLevel = videoPlayer.volume 
            videoPlayer.volume = 0
            videoVolume.value = 0
            volumeDown.classList.remove('fa-volume-down')
            volumeDown.classList.add('fa-volume-off')
        } else {
            videoPlayer.volume = volumeLevel
            videoVolume.value = volumeLevel * 100
            volumeDown.classList.remove('fa-volume-off')
            volumeDown.classList.add('fa-volume-down')
        }
    })
    
    let volumeLevel = videoPlayer.volume
    videoVolume.value = videoPlayer.volume * 100
    
    activedVideo.parentElement.addEventListener('click', () => {
        if (!activedVideo.classList.contains('active')) {
            stopPlay()
        }
    })
}