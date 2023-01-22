import { FC, useEffect, useRef, useState } from 'react'

import {
  CategoryScale,
  Chart,
  ChartType,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { useRecoilValue } from 'recoil'
import { uiMode } from '../../recoil/atoms'
import { UiMode } from '../../constants/enums'

Chart.register(
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
)

export type DataSet = {
  borderColor: string
  backgroundColor: string
  label: string
  data: number[]
  fill: boolean
  pointRadius: number
  stepped: string
}

export type ChartData = {
  labels: string[]
  datasets: DataSet[]
}

export interface StepChartProps {
  data: ChartData
  stepSize?: number
}

const StepChart: FC<StepChartProps> = ({ data, stepSize }) => {
  const chartEl = useRef(null)
  const mode = useRecoilValue(uiMode)
  const [hasAnimated, toggleAnimated] = useState(false)

  useEffect(() => {
    const ctx = chartEl.current

    if (!ctx) return

    const config = {
      type: 'line' as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: hasAnimated ? 0 : 1500,
          onComplete: () => {
            if (data.datasets.length) {
              toggleAnimated(true)
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: mode === UiMode.DARK ? 'rgba(0, 0, 0, .8)' : '#ffffff',
            bodyColor: mode === UiMode.DARK ? '#ffffff' : '#000000',
            titleColor: mode === UiMode.DARK ? '#ffffff' : '#000000',
          },
        },
        interaction: {
          intersect: false,
          axis: 'x',
        },
        scales: {
          x: {
            grid: {
              color: mode === UiMode.DARK ? 'rgba(255, 255, 255, 0.03)' : '#F3F5FB',
            },
          },
          y: {
            ticks: {
              stepSize,
            },
            grid: {
              color: mode === UiMode.DARK ? 'rgba(255, 255, 255, 0.03)' : '#F3F5FB',
            },
          },
        },
      },
    }

    try {
      new Chart(ctx, config as never)
    } catch (e) {
      console.error(e)
      Chart.getChart('stepChart')?.destroy()
      new Chart(ctx, config as never)
    }

    return () => {
      Chart.getChart('stepChart')?.destroy()
    }
  }, [chartEl, data, hasAnimated, mode])

  return (
    <div className='w-full h-full relative'>
      <canvas id='stepChart' ref={chartEl} />
    </div>
  )
}

export default StepChart
