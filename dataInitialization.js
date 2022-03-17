class Candidate {
  constructor(name, group) {
    
    this.name = name
    this.group = group
    this.voters = Object.fromEntries(group.votes.filter(([key, value]) => value === this.name))
    this.votes = this.voters.length
  }
  
  get votes() {
    return this.voters.length
  }
  
  set votes(value) {
    return
  }
  

}
class Group {
  constructor(voters_data) {
    this.voters = Object.fromEntries(voters_data.map(([key, value]) => [key, value[0]]))

    this.candidatesArr = Array.from(new Set(this.voters.values()))
    this.candidates = {}
    for (candidate of candidatesArr) {
      this.candidates[candidate] = new Candidate(candidate, this)
    }

    this.votes = this.candidatesArr.map(candidate => this.candidates[candidate].votes)
  }

  getData() {
    return [this.candidates, this.votes]
  }


}


let candidates = []
let votes_counter = []
let votes = []
let data = {}
let groups = {}

async function FetchCandidates() {
  let res = await fetch("./data/candidates.json")
  let data = await res.json()

  let groups_data = {}
  let groupSet = new Set()
  for (voter of data) {
    groupSet.add(voter[1])
  }
  groupSet.forEach(group => {
    groups_data[group] = {}
  })

  for (voter in data) {
    // data[voter][1] === group
    groups_data[data[voter][1]][voter] = data[voter]
  }

  for (group in groups_data) {
    groups[group] = new Group(groups_data[group])
  }
  
  votes.push(new votesData(groups))
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
