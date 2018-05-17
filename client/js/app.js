if(localStorage.getItem('token')==null){
    window.location ='https://bfd75b9e.ngrok.io/login.html'
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
                swal("Succes to Add To Do");
                this.listTask.push(response.data.task)
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
                swal("Succes to Edit");
                let match = this.listTask.findIndex(match => match._id == response.data._id);
                this.listTask[match].task = task
                this.listTask[match].date = date
                this.listTask[match].status = status
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteTask (id){
            swal("Are you sure you want to do this?", {
                buttons: ["cancel", true],
            }).then(succes=>{
                if(succes){
                    swal("Your To Do has been deleted!", {
                        icon: "success",
                    })
                    axios.delete(`http://localhost:3000/user/todo/${id}`, {
                        headers: {
                            token: this.token
                        }
                    }).then(response => {
                        window.location.reload()
                    }).catch(err => {
                        console.log(err)
                    });
                } else {
                    swal("Your To Do file is safe!");
                }
            })
            
        },
        checkDate(isDate){
            return isDate.split('T')[0]
        },
        out() {
            localStorage.clear()
            window.location.reload()
        },
        getEvent(){
            
        },
      
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

        axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=XKHNIZIRNCOG7PKBABRZ&start_date.range_start=2018-10-05T00:00:00&location.address=jakarta`)
        .then(response => {
            this.listEvent = response.data.events
        })
        .catch(err => {
            console.log(err)
        })
    }
})