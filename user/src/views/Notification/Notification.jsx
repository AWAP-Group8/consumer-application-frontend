import { Card } from 'antd'
import './Notification.scss'
import axios from '../../axios'
import { useEffect, useState } from 'react'
import transformTime from '../../utils/transformTime'

let isLock = true
let start = 0

function Notification() {
  const [parcels, setParcels] = useState([])
  // 在页面载入时触发
  useEffect(() => {
    const fetchData = async () => {
      const { data: { list } } = await axios.get('/parcel/findCanPickupParcel', {
        params: {
          start: 0
        }
      })
      isLock = false
      setParcels(list)
    }
    fetchData()
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight > scrollHeight - 50 && !isLock) {
        isLock = true
        start++
        getParcel('concact')
      }
    })
  }, [])
  const getParcel = async (mode = 'replace') => {
    const { data: { data: { list } } } = await axios.get('/parcel/findCanPickupParcel', {
      params: {
        start
      }
    })
    if (mode === 'replace') {
      setParcels(list)
    } else {
      if (list.length !== 0) {
        setParcels(prev => prev.concat(list))
        isLock = false
      } else {
        // no more data, don't fetch again
        isLock = true
      }
    }
  }

  return (

    <>
      <div className='container-order'>
        <div className="order-details">
          {
            parcels.map(parcel => (
              <Card key={parcel.tracking_number} className='my-card'>
                <div>
                  <span>trackning number: </span>
                  <span className="bolder">{parcel.tracking_number}</span>
                </div>
                <div>
                  <span>pickup locker: </span>
                  <span className="bolder">{parcel.pickup_locker}</span>
                </div>
                <div>
                  <span>pickup cabinet: </span>
                  <span className="bolder">{parcel.pickup_cabinet}</span>
                </div>
                <div>
                  <span>pickup code: </span>
                  <span className="bolder">{parcel.pickup_code}</span>
                </div>
                <div>
                  <span>arrive time: </span>
                  <span className="bolder">{transformTime(parcel.arrive_time)}</span>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Notification