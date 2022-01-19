import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'

export class Rick extends LitElement {

    static styles = css``

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
        return html`<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
}

customElements.define('tr-rick', Rick);
