class Candidate {
  constructor(name, group) {
    
    this.name = name
    this.group = group
    this.voters = Object.entries(group.voters).filter(([key, value]) => value === this.name)
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

  static _id = 0

  constructor(voters_data, name = "Group name") {
    this.name = name;
    this.id = Group._id++
    this.voters = Object.fromEntries(Object.entries(voters_data).map(([key, value]) => [key, value[0]]))

    this.candidatesArr = Array.from(new Set(Object.values(this.voters)))
    this.candidates = {}
    for (let candidate of this.candidatesArr) {
      this.candidates[candidate] = new Candidate(candidate, this)
    }

    this.votes = this.candidatesArr.map(candidate => this.candidates[candidate].votes)

    this.wrapper = new groupDataWrapper(this)
  }

  getData() {
    return [this.candidatesArr, this.votes]
  }


}

let groups = {}

async function FetchVotes() {
  Group._id = 0
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
    // data[voter][1] === group
    groups_data[value[1]][key] = value
  }

  for (let group in groups_data) {
    groups[group] = new Group(groups_data[group], group)
  }

  chartsUpdate()
}

FetchVotes()
votingTimeout = setTimeout(FetchVotes, 2000)


function chartsUpdate() {
  maxOffset = a - (Object.keys(groups).length - 1) * step
  let chartHTML = ''
  for (let group of Object.values(groups)) {
    console.log(group)
    chartHTML += `
                <div class="flex">
                  <div class="holder">
                    <canvas id="chart${group.id}" height="1000" width="1000"></canvas>
                  </div>
                </div>
        `
  }
  chartsContainer.innerHTML = chartHTML
  for (let group of Object.values(groups)) {
    charts[group.id] = new Chart(
      document.getElementById(`chart${group.id}`).getContext('2d'),
      group.wrapper.config
    )
  }
  console.log(charts)
}
