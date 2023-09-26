module.exports = {
    isOwner:function(request, response) {
        /* request.user 는 passport에서 생성해 준다 */
        if (request.user) {
            return true;
        } 
        else {
            return false;
        }
    },
    statusUI:function(request, response) {
        var authStatusUI = `
            <a href="/auth/login">Login</a> | 
            <a href="/auth/register">Register</a> |
            <a href="/auth/google">Login with Google</a>`
        if (this.isOwner(request, response)) {
            /* request.user 는 passport에서 생성해 준다 */
            authStatusUI = `${request.user.displayName} | 
            <a href="/auth/logout">logout</a>`;
        }

        return authStatusUI;
    }
}