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
        var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Refister</a>'
        if (this.isOwner(request, response)) {
            /* request.user 는 passport에서 생성해 준다 */
            authStatusUI = `${request.user.nickname} | 
            <a href="/auth/logout">logout</a>`;
        }

        return authStatusUI;
    }
}