export default class Menu {
  render() {
    return `
        <div class="start-menu">
            <div id="pic"></div>
            <div class="content">
                <h2 id="title">Guess country by a flag</h2>
                <div class="settings">
                    <h3 id="subtitle">Settings:</h3>
                    <div class="setting"><span class="setting-desc">Countries from:</span> <select name="" id="region">
                        <option value="all">the whole world</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </select></div>
                    <div class="setting"><span class="setting-desc">Number of questions:</span> <select name="" id="questions-number">
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select></div>
                    <button id="start-game" type="button">Play</button>
                </div>
            </div>
        </div>
        `;
  }
}
