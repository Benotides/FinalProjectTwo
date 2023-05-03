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
                    <button @click.prevent="_handleaddNewTask">Agregar tarea</button>
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
import taskStore from "../stores/taskStore";
import {
    mapActions,
    mapState
} from 'pinia';
import logOut from "../components/logOut.vue";

export default {
    name: "HomeView",
    components: {
        logOut,
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
        ...mapActions(taskStore, ['_addNewTask']),
        async _handleaddNewTask() {
            console.log("handleaddNewTask")
            // const userId = "2ab7ab62-9266-4ef1-aa0f-45d8918a174d";
            const newTask = {
                title: this.newTaskTitle,
                user_id: "2ab7ab62-9266-4ef1-aa0f-45d8918a174d",
            };
            await this._addNewTask(newTask);
            console.log(`Tarea agregada: ${newTask}`);
            this.newTaskTitle = '';
        },
    },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    margin-top: 2rem;
    width: 100%;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 8px;
}

thead tr {
    background-color: #aaa;
    color: white;
    font-weight: bold;
}

thead th,
tbody td {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
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
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 1rem;
    width: 100%;
    max-width: 400px;
}

@media screen and (min-width: 768px) {
    table {
        width: 80%;
    }
}
</style>
