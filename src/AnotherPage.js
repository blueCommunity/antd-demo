import React from 'react';
import { Tabs, Space, Table, Image, Input, Button } from 'antd';
import { useState } from 'react';

function AnotherPage() {
  return (
    <Tabs
      defaultActiveKey="1"
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
        children: <SubscriptionArea />,
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

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
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
        <a>Remove</a>
      </Space>
    ),
  },
  {
    title: 'img',
    key: 'img',
    render: (url) => <Image src={url} width={50} />
  }
];
const data = [
  {
    title: '1',
    artist: 'John Brown',
    year: 32,
    url: 'https://example.com/avatar.jpg'
  },
  {
    title: '2',
    artist: 'aaa Brown',
    year: 12,
    url: 'https://example.com/avatar.jpg'
  },
];

function SubscriptionArea() {
  return (<div style={{ textAlign: 'center', width: '95%', margin: '0 auto' }}>
    <Table columns={columns} dataSource={data} />
  </div>
  )
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