import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu() {

    const navigate = useNavigate()

    return <div className="SideMenu">
        <Menu
            className="SideMenuVertical"
            mode="inline"
            onClick={(item)=>{
                //item.key
                navigate(item.key);
            }}
                items={[
                  { label: "Dashboard", key: "/dashboard" },
                  {
                    label: "User Management", key: "/userManagement", children: [
                      { label: "View Service Seeker List", key: "/viewSeekerList" },
                      { label: "View Service Provider List", key: "/viewProviderList" }
                    ]
                  },
                  {
                    label: "Service Provider Performance", key: "/serviceProviderPerformance", children: [
                      { label: "Performance Monitoring", key: "/performanceMonitoring" },
                      { label: "Review Complaints", key: "/reviewComplaints" }
                    ]
                  },
                  {
                    label: "Content Moderation", key: "contentModeration", children: [
                      { label: "New Service Listing", key: "newServiceListing" },
                      { label: "Ratings and Reviews", key: "ratingsAndReviews" }
                    ]
                  }
                ]}></Menu>

    </div>
}
export default SideMenu;