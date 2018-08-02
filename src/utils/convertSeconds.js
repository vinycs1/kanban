export default function convertSeconds(seconds) {
  let day, hour, minute

  minute = Math.floor(seconds / 60)
  seconds = seconds % 60
  hour = Math.floor(minute / 60)
  minute = minute % 60
  day = Math.floor(hour / 24)
  hour = hour % 24

  return {
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds
  }
}