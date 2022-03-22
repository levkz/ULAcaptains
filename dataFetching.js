let groups = {}

async function FetchVotes() {
    let data
    while (true) {
        try {
            let res = await fetch("https://fierce-coast-81098.herokuapp.com/https://jsonbase.com/ULAdb/candidates_votes")
            if (!res.ok) {
                throw new Error("couln't fetch the data, trying again")
            }
            data = await res.json()
            break
        }
        catch(e){
            console.error(e)
        }
    }
  let groups_data = {}

  let groupSet = new Set(Object.values(data).map(value => value[1]))
  groupSet.forEach(group => {
    groups_data[group] = {}
  })

  for (let [key, value] of Object.entries(data)) {
    groups_data[value[1]][key] = value
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
    document.addEventListener('touchend', anyKeyPressed)
    return setInterval(2000, FetchVotes())
}

let interv = startFetching()

function chartsUpdate() {
    
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

