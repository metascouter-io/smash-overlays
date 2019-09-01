import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { icons } from '../services/images';

const toTS = (sec_num) => {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

const generateStockAnnotation = (game, character) => {
  let image = new Image(25, 25);
  const url = icons[game][character];
  image.src = url;
  return image;
}

class MatchGraph extends Component {
  constructor(props) {
    super();

    const { datasets } = this.generateDatasets(props.eventData);

    this.state = {
      data: {
        datasets
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          fullWidth: true,
          labels: {
            fontSize: 20,
            fontColor: '#fff',
            fontFamily: 'Montserrat',
          }
        },
        scales: {
          yAxes: [{
            display: true,
            min: 0,
            max: 150,
            ticks: {
              fontColor: '#ffffff',
              maxTicksLimit: 7,
              fontSize: 20,
              fontFamily: 'Montserrat',
              callback: function(value, index, values) {
                return value + '%  ';
              }
            },
            gridLines: {
              color: 'rgba(255, 255, 255, .9)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Health (%)',
              fontColor: '#ffffff',
              fontSize: 24,
              fontFamily: 'Montserrat',
            }
          }],
          xAxes: [{
            display: true,
            type: 'time',
            time: {
              unit: 'millisecond',
              displayFormats: {
                millisecond: 'SSS'
              }
            },
            distribution: 'linear',
            ticks: {
              fontColor: '#ffffff',
              fontSize: 16,
              fontFamily: 'Montserrat',
              callback: function(value, index, values) {
                let time = value;
                let minutes = Math.floor(time / 60);
                let seconds = time - (minutes * 60);
                if(seconds < 10) {
                  seconds = "0" + seconds;
                }
                return minutes + ":" + seconds;
              }
            },
            gridLines: {
              color: 'rgba(255, 255, 255, .9)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Time (m:ss)',
              fontColor: '#ffffff',
              fontSize: 24,
              fontFamily: 'Montserrat',
            }
          }]
        },
      },
      plugins: [
        {
          // Add stock icons to data where a kill happens
          afterDraw: (chart) => {
            const images = {
              1: generateStockAnnotation(props.game, props.playerCharacters[1]),
              2: generateStockAnnotation(props.game, props.playerCharacters[2]),
            }
            const colors = {
              1: '#fd5f5f',
              2: '#3232ff'
            }
            chart.config.data.datasets.map((dataset, didx) => {
              dataset.data.map((health, idx) => {
                if (health.died) {
                  let x = null;
                  try {
                    x = chart.config.data.datasets[didx]._meta[0].data[idx+1]._model.x;
                  } catch {
                    x = chart.config.data.datasets[didx]._meta[0].data[idx]._model.x;
                  }
                  const y = 20;

                  // Stake 
                  chart.ctx.beginPath();
                  let gradient = chart.ctx.createLinearGradient(x, y, x, y + 50);
                  gradient.addColorStop(0, colors[didx+1]);
                  gradient.addColorStop(1, '#00000000');
                  chart.ctx.strokeStyle = gradient;
                  chart.ctx.lineWidth = 5;
                  chart.ctx.moveTo(x, y);
                  chart.ctx.lineTo(x, y + 70);
                  chart.ctx.stroke();
                  chart.ctx.closePath();

                  // Gradient 
                  chart.ctx.beginPath();
                  gradient = chart.ctx.createRadialGradient(x, y, 10, x, y, 30);
                  gradient.addColorStop(0, colors[didx+1]);
                  gradient.addColorStop(1, '#00000000');
                  chart.ctx.arc(x, y, 40, 0, 2 * Math.PI);
                  chart.ctx.fillStyle = gradient;
                  chart.ctx.fill();
                  chart.ctx.closePath();

                  // Draw stock icons
                  const image = images[didx + 1]
                  chart.ctx.drawImage(image, x - image.width / 2, y - image.height / 2, image.width, image.height);
                  
                  // Draw slash through icons
                  chart.ctx.beginPath();
                  chart.ctx.strokeStyle = 'red';
                  chart.ctx.lineWidth = 8;
                  chart.ctx.moveTo(x - 10, y - 10);
                  chart.ctx.lineTo(x + 10, y + 10);
                  chart.ctx.stroke();
                  chart.ctx.closePath();
                }
              })
            })
          }
        }
      ]
    }
  }

  componentWillReceiveProps(newProps) {
    this.updateSeries(newProps.eventData);
  }

  updateSeries(eventData) {
    const { datasets } = this.generateDatasets(eventData);
    this.setState({
      data: {
        ...this.data,
        datasets
      }
    })
  }

  generateDatasets(eventData) {

    const getPlayer = (idx) => {
      return eventData[idx].port;
    }
    const datasets = eventData.map((ed, idx) => {
      let deathDataPoints = ed.health_at_death_data;

      let lineColor = null;
      if (getPlayer(idx) == 1) {
        lineColor = '#fd5f5f';
      } else {
        lineColor = '#3232ff';
      }

      const borderColor = lineColor;
      const pointBackgroundColor = lineColor;
      return {
        label: ed.name.split('(')[1].split(')')[0],
        steppedLine: true,
        borderColor,
        pointBackgroundColor,
        borderWidth: 5,
        data: ed.health_data.map(d => ({
          x: d[0],
          y: d[1],
          died: (() => {
            if (deathDataPoints && deathDataPoints.length && deathDataPoints[0][0] == d[0]) {
              deathDataPoints = deathDataPoints.slice(1);
              return true;
            }
            return false;
          })()
        }))
      }
    })

    // Latest time
    const latestTime = Math.max(
      datasets[0].data[datasets[0].data.length - 1].x,
      datasets[1].data[datasets[1].data.length - 1].x,
      eventData[0].stock_data[eventData[0].stock_data.length - 1][0],
      eventData[1].stock_data[eventData[1].stock_data.length - 1][0]
    ) + 0.05; // add so ending stock annotation doesnt get hidden
    datasets[1].data.push({
      x: latestTime,
      y: datasets[1].data[datasets[1].data.length - 1].y
    })
    datasets[0].data.push({
      x: latestTime,
      y: datasets[0].data[datasets[0].data.length - 1].y
    })

    return { datasets };
  }

  render() {

    return (
        <Line data={this.state.data}
              options={this.state.options}
              plugins={this.state.plugins}/>
    )
  }
}

export default MatchGraph;
