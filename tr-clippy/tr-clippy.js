import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@3/index.js'
import 'https://cdn.jsdelivr.net/gh/treeder/material@0/snackbar/snackbar.js'
import 'https://cdn.jsdelivr.net/gh/treeder/material@0/iconbutton/icon-button.js'

export class Clippy extends LitElement {

    static get styles() {
        return css`
        mwc-icon-button {
            --mdc-icon-size: 14px;
            --mdc-icon-button-size: 22px;
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
            sb.labelText = "Copied to clipboard"
            sb.show()
        } catch (e) {
            let sb = this.shadowRoot.getElementById("snackbar")
            sb.labelText = `ERROR: ${e}`
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
