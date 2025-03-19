import { html, css, LitElement } from 'lit'

export class Shorten extends LitElement {

    static get styles() {
        return css`a { color: rgb(13, 169, 239) }`;
    }

    static get properties() {
        return {
            value: { type: String },
            prefixAmount: { type: Number },
            suffixAmount: { type: Number },
        }
    }

    constructor() {
        super();
        this.value = '';
        this.prefixAmount = 4;
        this.suffixAmount = 4;
    }

    render() {
        let s = this.value;
        if (this.value.length > this.prefixAmount) {
            s = this.truncate(this.value, this.prefixAmount)
            if (this.suffixAmount > 0) {
                let remainder = this.value.substr(this.prefixAmount, this.value.length - 1)
                if (remainder.length > this.suffixAmount) {
                    remainder = remainder.substr(remainder.length - this.suffixAmount)
                }
                s += remainder;
            }
        }
        return html`${s}`;
    }

    truncate(str, n) {
        return (str.length > n) ? str.substr(0, n) + '...' : str;
    }

}

customElements.define('tr-shorten', Shorten)
