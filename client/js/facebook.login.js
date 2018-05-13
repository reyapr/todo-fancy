if(localStorage.getItem('token')!=null){
    window.location = "https://013877f8.ngrok.io"
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '202717120518400',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            axios.post('http://localhost:3000/fblogin', {}, {
                headers: {
                    fbToken: response.authResponse.accessToken
                }
            }).then(result => {
                window.location = 'https://013877f8.ngrok.io'
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('role', result.data.role)
                localStorage.setItem('image',result.data.image)
                localStorage.setItem('name',result.data.name)
            }).catch(err => {
                alert('login gagal')
            })
        } else {
        }

    });
}