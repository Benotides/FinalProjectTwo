<template>
<div class="box">
    <div class="Lista">
        <div v-if="!updatingTask">
            <input class="add" type="text" v-model="newTaskTitle">
            <button class="añadir" @click="_handleaddNewTask">Añadir tarea</button>
        </div>
        <div v-else>
            <input type="text" v-model="updateTaskTitle">
            <button @click="_handleUpdateTask">Actualizar Tarea</button>
        </div>
        <h1>Lista de tareas</h1>
        <table>
            <thead>
                <tr>
                    <th class="tableActions">To do!</th>

                    <th class="tableActions">Estado</th>
                    <th class="tableActions">Acciones</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in uncompletedTaskList" :key="todo.id">
                    <td>{{ todo.title }}</td>
                    <td>&#x274C;</td>

                    <td class="acciones">
                        <button @click="_handleCompleteTask(todo)">Tarea completada!</button>
                        <button @click="_handleEditTask(todo)">Modificar</button>
                        <button @click="_handleEraseTask(todo)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <h1>Listado de tareas realizadas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tareas completadas</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in completedTaskList" :key="todo.id">
                        <td>{{ todo.title }}</td>
                        <td>
                            <span style="color: green; font-size: 1.2em;">&#10004;</span>
                        </td>

                        <td class="acciones">
                            <button @click="_handleEraseTask(todo)">Borrar</button>
                            <button @click="_handleIncompleteTask(todo)">No completada</button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <logOut />
    </div>
</div>
</template>

<script>
import taskStore from "../stores/taskStore";
import userStore from "../stores/user";
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
            updateTaskTitle: '',
            updatingTask: null,
        };
    },
    computed: {
        ...mapState(taskStore, ['tasksList']),
        ...mapState(userStore, ['user']),
        completedTaskList() {
            return this.tasksList.filter(task => task.is_complete);
        },
        uncompletedTaskList() {
            return this.tasksList.filter(task => !task.is_complete);
        },
    },
    methods: {
        ...mapActions(taskStore, ['_addNewTask', '_deleteTask', '_fetchAllTasks', '_editTask', '_completeTask', '_incompleteTask', '_eraseTask', '_fetchTasks']),
        async _handleaddNewTask() {
            try {
                await this._addNewTask({
                    title: this.newTaskTitle,
                    user_id: this.user.id
                })
                this.newTaskTitle = ''
            } catch (err) {
                console.error(err)
            }
        },
        _handleEditTask(todo) {
            this.updatingTask = todo;
            this.updateTaskTitle = this.updatingTask.title;
        },
        async _handleUpdateTask() {
            try {
                await this._editTask({
                    title: this.updateTaskTitle,
                    id: this.updatingTask.id
                })
                this.updatingTask = null;
                this.updateTaskTitle = '';
            } catch (err) {
                console.error(err)
            }
        },
        async _handleCompleteTask(todo) {
            try {
                await this._completeTask({id: todo.id})
                todo.is_complete = true;
            } catch (err) {
                console.error(err)
            }
        },
        async _handleIncompleteTask(todo) {
            try {
                await this._incompleteTask({
                    id: todo.id
                })
            } catch (err) {
                console.error(err)
            }
        },
        async _handleEraseTask(todo) {
            try {
                await this._eraseTask(todo.id);
            } catch (err) {
                console.error(err)
            }
        },
    },
    created() {
        this._fetchAllTasks()
    },
}
</script>

<style scoped>
@import url('../assets/fonts.css');

.box {
    margin-left: 15%;
}

.add {
    margin-left: 20%;
}

.lista {

    justify-content: center;
}

h1 {

    font-family: 'Aniron', sans-serif;
    font-size: 20px;
}

table {
    border-collapse: collapse;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 100%;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 8px;

}

.tableActions {
    font-family: 'Aniron', sans-serif;
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

.acciones {
    display: flex;
    flex-direction: column;
}

button {
    margin-top: 1rem;
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px;
    width: 45%;
    align-self: center;
    font-family: 'Aniron', sans-serif;
    font-size: 10px;
}

.añadir {
    margin-top: 1rem;
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px;
    width: 15%;
    align-self: center;
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
