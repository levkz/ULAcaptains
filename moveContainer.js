let step = 100
let a = -45
let minOffset = a
let maxOffset = a - (charts.length - 1) * step

function ChangeChartByClick(event) {
  scrollCharts({
    code : Math.round(event.clientX/getWidth()) ? "ArrowRight" : "ArrowLeft"
  })
  
}
document.addEventListener("click", ChangeChartByClick);

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}


chartsContainer.setAttribute('style', `transform: translateX(${a}vmin);`)
function scrollCharts(event) {
  if (event.code == 'ArrowLeft') {
    a += step
  }
  if (event.code == 'ArrowRight') {
    a -= step
  }
  a = Math.max(maxOffset, a)
  a = Math.min(minOffset, a)
  chartsContainer.setAttribute('style', `transform: translateX(${a}vmin);`)
}

globalContainer.setAttribute('style', `transform: translate(${0}vh, 100vh);`)

setTimeout(
  () =>
    globalContainer.setAttribute('style', `transform: translate(${0}vh, 0);`),
  100
)
