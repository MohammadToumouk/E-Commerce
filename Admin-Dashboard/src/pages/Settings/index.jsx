import "./Settings.css"

import TitleHeadings from '@/components/TitleHeading'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'

const Settings = () => {
  return (
    <div className='settings-container'>
      <div className='settings-content'>
        <div className='settings-header'>
          <TitleHeadings title='Settings' subtitle='Manage User and Store' />
          <Button 
            variant="destructive" 
            className="deleteSettings-button" 
            size="sm" 
            onClick={()=>{}}
          >
            <TrashIcon className="mr-2" size={16} /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
