homeview.vue

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
            <tr>
                <td>
                    <input type="text" v-model="newTaskTitle" placeholder="Tarea nueva" />
                </td>
                <td>
                    <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
                    <button @click.prevent="handleaddNewTask({ title: newTaskTitle, userId: 1 })">Agregar tarea</button>

                </td>
            </tr>
            <tr v-for="todo in tasksList" :key="todo.id">
                <td>{{ todo.title }}</td>
                <td>
                    <button @click="_deleteTask(todo.id)">Eliminar</button>
                </td>
            </tr>

        </tbody>
    </table>
    <logOut />
</div>
</template>

<script>
import taskStore from '@/stores/tasks';
import {
    mapActions,
    mapState
} from 'pinia';
import logOut from '../components/logOut.vue'

export default {
    name: 'HomeView',
    components: {
        logOut
    },
    data() {
        return {
            newTaskTitle: '',
        };
    },
    computed: {
        ...mapState(taskStore, ['tasksList']),
    },
    methods: {
        ...mapActions(taskStore, ['_fetchAllTasks', '_addNewTask', '_deleteTask']),
        async handleaddNewTask() {
            const userId = 1;
            const newTask = {
                title: this.newTaskTitle,
                userId: userId
            };
            await this._addNewTask(newTask);
            console.log(`Tarea agregada: ${newTask.title}`);
            this.newTaskTitle = '';
        },
    },

    async _deleteTask(title, userId) {
        await this._deleteTask(title, userId);
    },
};
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
