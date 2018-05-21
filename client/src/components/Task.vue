<template>
    <tr> 
        <td>
            <input type="text" class="form-control" id="usr" v-model='alltask.task'>
        </td>
        <td>
            <input type="date" class="form-control" id="usr" v-model="checkdate.date">
        </td>
        <td>
        <div class="form-group">
            <select class="form-control" id="sel1">
            <option 
            v-for='event in events' 
            v-if='event.end.local.substr(0,10)==checkdate.date'
            >{{event.name.text}}</option>
            </select>
            
        </div>
        </td>
        <td>
            <input  type="checkbox" class="form-control" id="usr" v-model="alltask.status" >
        </td>
        <td>
            <button @click='editUserTask' type="button" class="btn btn-warning glyphicon glyphicon-edit">Edit</button >
            <button @click='deleteUserTask' type="button" class="btn btn-danger glyphicon glyphicon-trash">Delete</button >
        </td>
    </tr>
</template>

<script>
    export default {
        props:['alltask','checkdate','userid','events','position'],
        data(){
            return{
                userTask:this.alltask.task,
                userDate: this.checkdate,
                userAPI:null,
                userStatus: this.alltask.status,
            }
        },
        methods:{
            editUserTask(){
                this.$emit('edit-task',this.alltask._id,this.alltask.task,this.checkdate.date,this.alltask.status)
            },
            deleteUserTask(){
                this.$emit('delete-task', this.alltask._id,this.position)
            },
        },
     
    }
</script>