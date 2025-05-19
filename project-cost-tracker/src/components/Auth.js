import React from 'react';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Auth({ user, setUser }) {
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e) {
      alert('Login failed');
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      {user ? (
        <>
          <p style={{ marginBottom: '8px' }}>Hello, {user.displayName}</p>
          <button
            style={{
              backgroundColor: '#e53e3e', // red
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          style={{
            backgroundColor: '#3182ce', // blue
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={signIn}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
