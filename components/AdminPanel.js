function AdminPanel({ isOpen, onClose, onAddGame, onEditGame, onDeleteGame, editingGame }) {
  const [mode, setMode] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  const handleGameSubmit = async (gameData) => {
    if (editingGame) {
      await onEditGame(gameData);
    } else {
      await onAddGame(gameData);
    }
  };

  const handleClose = () => {
    onClose();
    setMode(null);
    setIsAuthenticated(false);
  };

  const handleBack = () => {
    setMode(null);
  };

  if (!isOpen) return null;

  // Initial mode selection screen
  if (!mode) {
    return (
      <div className="admin-panel">
        <div className="admin-header">
          <button className="back-button" onClick={handleClose}>
            <i className="ri-arrow-left-line"></i> Back to Games
          </button>
          <h2>Admin Panel</h2>
        </div>
        <div className="admin-content">
          <div className="admin-buttons">
            <button className="button primary" onClick={() => setMode('add')}>
              <i className="ri-add-circle-line"></i> Add Games
            </button>
            <button className="button danger" onClick={() => setMode('remove')}>
              <i className="ri-delete-bin-line"></i> Remove Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main admin interface
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <button className="back-button" onClick={handleBack}>
          <i className="ri-arrow-left-line"></i> Back to Menu
        </button>
        <h2>{mode === 'add' ? 'Add New Game' : 'Remove Games'}</h2>
      </div>
      <div className="admin-content">
        {mode === 'add' ? (
          <GameForm
            game={editingGame}
            onSubmit={handleGameSubmit}
            onCancel={handleClose}
          />
        ) : (
          <GameList onDelete={onDeleteGame} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

function GameList({ onDelete, onClose }) {
  const games = React.useSyncExternalStore(
    room.collection('game').subscribe,
    () => room.collection('game').getList() || []
  );

  return (
    <div className="game-list">
      {games.map(game => (
        <div key={game.id} className="game-list-item">
          <span>{game.title}</span>
          <button 
            className="button danger" 
            onClick={() => onDelete(game.id)}
          >
            <i className="ri-delete-bin-line"></i> Delete
          </button>
        </div>
      ))}
      <div className="form-buttons">
        <button className="button secondary" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}