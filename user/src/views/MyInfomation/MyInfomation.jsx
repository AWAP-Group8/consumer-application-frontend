import { Card, Modal } from 'antd'
import './MyInfomation.scss'
import axios from '../../axios'
import { useEffect, useState } from 'react'
import transformTime from '../../utils/transformTime'

let isLock = true
let apiUrl = '/parcel/findAll'
let start = 0

function MyInfomation() {
  // const navigate = useNavigate()
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  const [parcels, setParcels] = useState([])
  // 在页面载入时触发
  useEffect(() => {
    const fetchData = async () => {
      const { data: { count: count1 } } = await axios.get('/parcel/findAllCount')
      const { data: { count: count2 } } = await axios.get('/parcel/findSentCount')
      const { data: { count: count3 } } = await axios.get('/parcel/findReceivedCount')
      const { data: { list } } = await axios.get('/parcel/findAll', {
        params: {
          start: 0
        }
      })
      isLock = false
      setCount1(count1)
      setCount2(count2)
      setCount3(count3)
      setParcels(list)
    }
    fetchData()
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight > scrollHeight - 50 && !isLock) {
        console.log('reach bottom')
        isLock = true
        start++
        console.log(apiUrl)
        getParcel('concact')
      }
    })
  }, [])
  const getParcel = async (mode = 'replace') => {
    const { data: { list } } = await axios.get(apiUrl, {
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

  const getAll = async () => {
    start = 0
    apiUrl = '/parcel/findAll'
    getParcel()
  }

  const getSent = async () => {
    start = 0
    apiUrl = '/parcel/findSent'
    getParcel()
  }

  const getReceived = async () => {
    start = 0
    apiUrl = '/parcel/findReceived'
    getParcel()
  }

  const [open, setOpen] = useState(false);
  const [parcelHistories, setParcelHistories] = useState([])
  const getDetail = async (tracking_number) => {
    const { data: { historyList } } = await axios.get('/parcel/findHistory', {
      params: {
        tracking_number
      }
    })
    setParcelHistories(historyList)
    setOpen(true)
    console.log(historyList)
  }
  const hideModal = () => {
    setOpen(false);
  };

  return (

    <>
      <div className='container-order'>
        <ul className='order'>
          <li className="all" onClick={getAll} >
            <div>All parcels ({count1})</div>
          </li>
          <li className="sent" onClick={getSent}>
            <div>Sent ({count2})</div>
          </li>
          <li className="received" onClick={getReceived}>
            <div>Received ({count3})</div>
          </li>
        </ul>
        <div className="order-details">
          {
            parcels.map(parcel => (
              <Card onClick={() => getDetail(parcel.tracking_number)} key={parcel.tracking_number} className='my-card'>
                <div>
                  <span>trackning number: </span>
                  <span className="bolder">{parcel.tracking_number}</span>
                </div>
                <div>
                  <span>sender name: </span>
                  <span className="bolder">{parcel.sender_name}</span>
                </div>
                <div>
                  <span>sender email: </span>
                  <span className="bolder">{parcel.sender_email}</span>
                </div>
                <div>
                  <span>receiver name: </span>
                  <span className="bolder">{parcel.receiver_name}</span>
                </div>
                <div>
                  <span>receiver email: </span>
                  <span className="bolder">{parcel.receiver_email}</span>
                </div>
                <div>
                  <span>parcel status: </span>
                  <span className="bolder">{parcel.parcel_status}</span>
                </div>
                <div>
                  <span>arrive time: </span>
                  <span className="bolder">{transformTime(parcel.arrive_time)}</span>
                </div>
                <div>
                  <span>pickup time: </span>
                  <span className="bolder">{transformTime(parcel.pickup_time)}</span>
                </div>
              </Card>
            ))
          }

        </div>
        <Modal
          title=""
          open={open}
          onCancel={hideModal}
          footer={null}
        >
          {
            parcelHistories.map(parcel => (
              <Card className='my-card' key={parcel.id}>
                <div>
                  <span>sender name: </span>
                  <span className="bolder">{parcel.sender_name}</span>
                </div>
                <div>
                  <span>sender email: </span>
                  <span className="bolder">{parcel.sender_email}</span>
                </div>
                <div>
                  <span>receiver name: </span>
                  <span className="bolder">{parcel.receiver_name}</span>
                </div>
                <div>
                  <span>receiver email: </span>
                  <span className="bolder">{parcel.receiver_email}</span>
                </div>
                <div>
                  <span>trackning number: </span>
                  <span className="bolder">{parcel.tracking_number}</span>
                </div>
                <div>
                  <span>parcel status: </span>
                  <span className="bolder">{parcel.parcel_status}</span>
                </div>
                <div>
                  <span>arrive time: </span>
                  <span className="bolder">{transformTime(parcel.arrive_time)}</span>
                </div>
                <div>
                  <span>pickup time: </span>
                  <span className="bolder">{transformTime(parcel.pickup_time)}</span>
                </div>
              </Card>
            ))
          }
        </Modal>
      </div>
    </>
  )
}

export default MyInfomation