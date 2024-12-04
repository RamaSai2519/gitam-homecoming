import { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import Raxios from '../../utils/axiosHelper';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const renderFormItem = (name: string, placeholder: string, inputType: any = Input, rules: any[] = [{ required: true, message: `Please input your ${placeholder}!` }]) => (
        <Form.Item name={name} rules={rules}>
            {inputType === Select ? (
                <Select placeholder={`Select ${placeholder}`}>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="basic">Basic</Select.Option>
                </Select>
            ) : inputType === Input.Password ? (
                <Input.Password placeholder={placeholder} />
            ) : (
                <Input placeholder={placeholder} />
            )}
        </Form.Item>
    );

    const formItems = [
        { name: 'name', placeholder: 'Name' },
        { name: 'station', placeholder: 'Station' },
        { name: 'phoneNumber', placeholder: 'Phone Number' },
        { name: 'password', placeholder: 'Password', inputType: Input.Password },
        { name: 'access_level', placeholder: 'Access Level', inputType: Select }
    ];

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await Raxios.post('/actions/admin_auth', {
                action: 'register', ...values
            });
            message.success('Registration successful!');
            form.resetFields();
        } catch (error) {
            console.error('Registration failed', error);
            message.error('Registration failed, Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="bg-lightBlack flex flex-col justify-center p-10 rounded-3xl">
                <h1 className='text-3xl m-5 mt-0'>Create User</h1>
                <Form
                    form={form}
                    className='h-full'
                    name="admin_signup"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                >
                    {formItems.map(item => renderFormItem(item.name, item.placeholder, item.inputType))}
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">Sign Up</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;