import { html, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'
import QRious from 'https://cdn.jsdelivr.net/npm/qrious@4/+esm'

export class QrCode extends LitElement {
    static properties = {
        value: { type: String }, // value for QR code

        fetching: { type: Boolean },
        error: { type: Object },
    }

    constructor() {
        super()
        this.value = ''
        this.fetching = false
        this.error = null
    }

    async connectedCallback() {
        super.connectedCallback()
    }

    firstUpdated() {
        console.log('firstUpdated')
        super.firstUpdated()
        var canvas = this.renderRoot.querySelector('#qr')
        console.log("canvas:", canvas)
        console.log(this.value)
        // https://github.com/neocotic/qrious#readme
        var qr = new QRious({
            element: canvas,
            value: this.value,
            background: '#303030',// '#01368d',
            backgroundAlpha: 0.5,
            foreground: '#ffffff',
            size: 250,
        })
    }

    render() {
        if (this.error) {
            return html`<div class="error">${this.error}</div>`
        }
        return html`
            <canvas id="qr"></canvas>
        `
    }
}

customElements.define('tr-qr', QrCode)
