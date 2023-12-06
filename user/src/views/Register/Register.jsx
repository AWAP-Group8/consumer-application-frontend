import { Button, Form, Input, message } from 'antd'
import { NavLink, useNavigate } from "react-router-dom"
import './Register.scss'
import axios from '../../axios'

function Register() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values) => {
    const data = await axios.post('/user/register', values)
    const { success, msg } = data
    if (success) {
      messageApi.open({
        type: 'success',
        content: msg
      })
      setTimeout(() => navigate('/'), 1500)
    } else {
      messageApi.open({
        type: 'error',
        content: msg
      })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <>
      {contextHolder}
      <div className='container'>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Repassword"
            name="repassword"
            rules={[{ required: true, message: 'Please input your password again!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <div className='right-side'>
            <NavLink
              to="/"
            >
              &laquo; Back
            </NavLink>
          </div>

          <div className='reg-btn'>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register
