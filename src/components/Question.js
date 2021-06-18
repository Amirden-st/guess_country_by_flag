export default class Question {
    constructor(flagUrl, options, btnText = "next") {
        this.flagUrl = flagUrl;
        this.options = options;
        this.btnText = btnText.toLowerCase();
    }

    render() {
        return `  
      <div id="question">
        <div class="flag" style="background-image: url(${this.flagUrl});"></div>
        <div class="options">
            <div class="option" id="option0">${this.options[0].name}</div>
            <div class="option" id="option1">${this.options[1].name}</div>
            <div class="option" id="option2">${this.options[2].name}</div>
            <div class="option" id="option3">${this.options[3].name}</div>
        </div>
        <div id="time">
          <div id="bar"></div>
        </div>
        
      </div>
      `;
    }
}
