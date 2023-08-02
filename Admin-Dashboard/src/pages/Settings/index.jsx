import Sidebar from "@/components/Sidebar"
import "./Settings.css"

import TitleHeadings from '@/components/TitleHeading'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import SettingsProfilePage from "./SettingsTabs/Profile/ProfilePage"
import Navbar from "./SettingsTabs/SettingsTabComponents/SettingsTabNavbar"
import { Route, Routes } from "react-router-dom"
import NotificationsPage from "./SettingsTabs/Notifications/NotificationsPage"
import ApperancePage from "./SettingsTabs/Apperance/ApperancePage"
import DisplayPage from "./SettingsTabs/Display/DisplayPage"

const Settings = ({user}) => {
  return (
    <>
    <div className='settings-container'>
    <Sidebar user={user}/>
      <div className='settings-content'>
        <div className='settings-header'>
          <TitleHeadings title='Settings' subtitle='' />
          <Button 
            variant="destructive" 
            className="deleteSettings-button" 
            size="sm" 
            onClick={()=>{}}
          > 
          <TrashIcon className="mr-2" size={16} /> Delete
          </Button>
        </div>
        <Navbar />
          <div className="container">
          <Routes>
            <Route path="/profile" element={<SettingsProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/apperance" element={<ApperancePage />} />
            <Route path="/display" element={<DisplayPage />} />
            
            
            {/* <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} /> */}
          </Routes>
          </div>
      </div>
    </div>
    <div>
    </div>
    
    </>
  )
}

export default Settings
