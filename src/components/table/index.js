import React, { Component } from 'react'
import { Table, Tag } from 'antd';
export default class Index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: this.props.data
    }
  }
  
  render() {
    const columns = [
      {
        title: 'S/N',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, i) => <span>{i+1}</span>
      },
      {
        title: 'First Name',
        dataIndex: 'firstname',
        key: 'firstname',
        render: text => <p>{text}</p>,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastname',
        key: 'lastname',
        render: text => <p>{text}</p>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        render: age => (
          parseInt(age, 10) > 40 ? <p className ='text-success'>{age}</p> : <p className ='text-danger'>{age}</p>
        ),
      },
      {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
        render: birthday => <p style={{color: 'purple'}}>{birthday}</p>
      },
      {
        title: 'Hobbies',
        key: 'hobbies',
        dataIndex: 'hobbies',
        render: hobbies => (
          <span>
            {hobbies.map(hobby => {
              let color = hobby.length > 4 ? 'geekblue' : 'green';
              if (hobby.length > 7) {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={hobby}>
                  {hobby.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
    ];
    return (
      <div>
       <Table pagination= { {defaultPageSize: 5}} columns={columns} dataSource={this.state.data} />
      </div>
    )
  }
}

