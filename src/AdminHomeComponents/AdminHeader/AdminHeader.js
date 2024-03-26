import { Badge, Space } from "antd";

function AdminHeader() {
    return (
        <div className="AdminHeader">
            <img src="side-logo.png" alt="Logo" />
            Servicita
            <div className="icons-container">
                <Space>
                    <Badge count={10} dot>
                        <img src="notif.png" alt="Notification" style={{ width: '100%', height: '100%' }} />
                    </Badge>
                    <Badge count={10} dot>
                        <img src="msg.png" alt="Message" style={{ width: '100%', height: '100%' }} />
                    </Badge>
                    <Badge>
                        <img src="profile.png" alt="Profile" style={{ width: '55px', marginLeft: '5px', marginRight: '30px' }} />
                    </Badge>
                </Space>
            </div>
        </div>
    );
}

export default AdminHeader;
