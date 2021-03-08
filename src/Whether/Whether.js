import Config from "./Config";

const days = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота" ]
const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ]

const getDate = (date) => {
    const dateArr = date.split("/")
    return {
        full: dateArr[0] +" "+ month[dateArr[1]-1] + ` 20${dateArr[2]}`,
        day: days[(new Date(`${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`)).getDay()]
    }
}
const getIcon = (whether) => {
    let icon = ""
    const hours = new Date().getHours()
    const dayTime = (hours > 6 && hours < 21) ? "d" : "n"

    if (!whether.mist) {
        if (whether.cloudiness === 3) icon += "c3"
        else if (whether.cloudiness === 0) icon += dayTime
        else icon += `${dayTime}_c${whether.cloudiness}`
    }
    if (whether.precipitation.intensity > 0) {
        icon += `_${whether.precipitation.type + whether.precipitation.intensity}`
    }

    if (whether.storm) icon += "_st"
    if (whether.cloudiness !== 3 && whether.mist) icon += "_mist"
    if (icon[0] === "_") icon = icon.substr(1)

    return icon
}
const getWindDirect = (direct) => {
    switch (direct){
        case "n": return 0;
        case "s": return 180;
        case "w": return 270;
        case "e": return 90;
        case "nw": return 315;
        case "ne": return 45;
        case "sw": return 225;
        case "se": return 135;
        default: return 0;
    }
}

const WHETHER = Config.map(w => {
    w.img = getIcon(w)
    w.day = getDate(w.date).day
    w.date = getDate(w.date).full
    w.wind.directionDeg = getWindDirect(w.wind.direction)
    return w
})

export default WHETHER
