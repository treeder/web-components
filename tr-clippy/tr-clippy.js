import { html, css, LitElement } from 'lit'
import 'material/snackbar/snackbar.js'
import 'material/iconbutton/icon-button.js'
import 'material/icon/icon.js'

export class Clippy extends LitElement {

    static get styles() {
        return css`
        md-icon-button {
            --md-icon-button-icon-size: 16px; 
            --md-icon-button-container-width: 24px; 
            --md-icon-button-container-height: 24px;
        }
        `;
    }

    static get properties() {
        return {
            value: { type: String },
        }
    }

    constructor() {
        super();
        this.value = '';
    }

    async copy() {
        try {
            navigator.clipboard.writeText(this.value);
            let sb = this.shadowRoot.getElementById("snackbar")
            sb.message = "Copied to clipboard"
            sb.show()
        } catch (e) {
            let sb = this.shadowRoot.getElementById("snackbar")
            sb.message = `ERROR: ${e}`
            sb.show()
        }
    }

    render() {
        return html`
        <md-icon-button @click=${this.copy}><md-icon>content_copy</md-icon></md-icon-button>
        <md-snackbar id="snackbar" message="..."></md-snackbar>
        `;
    }

}

customElements.define('tr-clippy', Clippy);
