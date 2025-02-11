function GameCard({ game, isAdmin, onEdit, onDelete }) {
  const handleCardClick = (e) => {
    // Don't open the game if clicking admin buttons
    if (e.target.closest('.game-actions')) return;
    window.open(game.url, '_blank');
  };

  return (
    <div 
      className={`game-card ${game.featured ? 'featured' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {game.thumbnail ? (
        <img 
          src={game.thumbnail} 
          className="game-thumbnail"
          alt={game.title}
        />
      ) : (
        <iframe 
          src={game.url} 
          className="game-iframe"
          title={game.title}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      )}
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">{game.description}</p>
        <div className="game-metadata">
          <span><i className="ri-gamepad-line"></i> {game.category}</span>
          <span><i className="ri-user-line"></i> {game.playerCount}</span>
          <span><i className="ri-sword-line"></i> {game.difficulty}</span>
        </div>
        {isAdmin && (
          <div className="game-actions">
            <button className="button secondary" onClick={() => onEdit(game)}>
              <i className="ri-edit-line"></i> Edit
            </button>
            <button className="button danger" onClick={() => onDelete(game.id)}>
              <i className="ri-delete-bin-line"></i> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}