import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import CostManager from './components/CostManager';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div style={{ maxWidth: '768px', margin: '1rem auto', padding: '0 1rem' }}>
      <Auth user={user} setUser={setUser} />
      {user && <CostManager user={user} />}
    </div>
  );
}

export default App;
