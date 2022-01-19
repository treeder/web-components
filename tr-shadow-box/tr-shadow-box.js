import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm' // 'https://cdn.skypack.dev/lit'

export class ShadowBox extends LitElement {

    static styles = css`
        a{
            color: #0da9ef;
        }
        .header {
            text-align: center;
        }
        .raised-box { 
            padding: 10px;
            border: 1px solid #77aaff;
            border-radius: 6px;
            box-shadow:  0 3px 10px #77aaff55; // rgb(0 0 0 / 0.2);
        }
        `

    static get properties() {
        return {}
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        //- can let user apply styles like this: https://lit.dev/docs/components/styles/#dynamic-classes-and-styles
        return html`<div class="raised-box"><slot></slot></div>`
    }
}

customElements.define('tr-shadow-box', ShadowBox);
