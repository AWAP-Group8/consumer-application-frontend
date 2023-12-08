import { Input, Modal, Card, message } from 'antd';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { SearchOutlined } from '@ant-design/icons'
import Icon, { BellOutlined, InboxOutlined, ProfileOutlined, UserDeleteOutlined, RightOutlined } from '@ant-design/icons';
import './HomePage.scss'
import axios from '../../axios'
import transformTime from '../../utils/transformTime'

function HomePage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [parcel, setParcel] = useState({})
  const [messageApi, contextHolder] = message.useMessage()
  const { confirm } = Modal
  const trackParcel = async (e) => {
    setOpen(true);
    const tracking_number = e.target.value
    const { data: { res } } = await axios.get('/parcel/findTrackingNumber', {
      params: {
        tracking_number
      }
    })
    setParcel(res)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const deleAccount = async () => {
    confirm({
      title: 'Do you Want to delete account?',
      centered: true,
      onOk: async () => {
        const { msg } = await axios.post('/user/delete')
        messageApi
          .open({
            type: 'success',
            content: msg,
            duration: 1
          })
          .then(() => {
            localStorage.clear()
            navigate('/', { replace: true })
          })
      }
    })
  }

  return (
    <>
      {contextHolder}
      <div className='home-container'>
        <div className='background-pic'>
          <img src='src/images/1.jpeg'></img>
        </div>
        <div className="container-bottom">
          <div className="left">
            <div className='input-container'>
              <h1>Track your item</h1>
              <Input size="large" onPressEnter={trackParcel} placeholder="tracking number" suffix={<SearchOutlined />} />
            </div>
          </div>
          <div className="right">
            <ul className='link-container-left'>
              <li className='history' onClick={() => navigate('/layout/my')}>
                <span className='icon'>
                  <Icon component={ProfileOutlined} />
                </span>
                <span> Infomation History</span>
                <span className="right-arrow">
                  <Icon component={RightOutlined} />
                </span>
              </li>
              <li className='notification' onClick={() => navigate('/layout/notification')}>
                <span className='icon'>
                  <Icon component={BellOutlined} />
                </span>
                <span> Notification</span>
                <span className="right-arrow">
                  <Icon component={RightOutlined} />
                </span>
              </li>
            </ul>
            <ul className="link-container-right" >
              <li className="send-parcel" onClick={() => navigate('/sendparcel')}>
                <span className='icon'>
                  <Icon component={InboxOutlined} />
                </span>
                <span> Send a parcel</span>
                <span className="right-arrow">
                  <Icon component={RightOutlined} />
                </span>
              </li>
              <li className="deletion" onClick={deleAccount}>
                <span className='icon'>
                  <Icon component={UserDeleteOutlined} />
                </span>
                <span> Deletion Account</span>
                <span className="right-arrow">
                  <Icon component={RightOutlined} />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <Modal
          title=""
          open={open}
          onCancel={hideModal}
          footer={null}
        >
          <Card className='my-card'>
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
        </Modal>
      </div>
    </>
  )
}

export default HomePage
