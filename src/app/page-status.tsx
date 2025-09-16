export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <img 
          src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
          alt="B4U Esports"
          style={{ width: '120px', height: '120px', marginBottom: '2rem', borderRadius: '12px' }}
        />
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>B4U Esports Marketplace</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
          Pi Network Gaming Currency Marketplace
        </p>
        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <strong>🔧 System Status:</strong> Next.js compilation in progress...
          <br />
          <strong>📧 Email System:</strong> Ready with professional templates
          <br />
          <strong>🔐 Admin Panel:</strong> Real-time notifications enabled
        </div>
        <div style={{ fontSize: '0.9rem', opacity: '0.7' }}>
          <p>📧 Contact: info@b4uesports.com | 📱 +97517875099</p>
          <p>
            <a href="https://www.facebook.com/b4uesports" style={{ color: '#fbbf24', margin: '0 0.5rem' }}>Facebook</a>
            <a href="https://youtube.com/@b4uesports" style={{ color: '#fbbf24', margin: '0 0.5rem' }}>YouTube</a>
            <a href="https://www.instagram.com/b4uesports" style={{ color: '#fbbf24', margin: '0 0.5rem' }}>Instagram</a>
          </p>
        </div>
      </div>
    </div>
  )
}