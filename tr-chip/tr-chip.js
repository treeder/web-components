import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'

export class Chip extends LitElement {

    static get styles() {
        return css`
          .chip {
            color: #212121,
            display: inline-block;
            padding: 0 25px;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
            border-radius: 25px;
            background-color: #f1f1f1;
          }
          
          .chip img {
            float: left;
            margin: 0 10px 0 -25px;
            height: 30px;
            width: 30px;
            border-radius: 50%;
          }
          .chip a {
              text-decoration: none;
              color: inherited;
          }
          .chip a:hover {
              text-decoration: underline;
          }
        `
    }

    static get properties() {
        return {
            value: { type: String },
            icon: { type: String },
        }
    }

    constructor() {
        super()
        this.value = ''
        this.icon = 'https://www.w3schools.com/howto/img_avatar2.png'
    }

    render() {
        return html`
            <div class="chip">
                <img src="${this.icon}" alt="">
                ${this.value}
            </div>
        `
    }

}

customElements.define('tr-chip', Chip)
