<script>
import { mapState, mapActions } from 'pinia';
import TodoStore from '@/stores/tasks.js';
import UserStore from '@/stores/user.js';
export default {
    name: 'MyTable',
    data() {
        return {
            newTaskTitle: '',
            updateTaskTitle: '',
            updatingTask: null,
        }
    },
    computed: {
        ...mapState(TodoStore, ['tasksList']),
        ...mapState(UserStore, ['user']),
        completedTaskList() {
            return this.tasksList.filter(task => task.is_complete);
        },
        uncompletedTaskList() {
            return this.tasksList.filter(task => !task.is_complete);
        },
    },
    methods: {
        ...mapActions(TodoStore, ['_fetchAllTasks', '_addNewTask', '_editTask', '_completeTask', '_incompleteTask', '_eraseTask', '_fetchTasks']),
        async _handleNewTask() {
            try {
                await this._addNewTask({ title: this.newTaskTitle, user_id: this.user.id })
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
                await this._editTask({ title: this.updateTaskTitle, id: this.updatingTask.id })
                this.updatingTask = null;
                this.updateTaskTitle = '';
            } catch (err) {
                console.error(err)
            }
        },
        async _handleCompleteTask(todo) {
            try {
                await this._completeTask({ id: todo.id })
                todo.is_complete = true;
            } catch (err) {
                console.error(err)
            }
        },
        async _handleIncompleteTask(todo) {
            try {
                await this._incompleteTask({ id: todo.id })
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