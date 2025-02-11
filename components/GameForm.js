function GameForm({ game, onSubmit, onCancel }) {
  const [title, setTitle] = React.useState(game?.title || '');
  const [description, setDescription] = React.useState(game?.description || '');
  const [url, setUrl] = React.useState(game?.url || '');
  const [category, setCategory] = React.useState(game?.category || 'action');
  const [playerCount, setPlayerCount] = React.useState(game?.playerCount || '1');
  const [difficulty, setDifficulty] = React.useState(game?.difficulty || 'medium');
  const [featured, setFeatured] = React.useState(game?.featured || false);
  const [thumbnail, setThumbnail] = React.useState(game?.thumbnail || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      id: game?.id, 
      title, 
      description, 
      url,
      category,
      playerCount,
      difficulty,
      featured,
      thumbnail
    });
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Game URL</label>
        <input 
          type="url" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Thumbnail URL</label>
        <input 
          type="url" 
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Optional thumbnail image URL"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="action">Action</option>
            <option value="puzzle">Puzzle</option>
            <option value="strategy">Strategy</option>
            <option value="arcade">Arcade</option>
            <option value="rpg">RPG</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="form-group">
          <label>Player Count</label>
          <select value={playerCount} onChange={(e) => setPlayerCount(e.target.value)}>
            <option value="1">Single Player</option>
            <option value="2">2 Players</option>
            <option value="3-4">3-4 Players</option>
            <option value="5+">5+ Players</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Game
          </label>
        </div>
      </div>
      <div className="form-buttons">
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="button primary">
          {game ? 'Update Game' : 'Add Game'}
        </button>
      </div>
    </form>
  );
}