let candidates = []
let votes_counter = []
let votes = []
let data = {}

async function FetchCandidates() {
  let res = await fetch("./data/candidates.json")
  let data = await res.json()

  candidates = data
  votes_counter = new Array(candidates.length)
  for (let i = 0; i < votes_counter.length; i++) {
    votes_counter[i] = 0
  }
  
  votes.push(new votesData("Whoever", candidates, votes_counter))
  await FetchVotes()
}
FetchCandidates()


async function FetchVotes() {
  try {
    let res = await fetch("https://fierce-coast-81098.herokuapp.com/https://jsonbase.com/ULAdb/candidates_votes")
    let data = await res.json()
    for (let i = 0; i < votes_counter.length; i++) {
      votes_counter[i] = 0
    }
    
    for (let candidate of Object.keys(data)) {
      if (data[candidate]) {
      votes_counter[candidates.indexOf(data[candidate])]++
    }
    }

    chartsUpdate()
  }
  catch(e){
    console.error(e)
    return
  }
}

votingTimeout = setTimeout(FetchVotes, 2000)
/*
async function FetchData() {
  let res = await fetch(address + request)
  data = await res.json()
  votes.push(
    new votesData(data[0].title, [...data[0].captains], [...data[0].votes])
  )
  votes.push(
    new votesData(data[0].title, [...data[0].captains], [...data[0].votes])
  )
  votes.push(
    new votesData(data[0].title, [...data[0].captains], [...data[0].votes])
  )
  chartsUpdate()
}
*/
function chartsUpdate() {
  maxOffset = a - (votes.length - 1) * step
  let chartHTML = ''
  for (vote of votes) {
    chartHTML += `
                <div class="flex">
                  <div class="holder">
                    <canvas id="chart${vote.id}" height="1000" width="1000"></canvas>
                  </div>
                </div>
        `
  }
  chartsContainer.innerHTML = chartHTML
  for (vote of votes) {
    charts[vote.id] = new Chart(
      document.getElementById(`chart${vote.id}`).getContext('2d'),
      vote.config
    )
  }
}
