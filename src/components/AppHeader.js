import logo from '../assets/images/paragon.png';
import Navigator from './Navigator'
const AppHeader = () => {
    return (
        <header>
         <div className='left'>
             <img src={logo} alt='logo' />
        </div>
         <div className='left'>
            <h2>My React App</h2>
        </div>
        <div className='right'>   
             <Navigator />
        </div>
        </header>)
}

 export default AppHeader;