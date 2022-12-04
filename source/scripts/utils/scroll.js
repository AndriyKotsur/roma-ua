import smoothscroll from 'smoothscroll-polyfill'

export default function scrollToTarget(target, offset = 0, callback) {

    let rect = target.getBoundingClientRect()
    smoothscroll.polyfill()

    window.scrollTo({
        top: rect.top + window.scrollY + offset,
        behavior: "smooth",
    })
    
    if (callback) {
        var timer;
        window.onscroll = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback()
            }, 200)
        }
    }
}