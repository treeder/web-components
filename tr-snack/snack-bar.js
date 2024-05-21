import { html, css, LitElement } from 'lit'

export function snack(message, { duration = 3000 } = {}) {
    let snack = document.createElement('snack-bar')
    // const x = document.getElementById("snackbar")
    snack.message = message
    snack.duration = duration
    // snack.className = "show"
    document.body.appendChild(snack)
    // todo: set duration, but needs to update the fadein/fadeout timing too
    // snack.show()
    // can't just call show() because it may not be rendered yet
    // snack.className = "show"
    // snack.style.setProperty('-webkit-animation', 'fadein 0.5s, fadeout 0.5s 2.5s')
    // snack.style.setProperty('animation', 'fadein 0.5s, fadeout 0.5s 2.5s')
    snack.show()
    // setTimeout(function () { snack.close() }, duration)
}

class SnackBar extends LitElement {
    static styles = css`
        #snackbar {
  /* visibility: hidden; */
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
  /* visibility: visible; */
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
    `

    static properties = {
        message: { type: String },
        showing: { type: Boolean },
        duration: { type: Number },
    }

    constructor() {
        super()
        this.message = ""
        this.showing = false
        this.duration = 3000
    }

    render() {
        if (!this.showing) return ''
        let animStyle = `animation: fadein 0.5s, fadeout 0.5s ${this.duration}ms forwards;`
        return html`
            <div id="snackbar" class="show" style="${animStyle}">${this.message}</div>
        `
    }

    show() {
        this.showing = true
        // var x = this.renderRoot.getElementById("snackbar")
        // x.className = "show"
        // x.style.setProperty('-webkit-animation', 'fadein 0.5s, fadeout 0.5s 2.5s')
        // x.style.setProperty('animation', 'fadein 0.5s, fadeout 0.5s 2.5s')
        // console.log("after show")
        setTimeout(() => { this.close() }, this.duration + 500) // added 500 for enough time to fade out. forwards makes it keep the final state. https://stackoverflow.com/questions/12991164/maintaining-the-final-state-at-end-of-a-css-animation
    }

    close() {
        this.showing = false
        // var x = this.renderRoot.getElementById("snackbar")
        // x.className = x.className.replace("show", "")
    }
}

customElements.define('snack-bar', SnackBar)
