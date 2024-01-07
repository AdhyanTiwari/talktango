import { useSelector } from 'react-redux';
import './App.css';
import CreateGroup from './Components/CreateGroup';
import Login from './Components/Login';
import Maincontainer from './Components/Maincontainer';
import Users from './Components/Users';
import UsersGroups from './Components/UsersGroups';
import Welcome from './Components/Welcome';
import Workarea from './Components/Workarea';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';

function App() {
  const LightTheme = useSelector((state) => state.themeKey);
  return (
    <div className={"App" + ((LightTheme) ? "" : " dark-bg")}>
      {/* <Login/> */}
      {/* <Workarea /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route exact path='/app' element={<Workarea />} >
          <Route path='welcome/:id' element={<Welcome />} ></Route>
          <Route path='chat/:id' element={<Maincontainer />} ></Route>
          <Route path='users/:id' element={<Users />} ></Route>
          <Route path='create-groups/:id' element={<CreateGroup />} ></Route>
          <Route path='groups/:id' element={<UsersGroups />} ></Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
