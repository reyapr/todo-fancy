if(localStorage.getItem('token')==null){
    window.location ='https://013877f8.ngrok.io/login.html'
}

new Vue ({
    el:'#app',
    data:{
        token:localStorage.getItem('token') || null,
        image:localStorage.getItem('image') || null,
        name: localStorage.getItem('name') || null,
        task:null,
        status:false,
        date:null,
        api:'',
        listTask:null,
        userId:null,
        listEvent:null,
    },
    methods:{
        addTask (){
            axios.post('http://localhost:3000/user/todo',{
                task:this.task,
                date:this.date,
                status:this.status
            },{
                headers:{
                    token: this.token
                }
            }).then(response=>{
                console.log(response)
                alert('success to add task')
                window.location.reload()
            }).catch(err=>{
                alert('must input the task and date')
            })
        },
        editTask (id,task,date,status){
            axios.put(`http://localhost:3000/user/todo/${id}`,{
                task,
                date,
                status
            },{
                headers:{
                    token: this.token
                }
            }).then(response=>{
                console.log(response)
                alert('success to edit task')
                window.location.reload()
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteTask (id){
            axios.delete(`http://localhost:3000/user/todo/${id}`,{
                headers:{
                    token: this.token
                }
            }).then(response=>{
                console.log(response)
                alert('success to delete task')
                window.location.reload()
            }).catch(err=>{
                console.log(err)
            })
        },
        checkDate(isDate){
            return isDate.split('T')[0]
        },
        out() {
            localStorage.clear()
            window.location.reload()
        },
        getEvent(date){
            axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=Q3UYEX4ADAWZKTHE3N7O&start_date.range_start=${date}T00:00:00&location.address=jakarta`)
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        axios.get('http://localhost:3000/user/todo',{
            headers:{
                token: this.token
            }
        }).then(response=>{
            console.log(response)
            this.listTask = response.data.allTask
        }).catch(err=>{
            console.log(err)
        })

        
    }
})