const room = new WebsimSocket();
const { useState, useEffect, useRef } = React;

function App() {
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [editingGame, setEditingGame] = React.useState(null);
  const [theme, setTheme] = React.useState('normal');
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const games = React.useSyncExternalStore(
    room.collection('game').subscribe,
    () => room.collection('game').getList() || []
  );

  // Apply theme to body
  React.useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleAdminClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setIsAdminOpen(true);
    setIsAdmin(true);
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
  };

  const handleAddGame = async (gameData) => {
    try {
      await room.collection('game').create(gameData);
      setIsAdminOpen(false);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const handleEditGame = async (gameData) => {
    try {
      await room.collection('game').update(gameData.id, gameData);
      setIsAdminOpen(false);
      setEditingGame(null);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await room.collection('game').delete(gameId);
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  // Theme decorations components
  const ThemeDecorations = () => {
    switch (theme) {
      case 'christmas':
        return (
          <>
            <div className="christmas-lights"></div>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="theme-decoration"
                style={{
                  left: `${Math.random() * window.innerWidth}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              >
                {['❄️', '🎄', '🎅', '🎁', '⛄'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </>
        );
      case 'halloween':
        return (
          <>
            <div className="halloween-bats">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bat"
                  style={{
                    left: `${Math.random() * window.innerWidth}px`,
                    top: '-50px',
                    animationDelay: `${i * 2}s`
                  }}
                >
                  🦇
                </div>
              ))}
            </div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="ghost"
                style={{
                  left: `${Math.random() * window.innerWidth}px`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {['👻', '🎃', '🕷️', '🕸️', '💀'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </>
        );
      case 'valentines':
        return (
          <div className="floating-hearts">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 10 + 20}px`,
                  '--direction': Math.random() > 0.5 ? 1 : -1
                }}
              >
                {['❤️', '💖', '💝', '💕', '💗', '💘', '💓'][Math.floor(Math.random() * 7)]}
              </div>
            ))}
          </div>
        );
      case 'neon':
        return (
          <div className="neon-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="neon-line"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 5}s`,
                  height: `${Math.random() * 150 + 50}px`
                }}
              />
            ))}
          </div>
        );
      case 'cyberpunk':
        return (
          <div className="cyberpunk-glitch">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className="glitch-text"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {['エラー', 'システム', 'データ', 'ハック'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        );
      case 'retro':
        return (
          <div className="retro-pixels">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="pixel"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <ThemeDecorations />
      <Header 
        onAdminClick={handleAdminClick} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      <div className="games-grid">
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            isAdmin={isAdmin}
            onEdit={(game) => {
              setEditingGame(game);
              setIsAdminOpen(true);
            }}
            onDelete={handleDeleteGame}
          />
        ))}
      </div>
      {showPasswordModal && (
        <PasswordModal
          onSuccess={handlePasswordSuccess}
          onCancel={handlePasswordCancel}
        />
      )}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          setIsAdmin(false);
          setEditingGame(null);
        }}
        onAddGame={handleAddGame}
        onEditGame={handleEditGame}
        onDeleteGame={handleDeleteGame}
        editingGame={editingGame}
      />
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  );
}

function SettingsPanel({ isOpen, onClose, theme, onThemeChange }) {
  if (!isOpen) return null;

  const themes = {
    casual: [
      { id: 'normal', name: 'Default', icon: 'home' },
      { id: 'neon', name: 'Neon', icon: 'flashlight' },
      { id: 'cyberpunk', name: 'Cyberpunk', icon: 'cpu' },
      { id: 'retro', name: 'Retro', icon: 'game-line' },
      { id: 'minimal', name: 'Minimal', icon: 'contrast-line' },
    ],
    holiday: [
      { id: 'christmas', name: 'Christmas', icon: 'gift' },
      { id: 'halloween', name: 'Halloween', icon: 'ghost' },
      { id: 'valentines', name: 'Valentine\'s', icon: 'heart' },
    ]
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="settings-panel">
        <div className="settings-header">
          <h2><i className="ri-settings-3-line"></i> Settings</h2>
          <button className="close-button" onClick={onClose}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="settings-content">
          <div className="settings-section">
            <h3>Casual Themes</h3>
            <div className="theme-grid">
              {themes.casual.map(t => (
                <button
                  key={t.id}
                  className={`theme-option ${theme === t.id ? 'active' : ''}`}
                  onClick={() => onThemeChange(t.id)}
                >
                  <i className={`ri-${t.icon}-line theme-icon`}></i>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="settings-section">
            <h3>Holiday Themes</h3>
            <div className="theme-grid">
              {themes.holiday.map(t => (
                <button
                  key={t.id}
                  className={`theme-option ${theme === t.id ? 'active' : ''}`}
                  onClick={() => onThemeChange(t.id)}
                >
                  <i className={`ri-${t.icon}-line theme-icon`}></i>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PasswordModal({ onSuccess, onCancel }) {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '45674567') {
      onSuccess();
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onCancel} />
      <div className="password-modal">
        <h2>Enter Admin Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-buttons">
            <button
              type="button"
              className="button secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="button primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);