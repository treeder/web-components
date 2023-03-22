import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'
import 'https://cdn.jsdelivr.net/npm/@material/mwc-circular-progress@0/+esm'
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"

export class MarkedDown extends LitElement {

    static styles = [
        css`
        p {
              margin-block-start: 0;
        }
        `]

    static properties = {
        value: { type: String }, // value for QR code

        fetching: { type: Boolean },
        error: { type: Object },
    }


    constructor() {
        super();
        this.value = ''
        this.fetching = false
        this.error = null
    }

    async connectedCallback() {
        super.connectedCallback()

    }

    render() {
        if (this.error) {
            return html`<div class="error">${this.error}</div>`
        }
        if (this.fetching) {
            return html`<mwc-circular-progress indeterminate></mwc-circular-progress>`
        }
        return html`
        
        <div id="content"></div>
            <div id="content2">
                <slot></slot>
            </div>
        `
    }

    firstUpdated() {
        // console.log('markedDown.firstUpdated')
        super.firstUpdated()
        let body = this.shadowRoot.querySelector('slot')
        // console.log("BOD2:", body.textContent)
        const childNodes = body.assignedNodes({ flatten: true })
        // ... do something with childNodes ...
        let allText = childNodes.map((node) => {
            return node.textContent ? node.textContent : ''
        }).join('')
        allText = allText.trim()
        // console.log("BOD3:", allText)
        let m = marked.parse(allText)
        // console.log("M:", m)
        let d = document.createElement("div")
        d.innerHTML = m
        // console.log("D:", d)
        // body.assign(d)

        this.renderRoot.querySelector("#content2").style.display = 'none'
        this.renderRoot.querySelector("#content").append(d)

    }

}

customElements.define('marked-down', MarkedDown)
