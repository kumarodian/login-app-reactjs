import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Welcome, <span id="userName">{user.name}!</span><br /><br />
      <input className="btn btn-warning" type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
