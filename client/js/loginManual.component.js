new Vue({
    el:'#login',
    data:{
        image:'https://placehold.it/50x50?text=NO IMAGE',
        token: localStorage.getItem('token') || null,
        name: localStorage.getItem('name') || null,
        email:null,
        name:null,
        password:null,
    },
    methods:{
        signIn(){
            axios.post('http://localhost:3000/signin',{
                email:this.email,
                password:this.password
            }).then(response=>{
                let message = response.data.message
                swal({
                    text: message,
                });
                if(response.data.token!=undefined){
                window.location = 'https://bfd75b9e.ngrok.io'
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
            axios.post('http://localhost:3000/signup',{
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
        }
    }
})