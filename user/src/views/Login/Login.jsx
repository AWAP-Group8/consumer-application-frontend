import { Button, Form, Input, message } from 'antd'
import { NavLink, useNavigate } from "react-router-dom"
import './Login.scss'
import axios from '../../axios'
import logoImg from '../../images/logo.png'

function Login() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = async (values) => {
        const data = await axios.get('/user/login', { params: values })
        // const { success, msg } = data
        const { success, msg } = data

        if (success) {
            messageApi.open({
                type: 'success',
                content: msg
            })
            const token = data.data.token
            localStorage.setItem('token', token)
            navigate('/homepage')
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
            <div className='navbar'>
                <div className="nav-left">
                    <div className="logo" onClick={() => navigate('/homepage')}>
                        <img src={logoImg} />
                        <div className='gogoship'><span className='gogo'>GoGo</span>Ship</div>
                    </div>
                </div>
            </div>
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

                    <div className='right-side'>
                        <NavLink
                            to="/register"
                        >
                            Create an account
                        </NavLink>
                    </div>


                    <div className='login-btn'>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login
