let getTask = `<tr> 
                    <td>
                        <input type="text" class="form-control" id="usr" v-model='userTask'>
                    </td>
                    <td>
                        <input type="date" class="form-control" id="usr" v-model="userDate">
                    </td>
                    <td>
                    <div class="form-group">
                        <select class="form-control" id="sel1">
                        
                        <option 
                        v-for='event in events' 
                        v-if='event.end.local.substr(0,10)==checkdate'
                        >{{event.name.text}}</option>
                        </select>
                        
                    </div>
                    </td>
                    <td>
                        <input  type="checkbox" class="form-control" id="usr" v-model="userStatus" >
                    </td>
                    <td>
                        <button @click='editUserTask' type="button" class="btn btn-warning glyphicon glyphicon-edit">Edit</button >
                        <button @click='deleteUserTask' type="button" class="btn btn-danger glyphicon glyphicon-trash">Delete</button >
                    </td>
                </tr>
                `
Vue.component('user-task',{
    props:['alltask','checkdate','userid','events'],
    data(){
        return{
            userTask:this.alltask.task,
            userDate: this.checkdate,
            userAPI:null,
            userStatus: this.alltask.status,
        }
    },
    template:getTask,
    methods:{
        editUserTask(){
            this.$emit('edit-task',this.alltask._id,this.userTask,this.userDate,this.userStatus)
        },
        deleteUserTask(){
            this.$emit('delete-task', this.alltask._id)
        },
    }
})