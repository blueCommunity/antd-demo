import React from 'react';
import { Tabs, Space, Table, Image, Input, Button } from 'antd';
import { useState } from 'react';
import axios from 'axios';

function AnotherPage() {

  const [data, setData] = useState([]);


const columns = [
  {
    title: 'title',
    dataIndex: 'song_name',
    key: 'title',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'artist',
    dataIndex: 'artist',
    key: 'artist',
  },
  {
    title: 'year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button>Remove</Button>
      </Space>
    ),
  },
  {
    title: 'img',
    key: 'img',
    render: (url) => <Image src={url} width={50} />
  }
];

  function handleTabClick(key) {
    if (key === 2) {
      axios.get('https://suaomhnut5.execute-api.us-east-1.amazonaws.com/dev/test1')
      .then(response => {
        let items = response.data.body.items
        let itemsCopy = items.map((item,index) => {
          return {...item,key:item.song_name}
        })
        console.log(itemsCopy)
        setData(itemsCopy)
      })
      .catch(error => console.error(error));
    }
  }

  return (
    <Tabs onTabClick={handleTabClick}
      defaultActiveKey="2"
      centered
      items={[{
        label: `User`,
        key: 1,
        children: (<div style={{ textAlign: 'center' }}>
          <h3>jian</h3>
        </div>),
      },
      {
        label: `subscription`,
        key: 2,
        children: (<div style={{ textAlign: 'center', width: '95%', margin: '0 auto' }}>
        <Table columns={columns} dataSource={data} />
      </div>),
      },
      {
        label: `query`,
        key: 3,
        children: <QueryArea />,
      }]
      }
    />
  );
}



function QueryArea() {

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  function handleClick_Query() {
     alert('No result is retrieved. Please query again');
    // todo
}
  return (
    <div style={{ textAlign: 'center', width: '95%', margin: '0 auto' }}>
    <Space size="middle" >
      <Input value={title}
        placeholder="title"
        onChange={(event) => setTitle(event.target.value)} />
      <Input value={artist}
        placeholder="artist"
        onChange={(event) => setArtist(event.target.value)} />
      <Input value={year}
        placeholder="year"
        onChange={(event) => setYear(event.target.value)} />

      <Button onClick={handleClick_Query} >Query</Button>
    </Space>
    </div>
  )
}
export default AnotherPage;