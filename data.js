const globalContainer = document.querySelector('.container')
const chartsContainer = globalContainer.querySelector('#chartsContainer')

Chart.defaults.color = '#1de8a4'
Chart.defaults.font.size = 16

class groupDataWrapper {
  constructor(group) {
    let [candidates, votesCount] = group.getData() 
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

    this.data = {
      labels: candidates,
      datasets: [
        {
          label: 'Голосуй',
          data: votesCount,
          backgroundColor: colors.slice(0, candidates.length),
          hoverOffset: 4,
        },
      ],
    }

    this.config = {
      type: 'doughnut',
      data: this.data,
      options: {
        plugins: {
          title: {
            display: true,
            text: group.name,
            color: '#1de8a4',
          },
        },
      },
    }
  }
}
