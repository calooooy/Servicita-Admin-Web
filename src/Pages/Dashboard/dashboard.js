import React, { useState, useEffect } from 'react';
import '../../Admin.css';
import { Space, Table } from 'antd';
import { getTopPerforming } from '../../API/index'

function Dashboard() {
    return (
        <div style={{ width: '100%' }}>
            <h1 className='DashboardHeader'>Dashboard</h1>
            <hr className='Divider' style={{ width: '1185px' }} />
            <Space direction="horizontal">
                <DashboardCard title={"Service Seekers"} value={252}></DashboardCard>       {/* value to be changed depending on database */}
                <DashboardCard title={"Service Providers"} value={185}></DashboardCard>     {/* value to be changed depending on database */}
                <DashboardCard title={"Completed Service "} value={906}></DashboardCard>    {/* value to be changed depending on database */}
            </Space>
            <Space>
                <div className='TopPerforming'>
                    <TopPerforming />
                </div>

            </Space>

        </div>
    );
}

function DashboardCard({ title, value }) {
    return (
        <div className="square">
            <div className="cardTitle">{title}</div>
            <div className="value">{value}</div>
        </div>
    );
}


function TopPerforming() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => {
                setDataSource(data.users.slice(0, 8)); // Access the correct property path
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const renderName = (text, record) => (
        <span style={{ textAlign: 'left', fontSize: '20px' }}>{record.firstName} {record.lastName}</span>
    );

    const renderImage = (url) => (
        <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
            <img src={url} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );

    return (
        <div>
            <h1 className="topPerformingTable">Top Performing Service Providers</h1>
            <Table
                style={{ width: '100%' }}
                components={{
                    body: {
                        cell: ({ children }) => <td>{children}</td>
                    }
                }}
                size='small'
                columns={[
                    {
                        dataIndex: "id",
                        render: (text) => <span style={{
                            color: '#75B9D9',
                            fontSize: '32px',
                            textAlign: 'center', // Center align the text
                            display: 'flex', // Use flexbox to center vertically
                            justifyContent: 'center', // Center horizontally
                            alignItems: 'center' // Center vertically
                        }}>{text}</span>
                    },
                    {
                        dataIndex: "image",
                        render: renderImage,
                        width: '50px'
                    },
                    {
                        dataIndex: "firstName",
                        render: (text, record) => (
                            <span style={{ textAlign: 'left', fontSize: '20px' }}>{record.firstName} {record.lastName}</span>
                        )
                    }
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            />
        </div>
    );
}



export default Dashboard;
