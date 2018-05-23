<template>
    <div id='login'>
        <div class='container col-sm-4 col-sm-offset-4' style='background-color: beige;margin-top:10%;'>
                <h1 style="margin: 40px;text-align: center">User Login</h1>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input v-model='email' type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email'>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model='password' type="password" class="form-control" placeholder="Password" name="password">
                </div>
                <br>
                <input v-on:click='signIn()' type="submit" class="btn btn-primary" value="Sign In">
                <br>
                <br>
                    <fb-signin-button
                        :params="fbSignInParams"
                        @success="checkLoginState"
                        @error="onSignInError">
                        Sign in with Facebook
                    </fb-signin-button>

                <br> <br>
                Not Registered? 
                <a href="" data-toggle="modal" data-target="#myModal">  Sign Up</a> 
            </div>

            <!-- Modal -->
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
            
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h1 style="text-align: center">Register</h1>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input v-model='email' type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email'>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input v-model='name' type="text" class="form-control" placeholder="Enter name" name="name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input v-model='password' type="password" class="form-control" placeholder="Password" name="password">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-on:click='register()' type="button" class="btn btn-primary" data-dismiss="modal">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>


    export default {
        name:'login',
        data(){
            return {
                image:'https://placehold.it/50x50?text=NO IMAGE',
                token: localStorage.getItem('token') || null,
                name: localStorage.getItem('name') || null,
                email:null,
                name:null,
                password:null,
                fbSignInParams: {
                    scope: 'email,public_profile',
                    return_scopes: true
                }
            }
        },
        methods:{
            signIn(){
                axios.post('https://todo-api.maxville.net/signin',{
                    email:this.email,
                    password:this.password
                }).then(response=>{
                    let message = response.data.message
                    swal({
                        text: message,
                    });
                    if(response.data.token!=undefined){
                    this.$router.push({name:'home'})
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.user.role)
                    localStorage.setItem('image', this.image)
                    localStorage.setItem('name', response.data.user.name)
                    }
                    
                }).catch(err=>{
                    let error = err.response.data.message
                    swal({
                        text: error,
                    });
                })
            },
            register(){
                axios.post('https://todo-api.maxville.net/signup',{
                    email:this.email,
                    name:this.name,
                    password:this.password,
                    role:'user'
                }).then(response=>{
                    swal('success to signup')
                    console.log(response)
                }).catch(err=>{
                    let error = err.response.data.message
                    if (error[0] == 'x') {
                        error = 'email already registered'
                    }
                    swal({
                        text: error,
                    });
                })
            },
            checkLoginState() {
                let self = this
                FB.getLoginStatus(function (response) {
                    if (response.status == 'connected') {
                        console.log(response)
                        axios.post('https://todo-api.maxville.net/fblogin', {}, {
                            headers: {
                                fbToken: response.authResponse.accessToken
                            }
                        }).then(result => {
                           swal('berhasil login dengan facebook')
                            self.$router.push({name:'home'})
                            localStorage.setItem('token', result.data.token)
                            localStorage.setItem('role', result.data.role)
                            localStorage.setItem('image',result.data.image)
                            localStorage.setItem('name',result.data.name)
                        }).catch(err => {
                            swal('login gagal')
                        })
                    } 
                });
            },
            onSignInError (error) {
                console.log('Cant login ', error)
            }
        },
        mounted(){
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
        }
    }

</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor:pointer;
}
</style>