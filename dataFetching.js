let groups = {}

async function FetchVotes() {
    let groups_data
    while (true) {
        try {
            let res = await fetch("https://fierce-coast-81098.herokuapp.com/https://jsonbase.com/ULAdb/candidates_votes")
            if (!res.ok) {
                throw new Error("couln't fetch the data, trying again")
            }
            groups_data = await res.json()
            break
        }
        catch(e){
            console.error(e)
        }
    }
    
  for (let group in groups_data) {
    if (groups[group] === undefined) {
        groups[group] = new Group(groups_data[group], group)
    } else {
        groups[group].updateData(groups_data[group])
    }
  }
  chartsUpdate()
}

async function startFetching() {
    await FetchVotes()
    document.addEventListener('keydown', anyKeyPressed)
    document.addEventListener('click', anyKeyPressed)
    return setInterval(FetchVotes, 2000)
}

let interv = startFetching()

function chartsUpdate() {
    let nameLabel
    for (let group of Object.values(groups)) {
    if (charts[group.id] === undefined) {
        let flexElement = document.createElement("div")
        flexElement.className = "flex"

        let holderElement = document.createElement("div")
        holderElement.className = "holder"

        let chartElement = document.createElement("canvas")
        chartElement.id = `chart${group.id}`
        chartElement.setAttribute("height", "1000")
        chartElement.setAttribute("width", "1000")
        
        holderElement.appendChild(chartElement)
        flexElement.appendChild(holderElement)
        chartsContainer.appendChild(flexElement)
    }
}
  for (let group of Object.values(groups)) {
      if (charts[group.id] === undefined) {
          charts[group.id] = new Chart(
              document.getElementById(`chart${group.id}`).getContext('2d'),
              group.chartConfig
          )
      } else {
            charts[group.id].update()
        }
        maxOffset = a - (charts.length - 1) * step
    }
}

