import Icon, { CaretRightOutlined } from '@ant-design/icons'
import { message, Modal } from 'antd'
import './index.scss'
import { useNavigate, Outlet } from "react-router-dom"
import logoImg from '../../images/logo.png'
import axios from '../../axios'

function Wrapper() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const { confirm } = Modal
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
      <div className="my-infomation">
        <div className='navbar'>
          <div className="nav-left">
            <div className="logo" onClick={() => navigate('/homepage')}>
              <img src={logoImg} />
              <div className='gogoship'><span className='gogo'>GoGo</span>Ship</div>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="sidebar">
            <ul>
              <li className='infomation' onClick={() => navigate('/layout/my')}>
                <span>Infomation history </span>
                <Icon component={CaretRightOutlined} />
              </li>
              <li className='notification' onClick={() => navigate('/layout/notification')}>
                <span>Notification  </span>
                <Icon component={CaretRightOutlined} />
              </li>
              <li className='send-parcel' onClick={() => navigate('/sendParcel')}>
                <span>Send a parcel  </span>
                <Icon component={CaretRightOutlined} />
              </li>
              <li className='deletion' onClick={deleAccount}>
                <span>Account deletion  </span>
                <Icon component={CaretRightOutlined} />
              </li>
            </ul>
          </div>
          <div className="content">
            <Outlet />
          </div >
        </div>
      </div>
    </>
  )
}

export default Wrapper