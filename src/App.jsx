import React from 'react';

function App() {
  console.log('App component is rendering...');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'black', fontSize: '2rem', textAlign: 'center' }}>
        Black Sheep Barbershop - Testing
      </h1>
      <p style={{ color: 'black', textAlign: 'center' }}>
        If you can see this, React is working!
      </p>
    </div>
  );
}

export default App;
