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
                alert('success to login')
                window.location = 'https://a5632c94.ngrok.io'
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', response.data.user.role)
                localStorage.setItem('image', this.image)
                localStorage.setItem('name', response.data.user.name)
            }).catch(err=>{
                console.log(err)
            })
        },
        register(){
            axios.post('http://localhost:3000/signup',{
                email:this.email,
                name:this.name,
                password:this.password,
                role:'user'
            }).then(response=>{
                alert('success to signup')
                console.log(response)
            }).catch(err=>{
                console.log(err.message)
            })
        }
    }
})