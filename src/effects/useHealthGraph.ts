import { RootState } from '../store/types';
import { MatchStats, Settings  } from '../types';
import { characters } from '../services/images';
import { useSelector } from 'react-redux';
import {
  selectMatchStats,
  selectSettings
} from '../store/selectors';

export const useHealthGraph = () => {
  const matchStats = useSelector<RootState, MatchStats>(selectMatchStats);
  const settings = useSelector<RootState, Settings>(selectSettings);
  const datasets = generateDatasets(matchStats.stats.event_data);

  return {
    data: datasets,
    plugins: [
      {
        afterDraw: stockIconPlugin(
          settings.game,
          Object.values(matchStats.players).reduce((acc, p) => {
            acc[p.player] = p.character.internal_name;
            return acc;
          }, {})
        )
      }
    ],
    options: {
      layout: {
        padding: {
          top: 75,
          left: 20,
          right: 40
        }
      },
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: true,
          min: 0,
          max: 150,
          ticks: {
            fontColor: settings.theme.white,
            maxTicksLimit: 7,
            fontSize: 30,
            fontFamily: 'source-code-pro',
            callback: function(value, index, values) {
              return value + '%  ';
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Health (%)',
            fontColor: settings.theme.white,
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
            fontColor: settings.theme.white,
            fontSize: 24,
            fontFamily: 'source-code-pro',
            maxTicksLimit: 15,
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
          scaleLabel: {
            display: true,
            labelString: 'Time (m:ss)',
            fontColor: settings.theme.white,
            fontSize: 30,
            fontFamily: 'Montserrat',
          }
        }]
      },
    }
  }
}

type Dataset = [
  {
    x: number,
    y: number
  }
];

const generateDatasets = (eventData: MatchStats['stats']['event_data']): { dataset: Dataset } => {

  const getPlayer = (idx: number) => {
    return eventData[idx].port;
  }
  const datasets = eventData.map((ed, idx) => {
    let deathDataPoints = ed.health_at_death_data;

    let lineColor = null;
    if (getPlayer(idx) === 1) {
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
      pointRadius: 0,
      data: ed.health_data.map(d => ({
        x: d[0],
        y: d[1],
        died: (() => {
          if (deathDataPoints && deathDataPoints.length && deathDataPoints[0][0] === d[0]) {
            deathDataPoints = deathDataPoints.slice(1);
            return true;
          }
          return false;
        })()
      }))
    };
  });

  // Latest time
  let latestTime = Math.max(
    datasets[0].data[datasets[0].data.length - 1].x,
    datasets[1].data[datasets[1].data.length - 1].x,
  );
  const player1StockData = eventData[0].stock_data;
  if (player1StockData.length > 0) {
    latestTime = Math.max(latestTime, player1StockData[player1StockData.length - 1][0]);
  }
  const player2StockData = eventData[0].stock_data;
  if (player2StockData.length > 0) {
    latestTime = Math.max(latestTime, player2StockData[player2StockData.length - 1][0]);
  }

  [1, 0].map(datasetIdx => {
    datasets[datasetIdx].data.push({
      x: latestTime,
      // If this character died, this point should be at 0
      // Otherwise, just extend their 
      y: datasets[datasetIdx].data[datasets[datasetIdx].data.length - 1].died
        ? 0
        : datasets[datasetIdx].data[datasets[datasetIdx].data.length - 1].y,
      died: false
    })
  })

  return { datasets };
}


const generateStockAnnotation = (game: string, character: string) => {
  let image = new Image(64, 39);
  const url = characters[game][character];
  image.src = url;
  return image;
}

const stockIconPlugin = (game: string, playerCharacters: { [playerNumber: number]: string }) => {
  return (chart) => {
    const images: Record<number, string> = {
      1: generateStockAnnotation(game, playerCharacters[1]),
      2: generateStockAnnotation(game, playerCharacters[2]),
    }
    const colors: Record<number, string> = {
      1: '#fd5f5f',
      2: '#3232ff'
    }
    chart.config.data.datasets.map((dataset, didx) => {
      dataset.data.map((health, idx) => {
        if (health.died) {
          let x, y = null;
          let healthValue = 0;
          try {
            x = Object.values(chart.config.data.datasets[didx]._meta)[0].data[idx+1]._model.x;
            y = Object.values(chart.config.data.datasets[didx]._meta)[0].data[idx]._model.y;
            healthValue = chart.config.data.datasets[didx].data[idx].y;
          } catch {
            x = Object.values(chart.config.data.datasets[didx]._meta)[0].data[idx]._model.x;
            y = Object.values(chart.config.data.datasets[didx]._meta)[0].data[idx - 1]._model.y;
            healthValue = chart.config.data.datasets[didx].data[idx - 1].y;
          }
          y -= 45;

          // Stake
          chart.ctx.beginPath();
          let gradient = chart.ctx.createLinearGradient(x, y, x, y + 80);
          gradient.addColorStop(0, colors[didx+1]);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          chart.ctx.strokeStyle = gradient;
          chart.ctx.lineWidth = 5;
          chart.ctx.moveTo(x, y);
          chart.ctx.lineTo(x, y + 90);
          chart.ctx.stroke();
          chart.ctx.closePath();

          // Draw stock icons
          const image = images[didx + 1]

          // Draw background
          chart.ctx.fillStyle = colors[didx+1];
          chart.ctx.fillRect(x - image.width / 2, y - image.height / 2, image.width, image.height);

          chart.ctx.drawImage(image, x - image.width / 2, y - image.height / 2, image.width, image.height);

          chart.ctx.font = '24px source-code-pro';
          chart.ctx.textAlign = 'center';
          chart.ctx.fillStyle = 'white';
          chart.ctx.fillText(`${healthValue}%`, x, y - 32)
        }
      })
    })
  }
}
