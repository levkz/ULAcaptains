function anyKeyPressed(event) {
  globalContainer.setAttribute(
    'style',
    `transform: translate(-100vw, 0);`
  )
  document.addEventListener('keydown', scrollCharts)
  document.addEventListener('click', ChangeChartByClick)
  document.removeEventListener('keydown', anyKeyPressed)
  document.removeEventListener('click', anyKeyPressed)
}

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
    
    this.initData(voters_data)
    this.wrap()
  }

  initData(voters_data) {
    this.voters = Object.fromEntries(Object.entries(voters_data).map(([key, value]) => [key, value[0]]))
    
    this.candidatesArr = Array.from(new Set(Object.values(this.voters)))
    this.candidates = {}
    for (let candidate of this.candidatesArr) {
      this.candidates[candidate] = new Candidate(candidate, this)
    }
    
  }
  
  updateData(voters_data) {
    this.initData(voters_data)
    
    this.votes = this.candidatesArr.map(candidate => this.candidates[candidate].votes)
    this.chartData.labels = this.candidatesArr
    this.chartData.datasets[0].data = this.votes
  }
  
  wrap() {
   let colors = [
     '#f44336',
     '#ffeb3b',
     '#8a4af3',
     '#8bc34a',
     '#ffc107',
     '#1ee9a4',
   ]
  
   for (let i = 0; i < colors.length; i++) {
     let r = Math.floor(colors.length * Math.random())
     //
     ;[colors[i], colors[r]] = [colors[r], colors[i]]
   }
  
   this.chartData = {
     labels: this.candidatesArr,
     datasets: [
       {
         label: 'Голосуй',
         data: this.votes,
         backgroundColor: colors,
         hoverOffset: 4,
       },
     ],
   }
  
   
  
   this.chartConfig = {
     type: 'doughnut',
     data: this.chartData,
     options: {
       plugins: {
         title: {
           display: true,
           text: this.name,
           color: '#1de8a4',
         },
       },
     },
   }
  }
  
}