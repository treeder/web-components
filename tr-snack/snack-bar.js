import { html, css, LitElement } from 'lit'

export function snack(message) {
    let snack = document.createElement('snack-bar')
    // const x = document.getElementById("snackbar")
    snack.message = message
    // snack.className = "show"
    // snack.show()
    document.body.appendChild(snack)
    setTimeout(function () { snack.close() }, 5000)
}

class SnackBar extends LitElement {
    static styles = css`
        #snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: var(--md-sys-color-inverse-surface, #333);
  color: var(--md-sys-color-inverse-on-surface, white);
  text-align: center;
  border-radius: 4px;
  padding: 12px;
  position: fixed;
  z-index: 1000;
  left: 50%;
  bottom: 30px;
  /* font-size: 17px; */
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
    `

    static properties = {
        message: { type: String }
    }

    constructor() {
        super()
        this.message = ""
    }

    render() {
        return html`
            <div id="snackbar" class="show">${this.message}</div>
        `
    }

    show() {
        var x = this.renderRoot.getElementById("snackbar")
        x.className = "show"
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000)
    }

    close() {
        var x = this.renderRoot.getElementById("snackbar")
        x.className = x.className.replace("show", "")
    }
}

customElements.define('snack-bar', SnackBar)
