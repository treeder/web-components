// getCookie returns cookie value
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// setCookie sets a cookie
// Options:
// * domain - default: root domain level (eg: example.com). To be more specific, set it to window.location.hostname (eg: app.example.com)
// * maxAge - how long the cookie should live, in seconds - default: 365 days
export function setCookie(name, value, opts = {}) {
    if (!opts) opts = {}
    let domain = cookieDomain(opts)
    let sc = `${name}=${value}; SameSite=None; Secure; domain=${domain}; path=/; max-age=${opts.maxAge || 86400 * 365}`
    document.cookie = sc
}

function cookieDomain(opts){
    let domain = window.location.hostname
    if (!opts.domain) {
        let sp = domain.split('.')
        if (sp.length > 2) {
            domain = sp.slice(-2).join('.')
        }
    }
    return domain
}

// if you set a custom domain in setCookie, you need to set the domain when you remove it too
function removeCookie(name, opts = {}) {
    document.cookie = `${name}=;  SameSite=None; Secure; domain=${cookieDomain(opts)}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
