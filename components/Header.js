function Header({ onAdminClick, onSettingsClick }) {
  return (
    <div className="header">
      <h1><i className="ri-gamepad-line"></i> Games Portal</h1>
      <div className="header-buttons">
        <button className="settings-button" onClick={onSettingsClick}>
          <i className="ri-settings-3-line"></i> Settings
        </button>
        <button className="admin-button" onClick={onAdminClick}>
          <i className="ri-admin-line"></i> Admin
        </button>
      </div>
    </div>
  );
}