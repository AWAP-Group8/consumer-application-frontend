import './SendParcel.scss'
import { Button, Form, Input, Select, message, Modal } from 'antd'
import { useNavigate } from "react-router-dom"
import axios from '../../axios'
import { useEffect, useState } from 'react'
import logoImg from '../../images/logo.png'

function SendParcel() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    console.log(values)
    const data = await axios.post('/parcel/send', values)
    const { success, msg, data: { code } } = data
    if (success) {
      messageApi.open({
        type: 'success',
        content: msg
      })
      setCode(code)
      setOpen(true)
    }
    else {
      messageApi.open({
        type: 'error',
        content: msg
      })
    }

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  const navigateBack = () => {
    navigate(-1)
  }

  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const hideModal = () => {
    setOpen(false)
    navigateBack()
  }

  const [locker, setLocker] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { data: { locker } } = await axios.get('parcel/locker')
      setLocker(locker)
    }
    fetchData()
  }, [])

  const [sendCabinet, setSendCabinet] = useState([])
  const handleSenderChange = async (locker) => {
    const { data: { list } } = await axios.get('parcel/findEmptyCabinet', {
      params: {
        locker
      }
    })
    setSendCabinet(list)
  }

  const [pickupCabinet, setPickupCabinet] = useState([])
  const handlePickupChange = async (locker) => {
    const { data: { list } } = await axios.get('parcel/findEmptyCabinet', {
      params: {
        locker
      }
    })
    setPickupCabinet(list)
  }
  return (
    <>
      {contextHolder}
      <div className='navbar'>
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/homepage')}>
            <img src={logoImg} />
            <div className='gogoship'><span className='gogo'>GoGo</span>Ship</div>
          </div>
        </div>
      </div>
      <div className="container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 500 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label="Sender Name"
            name="sender_name"
            rules={[{ required: true, message: 'Please input sender name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sender Email"
            name="sender_email"
            rules={[{ required: true, message: 'Please input sender email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sender Locker"
            name="sender_locker"
            rules={[{ required: true, message: 'Please select!' }]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={locker}
              onChange={handleSenderChange}
            />
          </Form.Item>

          <Form.Item
            label="Sender Cabinet"
            name="sender_cabinet"
            rules={[{ required: true, message: 'Please select!' }]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={sendCabinet}
            />
          </Form.Item>

          <Form.Item
            label="Receiver Name"
            name="receiver_name"
            rules={[{ required: true, message: 'Please input sender email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Receiver Email"
            name="receiver_email"
            rules={[{ required: true, message: 'Please input receiver email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Pick up Locker"
            name="pickup_locker"
            rules={[{ required: true, message: 'Please select!' }]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={locker}
              onChange={handlePickupChange}
            />
          </Form.Item>

          <Form.Item
            label="Pick up Cabinet"
            name="pickup_cabinet"
            rules={[{ required: true, message: 'Please select!' }]}
          >
            <Select
              style={{
                width: 120,
              }}
              options={pickupCabinet}
            />
          </Form.Item>

          <Form.Item
            label="Length"
            name="length"
            rules={[{ required: true, message: 'Please input length of item!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Width"
            name="width"
            rules={[{ required: true, message: 'Please input width of item!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Height"
            name="height"
            rules={[{ required: true, message: 'Please input height of item!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mass"
            name="mass"
            rules={[{ required: true, message: 'Please input mass of item!' }]}
          >
            <Input />
          </Form.Item>

          <div className='submit'>
            <Button type="primary" className='back-btn' onClick={navigateBack}>
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        title=""
        open={open}
        onCancel={hideModal}
        footer={null}
        centered={true}
      >
        Code to open locker is {code}
      </Modal>
    </>
  )
}

export default SendParcel