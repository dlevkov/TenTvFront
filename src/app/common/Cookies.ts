export class Cookies {

    // unction Cookie(this._sCookieName)
    // {
    // onerror=function (sError,sURL,iLine){	return ClassException('Cookie',sError,sURL,iLine); }
    // This function save cookie

    sCookieName: string;

    setCookie(sValue, exdays, sDomain) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = this.sCookieName + '=' + sValue + ';' + expires + ';path=/';
    }
    // This function read the cookie that was saved by saveCookie function
    getCookie() {
        let name = this.sCookieName + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    checkCookie() {
    let user = this.getCookie();
    if (user !== '') {
        alert('Welcome again ' + user);
    } else {
        user = prompt('Please enter your name:', '');
        if (user !== '' && user != null) {
            this.setCookie('username', user, 365);
        }
    }
}
}
