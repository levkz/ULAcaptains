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

class Group {

  static _id = 0

  constructor(voters_data, name = "Group name") {
    this.name = name;
    this.id = Group._id++
    
    this.initData(voters_data)
    this.wrap()
  }

  initData(voters_data) {
    this.votes = Array.from(Object.entries(voters_data).map(candidateData => candidateData[1]))
    this.candidatesArr = Array.from(Object.entries(voters_data).map(candidateData => candidateData[0]))
  }
  
  updateData(voters_data) {
    this.initData(voters_data)

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