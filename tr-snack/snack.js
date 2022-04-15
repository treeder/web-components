import 'https://cdn.jsdelivr.net/npm/@material/mwc-snackbar@0/+esm';

function snack(message, type = 'info', icon = 'info-circle', duration = 5000) {
    let alert = document.createElement('mwc-snackbar')
    alert.setAttribute("labelText", message)
    document.body.append(alert);
    return alert.show();
}

export { snack }
