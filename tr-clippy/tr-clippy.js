import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'
import 'https://cdn.jsdelivr.net/npm/@material/mwc-snackbar@0/+esm'
import 'https://cdn.jsdelivr.net/npm/@material/mwc-icon-button@0/+esm'

export class Clippy extends LitElement {

    static get styles() {
        return css`
        mwc-icon-button {
            --mdc-icon-size: 14px;
            --mdc-icon-button-size: 22px;
            // these don't work, I think because it creates a cycle:
        //    --mdc-icon-size: var(--mdc-icon-size, 14px);
        //    --mdc-icon-button-size: var(--mdc-icon-button-size, 20px);
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
        <mwc-icon-button @click='${this.copy}' icon="content_copy"></mwc-icon-button>
        <mwc-snackbar id="snackbar" labelText="..."></mwc-snackbar>
        `;
    }

}

customElements.define('tr-clippy', Clippy);
