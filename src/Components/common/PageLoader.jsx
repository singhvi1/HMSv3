import { useNavigate } from 'react-router-dom'
import Button from './ui/Button';

const PageLoader = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="text-3xl font-semibold">
        Loading
        <span className="text-gray-500 text-lg block mt-2">
          (or Go to Home)
        </span>
      </div>
      <Button className='p-4' onClick={() => navigate('/')}>Home</Button>
    </div>
  )
}

export default PageLoader
