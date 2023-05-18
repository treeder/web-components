// getCookie returns cookie value
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// setCookie sets a cookie
// Options:
// * domain - set which domain to use. default: window.location.hostname. 
// * useRoot - true/false to use the root domain, ie: example.com even if using a sub-domain.  
// * maxAge - how long the cookie should live, in seconds - default: 365 days
export function setCookie(name, value, opts = {}) {
    if (!opts) opts = {}
    let domain = cookieDomain(opts)
    let sc = `${name}=${value}; SameSite=None; Secure; domain=${domain}; path=/; max-age=${opts.maxAge || 86400 * 365}`
    document.cookie = sc
}

function cookieDomain(opts){
    if (opts.domain) return opts.domain
    let domain = window.location.hostname
    if (opts.useRoot) {
        let sp = domain.split('.')
        if (sp.length > 2) {
            domain = sp.slice(-2).join('.')
        }
    }
    return domain
}

// if you set a custom domain in setCookie, you need to set the domain when you remove it too
export function removeCookie(name, opts = {}) {
    document.cookie = `${name}=;  SameSite=None; Secure; domain=${cookieDomain(opts)}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
