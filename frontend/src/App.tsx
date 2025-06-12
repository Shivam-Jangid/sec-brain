import './App.css'
import { Button } from './components/Button'
import { PlusIcon, ShareIcon } from './components/StartIcons'

function App() {
  return (
    <>
    <div className='flex py-5 justify-between'>
    <div className='flex'>SideBar</div>
    <div>Main content</div>
    <div className='flex flex-col gap-3 mr-4 lg:flex-row lg:mr-10'>
      <Button variants='secondary' text='Share' size='sm' startIcon={
        <ShareIcon size='sm' />} onClick={()=>{console.log('onclick handler been called')}}></Button>
      <Button variants='primary' text='Add Content' startIcon={<PlusIcon size='sm' />} size='sm' onClick={()=>{console.log('onclick handler been called')}}></Button>
    
    </div>
</div>
    </>
  )
}

export default App

// startIcon={<ShareIcon size = "sm"/>}
