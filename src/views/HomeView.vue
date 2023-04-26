<template>
<div>
    <h1>Lista de tareas</h1>
    <table>
        <thead>
            <tr>
                <th>Tarea</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in tasksList" :key="todo.id">
                <td>{{ todo.title }}</td>
                <td>
                    <button @click="showEditModal(todo)">Editar</button>
                    <button @click="deleteTask(todo.id)">Eliminar</button>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model='newTaskTitle' />
                </td>
                <td>
                    <button @click="_addNewTask()">Agregar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class=" signout" @click="handleLogout()">Log Out</button>
</div>
</template>

<script>
import tasks from '../stores/tasks';
// import userStore from '../stores/user';
import {
    mapActions,
    mapState
} from 'pinia';

export default {
    data() {
        return {
            newTaskTitle: ''
        }
    },
    computed: {
        ...mapState(tasks, ['tasksList'])
    },
    methods: {
        ...mapActions(tasks, ['_fetchAllTasks', '_addNewTask', '_deleteTask', 'signOut']),
        async handleLogout() {
            await this.signOut()
            this.$router.push({
                name: 'signIn'
            })
        },
        created() {
            console.log('Homeview')
            this._fetchAllTasks()
        },
        mounted() {
            this._addNewTask({
                title: '',
                userId: ''
            })
            this.newTaskTitle = ''
        },

    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    margin-top: 2rem;
    width: 100%;
}

thead tr {
    background-color: #ddd;
}

thead th,
tbody td {
    border: 1px solid #ddd;
    padding: 0.5rem;
}

thead th:first-child,
tbody td:first-child {
    border-left: none;
}

thead th:last-child,
tbody td:last-child {
    border-right: none;
}

button {
    margin-top: 1rem;
}
</style>
