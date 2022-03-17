let step = 100
let a = -45
let minOffset = a
let maxOffset = a - (groups.length - 1) * step

chartsContainer.setAttribute('style', `transform: translateX(${a}vh);`)
function scrollCharts(event) {
  if (event.code == 'ArrowLeft') {
    a += step
  }
  if (event.code == 'ArrowRight') {
    a -= step
  }
  a = Math.max(maxOffset, a)
  a = Math.min(minOffset, a)
  chartsContainer.setAttribute('style', `transform: translateX(${a}vh);`)
}

globalContainer.setAttribute('style', `transform: translate(${0}vh, 100vh);`)

setTimeout(
  () =>
    globalContainer.setAttribute('style', `transform: translate(${0}vh, 0);`),
  100
)
