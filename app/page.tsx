export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">VIRPUS</div>
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#library">Library</a></li>
          <li><a href="#trending">Trending</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
        </ul>
        <div className="nav-profile">R</div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Transform Reading into Viral Content</h1>
        <p>Baca. Bayangkan. Viralkan. AI-powered platform untuk Gen Z</p>
        <button className="cta-button">Mulai Sekarang →</button>
      </section>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">100K+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K+</div>
          <div className="stat-label">Videos Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1.2M</div>
          <div className="stat-label">Books Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5M+</div>
          <div className="stat-label">Total Views</div>
        </div>
      </div>

      {/* Featured Books */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">📚 Trending Books</h2>
          <a href="#" className="view-all">Lihat Semua →</a>
        </div>
        <div className="books-grid">
          <div className="book-card">
            <div className="book-cover">📖</div>
            <div className="book-info">
              <div className="book-title">Nusantara 2157</div>
              <div className="book-author">Ahmad Fuadi</div>
              <div className="book-stats">
                <div className="book-stat">
                  <span>🎬</span> 234 videos
                </div>
                <div className="book-stat">
                  <span>❤️</span> 1.2K
                </div>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="book-cover" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>📚</div>
            <div className="book-info">
              <div className="book-title">Hujan</div>
              <div className="book-author">Tere Liye</div>
              <div className="book-stats">
                <div className="book-stat">
                  <span>🎬</span> 189 videos
                </div>
                <div className="book-stat">
                  <span>❤️</span> 956
                </div>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="book-cover" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>📕</div>
            <div className="book-info">
              <div className="book-title">Bumi Manusia</div>
              <div className="book-author">Pramoedya A.T.</div>
              <div className="book-stats">
                <div className="book-stat">
                  <span>🎬</span> 312 videos
                </div>
                <div className="book-stat">
                  <span>❤️</span> 2.1K
                </div>
              </div>
            </div>
          </div>
          <div className="book-card">
            <div className="book-cover" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>📗</div>
            <div className="book-info">
              <div className="book-title">Laskar Pelangi</div>
              <div className="book-author">Andrea Hirata</div>
              <div className="book-stats">
                <div className="book-stat">
                  <span>🎬</span> 456 videos
                </div>
                <div className="book-stat">
                  <span>❤️</span> 3.4K
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Videos */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🔥 Viral Videos</h2>
          <a href="#" className="view-all">Lihat Semua →</a>
        </div>
        <div className="videos-grid">
          <div className="video-card">
            <div className="video-thumbnail">
              🎬
              <div className="play-button">▶</div>
            </div>
            <div className="video-info">
              <div className="video-title">Jakarta 2157: The Future</div>
              <div className="video-creator">
                <div className="creator-avatar">R</div>
                <div className="creator-name">Rina Mahasiswa</div>
              </div>
              <div className="video-stats">
                <span>👁️ 1.2M views</span>
                <span>❤️ 45K likes</span>
              </div>
            </div>
          </div>
          <div className="video-card">
            <div className="video-thumbnail" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
              🎨
              <div className="play-button">▶</div>
            </div>
            <div className="video-info">
              <div className="video-title">Minke&apos;s Journey Visualized</div>
              <div className="video-creator">
                <div className="creator-avatar">A</div>
                <div className="creator-name">Andi Creator</div>
              </div>
              <div className="video-stats">
                <span>👁️ 890K views</span>
                <span>❤️ 32K likes</span>
              </div>
            </div>
          </div>
          <div className="video-card">
            <div className="video-thumbnail" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
              ✨
              <div className="play-button">▶</div>
            </div>
            <div className="video-info">
              <div className="video-title">Laskar Pelangi Reimagined</div>
              <div className="video-creator">
                <div className="creator-avatar">D</div>
                <div className="creator-name">Dina Visualizer</div>
              </div>
              <div className="video-stats">
                <span>👁️ 2.1M views</span>
                <span>❤️ 67K likes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Interface Example */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">📖 Reading & Visualization Interface</h2>
        </div>
        <div className="reading-interface">
          <div className="reading-header">
            <div className="reading-title">Nusantara 2157 - Chapter 1</div>
            <div className="reading-actions">
              <button className="action-btn btn-secondary">🔖 Bookmark</button>
              <button className="action-btn btn-primary">🎨 Visualize</button>
            </div>
          </div>
          <div className="reading-content">
            <p style={{marginBottom: '20px'}}>
              Arya melangkah keluar dari stasiun MRT bawah tanah. Sinar matahari sore menyilaukan matanya yang sudah terbiasa dengan cahaya neon selama tujuh jam terakhir.
            </p>
            <p style={{marginBottom: '20px'}}>
              <span className="highlight">Di hadapannya, Bundaran HI telah berubah total. Hologram iklan raksasa mengambang di udara, berputar-putar seperti aurora buatan manusia. Skytrain melaju cepat di atas kepalanya, hampir tanpa suara.</span> Jakarta 2157 adalah kota yang tak pernah tidur, kota yang terus berevolusi setiap detik.
            </p>
            <p>
              Dia membuka visor AR-nya, dan dunia berubah menjadi overlay data. Setiap bangunan menampilkan informasi real-time, setiap orang yang lewat meninggalkan jejak digital...
            </p>
          </div>

          <div className="viz-panel">
            <div className="viz-title">🎨 Visualize Selected Scene</div>
            <div className="viz-input">
              <label className="input-label">Deskripsikan Imajinasi Anda:</label>
              <textarea className="input-field" rows={3} placeholder="Contoh: Arya adalah pemuda 20-an dengan jaket kulit hitam futuristik dan visor biru. Suasana malam dengan neon lights warna ungu dan biru. Style animasi cyberpunk realistis..." defaultValue="Arya pemuda 20-an, jaket kulit hitam futuristik, visor biru. Bundaran HI futuristik dengan hologram warna ungu-biru. Style cyberpunk seperti Blade Runner."></textarea>

              <label className="input-label">Pilih Style Animasi:</label>
              <div className="style-options">
                <div className="style-option active">
                  <div>🎭 Anime</div>
                </div>
                <div className="style-option">
                  <div>🎨 Flat Design</div>
                </div>
                <div className="style-option">
                  <div>🌟 3D Realistic</div>
                </div>
              </div>

              <label className="input-label">Durasi Video:</label>
              <input type="range" className="input-field" min="15" max="90" defaultValue="45" style={{padding: '5px'}} />
              <div style={{textAlign: 'center', color: '#667eea', fontWeight: 600}}>45 detik</div>

              <button className="generate-btn">🤖 Generate Video (2-3 menit)</button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="section dashboard">
        <div className="dashboard-header">
          <div className="user-info">
            <div className="user-avatar">R</div>
            <div className="user-details">
              <h2>Rina Mahasiswa</h2>
              <span className="user-badge">⭐ Virpus Creator</span>
            </div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="stat-icon">🎬</div>
            <div className="stat-value">24</div>
            <div className="stat-text">Videos Created</div>
          </div>
          <div className="dashboard-stat">
            <div className="stat-icon">👁️</div>
            <div className="stat-value">1.2M</div>
            <div className="stat-text">Total Views</div>
          </div>
          <div className="dashboard-stat">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">2,450</div>
            <div className="stat-text">Points</div>
          </div>
          <div className="dashboard-stat">
            <div className="stat-icon">📈</div>
            <div className="stat-value">#12</div>
            <div className="stat-text">Leaderboard</div>
          </div>
        </div>

        <div className="tabs">
          <div className="tab active">My Videos</div>
          <div className="tab">Saved Books</div>
          <div className="tab">Analytics</div>
          <div className="tab">Achievements</div>
        </div>

        <div className="my-videos-grid">
          <div className="my-video-card">
            <div className="my-video-thumbnail">🌃</div>
            <div className="my-video-info">
              <div className="my-video-title">Jakarta 2157: Cyberpunk City</div>
              <div className="my-video-stats">
                <span>👁️ 1.2M</span>
                <span>❤️ 45K</span>
                <span>💬 1.2K</span>
              </div>
            </div>
          </div>
          <div className="my-video-card">
            <div className="my-video-thumbnail" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>🎭</div>
            <div className="my-video-info">
              <div className="my-video-title">Minke Meets Annelies</div>
              <div className="my-video-stats">
                <span>👁️ 567K</span>
                <span>❤️ 23K</span>
                <span>💬 890</span>
              </div>
            </div>
          </div>
          <div className="my-video-card">
            <div className="my-video-thumbnail" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>✨</div>
            <div className="my-video-info">
              <div className="my-video-title">Belitong Dreams</div>
              <div className="my-video-stats">
                <span>👁️ 890K</span>
                <span>❤️ 34K</span>
                <span>💬 1.5K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>VIRPUS</h3>
          <p>Virtual Library for Viral Purpose</p>
          <p>Transforming Literacy into Viral Trend</p>
          <p style={{marginTop: '20px', fontSize: '12px'}}>
            Computer Science Festival (CSF) 2025<br />
            © 2025 Virpus. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
