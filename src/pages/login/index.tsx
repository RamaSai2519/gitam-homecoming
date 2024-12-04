import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/useAdmin';
import { BASE_URL } from '../../utils/axiosHelper';
import { Button, Form, Input, message } from 'antd';

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
    const [loading, setLoading] = useState(false);
    const { setAdmin } = useAdmin();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);
        const { phoneNumber, password } = values;
        try {
            const response = await axios.post(`${BASE_URL}/actions/admin_auth`, {
                phoneNumber, password, action: 'login'
            });
            console.log("🚀 ~ onFinish ~ response:", response)
            const { access_token, refresh_token, user } = response.data.output_details;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setAdmin(user);
            setIsLoggedIn(true);
            navigate('/');
            localStorage.setItem('isLoggedIn', 'true');
        } catch (error) {
            console.error('Login failed', error);
            message.error('Login failed, Please recheck your credentials. If the problem persists, please contact your IT Administrator.');
        }
        setLoading(false);
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="bg-lightBlack flex flex-col justify-center p-10 rounded-3xl">
                <h1 className='text-3xl m-5 mt-0'>Login to access dashboard</h1>
                <Form
                    className='h-full'
                    name="admin_login"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">Sign In</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
