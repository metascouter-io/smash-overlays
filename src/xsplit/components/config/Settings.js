import React, { Component } from 'react';

import './Settings.scss';
import { Input } from '../../../shared/components/Input';
import { Checkbox } from '../../../shared/components/Checkbox';

class Settings extends Component {
  render() {
    const { config, saveConfig, handleInputChange } = this.props;

    return (
      <div className="settings">
        <Input label="User" name="user" value={config.user} type="string" placeholder="Username" handleChange={handleInputChange} />
        <Checkbox label="Pull Players" name="active_resources" checked={config.active_resources} handleChange={handleInputChange} />
        <Input label="Player 1" name="player_1_name" value={config.player_1_name} type="string" placeholder="Player 1 Name" handleChange={handleInputChange} disabled={config.active_resources} />
        <Input label="Player 2" name="player_2_name" value={config.player_2_name} type="string" placeholder="Player 2 Name" handleChange={handleInputChange} disabled={config.active_resources} />
        <Checkbox label="Transparent BG" name="transparent_bg" checked={config.transparent_bg} handleChange={handleInputChange} />
        <button className="submitButton" onClick={saveConfig}>Save</button>
      </div>
    );
  }
}

export default Settings;