import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm' // 'https://cdn.skypack.dev/lit'

export class RaisedBox extends LitElement {

    static styles = css`
        a{
            color: #0da9ef;
        }
        .header {
            text-align: center;
        }
        .raisedbox { 
            padding: 10px;
            border: 1px solid #77aaff;
            border-radius: 6px;
            box-shadow:  0 3px 10px #77aaff55; // rgb(0 0 0 / 0.2);
        }
        `

    static get properties() {
        return {
            // inputs:
            userID: { type: String },
            symbol: { type: String },

            // internal:
            signedIn: { type: Boolean },
            balance: { type: Object },
            fetching: { type: Boolean },
            error: { type: Object },
        }
    }

    constructor() {
        super();
        this.userID = '';
        this.symbol = '';

        this.balance = {};

        this.fetching = false;
        this.error = null;
        this.signedIn = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchData() {

    }

    render() {
        //- can let user apply styles like this: https://lit.dev/docs/components/styles/#dynamic-classes-and-styles

        return html`<div class="raisedbox"><slot></slot></div>`
    }
}

customElements.define('raised-box', RaisedBox);
