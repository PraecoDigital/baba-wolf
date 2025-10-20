import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50 
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#1f2937' 
              }}>
                Black Sheep Barbershop
              </h1>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem' 
            }}>
              <a href="#services" style={{ 
                color: '#6b7280', 
                textDecoration: 'none' 
              }}>Services</a>
              <a href="#contact" style={{ 
                color: '#6b7280', 
                textDecoration: 'none' 
              }}>Contact</a>
              <a href="#booking" style={{ 
                backgroundColor: '#d97706', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.375rem', 
                textDecoration: 'none' 
              }}>Book Now</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main style={{ padding: '5rem 0' }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '1.5rem' 
          }}>
            Welcome to Black Sheep Barbershop
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            marginBottom: '2rem', 
            maxWidth: '48rem', 
            margin: '0 auto 2rem' 
          }}>
            Where tradition meets modern style. Experience the finest in men's grooming with our professional barbers and premium services.
          </p>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <a href="#booking" style={{ 
              backgroundColor: '#d97706', 
              color: 'white', 
              padding: '1rem 2rem', 
              borderRadius: '0.375rem', 
              textDecoration: 'none',
              fontSize: '1.125rem',
              display: 'inline-block'
            }}>
              Book Your Appointment
            </a>
            <a href="#services" style={{ 
              border: '2px solid #d97706', 
              color: '#d97706', 
              padding: '1rem 2rem', 
              borderRadius: '0.375rem', 
              textDecoration: 'none',
              fontSize: '1.125rem',
              display: 'inline-block'
            }}>
              View Services
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
