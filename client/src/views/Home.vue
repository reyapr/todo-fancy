<template>
  <div class="home">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">To do Fancy</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="#">Home</a>
                    </li>
                </ul>
                
              
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <form class="navbar-form" role="search">
                            <div class="form-group input-group">
                                <input type="text" class="form-control" placeholder="Search..">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </li>
                
                    <li>
                        <a href="#" @click='out'>
                            <span type='submit' class="glyphicon glyphicon-log-out">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
            <div class="row" style="text-align: center">
                <div class="col-sm-3">
                    <div class='well'>
                        <img :src="image" alt=""> <h4 style="margin-left: 2%;display: inline;">{{name}}</h4> 
                    </div>
                </div>
                <div class="container col-sm-9">
                    <table class="table " >
                        <thead >
                            <tr >
                                <th class="text-center col-sm-2">Task</th>
                                <th class="text-center col-sm-2">Date</th>
                                <th class="text-center col-sm-2">Event</th>
                                <th class="text-center col-sm-1">Status</th>
                                <th class="text-center col-sm-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- show task -->
                            <tr is='Task'
                                v-for='(userTasks,index) in tasks'
                                :alltask='userTasks'
                                :checkdate='{date:checkDate(userTasks.date)}'
                                :events = 'listEvent'
                                :position = 'index'
                                :key = 'index'
                                @edit-task='editTask'
                                @delete-task='deleteTask'
                            >
                            </tr>

                            <!-- add Task -->
                            <tr>
                                <td>
                                    <input v-model='task' type="text" class="form-control" id="usr">
                                </td>
                                <td>
                                    <input v-model='date' type="date" class="form-control" id="usr">
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <button @click='addTask()' type="button" class="btn btn-info">Save</button>
                                </td>
                            </tr>
                            <!-- end Add -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Task from '@/components/Task'

export default {
    name: 'home',
    components:{
        Task
    },
    data(){
      return {
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
      }
    },
    methods:{
        addTask (){
            axios.post('https://todo-api.maxville.net/user/todo',{
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
            axios.put(`https://todo-api.maxville.net/user/todo/${id}`,{
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
        deleteTask (id,position){
            swal("Are you sure you want to do this?", {
                buttons: ["cancel", true],
            }).then(succes=>{
                if(succes){
                    swal("Your To Do has been deleted!", {
                        icon: "success",
                    })
                    axios.delete(`https://todo-api.maxville.net/user/todo/${id}`, {
                        headers: {
                            token: this.token
                        }
                    }).then(response => {
                        console.log(position)
                        this.listTask.splice(position,1)
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
    },
    computed:{
        tasks(){
            return this.listTask
        },
    },
    mounted(){
        axios.get('https://todo-api.maxville.net/user/todo',{
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
        if(localStorage.getItem('token')==null){
            this.$router.push({name:'login'})
        }
    }
}

</script>
