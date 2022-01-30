import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm';
import 'https://cdn.jsdelivr.net/npm/@material/mwc-snackbar@0/+esm';

export class Clippy extends LitElement {

    static get styles() {
        return css`
        a { color: rgb(13, 169, 239) }
        mwc-icon {
            --mdc-icon-size: 16px;
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
        HELLO!!!
        <mwc-icon @click='${this.copy}'>content_copy</mwc-icon>
        <mwc-snackbar id="snackbar" labelText="..."></mwc-snackbar>
        `;
    }

}

customElements.define('tr-clippy', Clippy);
