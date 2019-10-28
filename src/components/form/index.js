import React, {useState, useEffect} from 'react'
import './index.css'
import { Form, Icon, Input, Button, DatePicker, Card, Row, Col, Empty, Typography} from 'antd';
import Table from '../table';
import { addUser, getUser, updateUsers} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Index = ({form}) => {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users.users);
  const isLoading = useSelector (state => state.users.loading);
  const [users, setUsers] = useState(useSelector(state => state.users.users));
  const [tableLoading, setTableLoading] = useState(false)
  console.log('all users from top', allUsers)
  console.log('users from state', users)
  console.log('tableLoading from state', tableLoading)
  useEffect(() => {
    dispatch(getUser());
  }, []);

  

  const handleSubmit = e => {
    
    form.validateFields((err, values) => {
      if (!err) {
        const formValues = {
          firstname: values['firstname'],
          lastname: values['lastname'],
          age: values['age'],
          birthday: values['date-picker'].format('YYYY-MM-DD'),
          hobbies: values['hobbies'],
        }
        dispatch(addUser(formValues));
        console.log(allUsers)
        form.resetFields();
        e.preventDefault();
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <div className= 'container-fluid'>
    <Row gutter={16} className='mt-3'>
      <Col span={8}>
      <div className='center_form'>
        <Card style={{ minWidth: 300 }}> 
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('firstname', {
                rules: [{ required: true, message: 'Please input your firstname!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'deep-purple' }} />}
                  placeholder="Firstname"
                />,
              )}
            </Form.Item>
            <Form.Item>
      {getFieldDecorator('lastname', {
        rules: [{ required: true, message: 'Please input your lastname!' }],
      })(
        <Input
          prefix={<Icon type="user" style={{ color: 'purple' }} />}
          placeholder="Lastname"
        />,
      )}
    </Form.Item>
            <Form.Item>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: 'Please input your age!' }],
              })(
                <Input
                  prefix={<Icon type="smile" theme="twoTone"  twoToneColor="#13c1c1" />}
                  type="number"
                  placeholder="Age"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('date-picker', {
                rules: [{ required: true, message: 'Whats your date of birth!' }],
              })(
                <DatePicker style={{ width: '100%' }} placeholder="Birthday" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('hobbies', {
                rules: [{ required: true, message: 'What are your hobbies?' }],
              })(
                <Input.TextArea rows={4}
                  prefix={<Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />}
                  type="text"
                  placeholder="Hobbies separated by commas or space eg: Reading, singing"
                />,
              )}
            </Form.Item>
            <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Submit
      </Button>
    </Form.Item>
          </Form>
        </Card>
      </div>
      </Col>
      <Col span={16}>
      <div> {allUsers.length !== 0 ? (<Table loading= {isLoading} data = {allUsers} />) : (<Empty description={
      <span> <Typography.Text type='warning' > Please fill the form to see table values</Typography.Text></span>
      }/>) }</div>
      </Col>
    </Row>
  </div> 
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index);
export default WrappedNormalLoginForm;