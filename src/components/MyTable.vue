<template>
<div class="box">
    <div>
        <div class="plus" v-if="!updatingTask">
            <input class="add" type="text" v-model="newTaskTitle" />
            <button class="añadir" @click="_handleaddNewTask">
                <i class="fas fa-plus"></i>
                <span class="icono-separador"></span>
                <i class="fas fa-lightbulb"></i>
            </button>

        </div>
        <div v-else>
            <input type="text" v-model="updateTaskTitle" />
            <button @click="_handleUpdateTask">Actualizar Tarea</button>
        </div>
        <h1>Lista de tareas pendientes</h1>
        <table>
            <thead>
                <tr>
                    <th class="tableActions">To do</th>

                    <th class="tableActions">Estado</th>
                    <th class="tableActions">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in filteredTaskList" :key="todo.id"></tr>

                <tr class="tareasnuevas" v-for="todo in uncompletedTaskList" :key="todo.id">
                    <td class="tareaadd">{{ todo.title }}</td>
                    <td>&#x274C;</td>

                    <td class="acciones">
                        <button @click="_handleCompleteTask(todo)">
                            <i class="fas fa-check"></i>
                        </button>

                        <button @click="_handleEditTask(todo)">
                            <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button @click="_handleEraseTask(todo)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <h1>Listado de tareas realizadas</h1>
            <table>
                <thead>
                    <tr>
                        <th class="tableActions">Tareas realizadas</th>
                        <th class="tableActions">Estado</th>
                        <th class="tableActions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tareasnuevas" v-for="todo in completedTaskList" :key="todo.id">
                        <td class="tareaadd">{{ todo.title }}</td>
                        <td>
                            <span style="color: green; font-size: 1.2em">&#10004;</span>
                        </td>

                        <td class="acciones">
                            <button @click="_handleEraseTask(todo)">
                                <i class="fas fa-trash-alt"></i>
                            </button>

                            <button @click="_handleIncompleteTask(todo)">
                                <i class="fas fa-times"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'pinia'
import taskStore from '@/stores/taskStore.js'
import userStore from '@/stores/user.js'
export default {
    name: 'MyTable',
    data() {
        return {
            newTaskTitle: '',
            updateTaskTitle: '',
            updatingTask: null
        }
    },
    computed: {
        ...mapState(taskStore, ['tasksList']),
        ...mapState(userStore, ['user']),
        completedTaskList() {
            return this.tasksList.filter((task) => task.is_complete)
        },
        uncompletedTaskList() {
            return this.tasksList.filter((task) => !task.is_complete)
        }
    },
    methods: {
        ...mapActions(taskStore, [
            '_fetchAllTasks',
            '_addNewTask',
            '_editTask',
            '_completeTask',
            '_incompleteTask',
            '_eraseTask',
            '_fetchTasks'
        ]),
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
            this.updatingTask = todo
            this.updateTaskTitle = this.updatingTask.title
        },
        async _handleUpdateTask() {
            try {
                await this._editTask({
                    title: this.updateTaskTitle,
                    id: this.updatingTask.id
                })
                this.updatingTask = null
                this.updateTaskTitle = ''
            } catch (err) {
                console.error(err)
            }
        },
        async _handleCompleteTask(todo) {
            try {
                await this._completeTask({
                    id: todo.id
                })
                todo.is_complete = true
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
                await this._eraseTask(todo.id)
            } catch (err) {
                console.error(err)
            }
        }
    },
    created() {
        this._fetchAllTasks()
    }
}
</script>

<style scoped>
@import url('../assets/fonts.css');

.box {
    display: flex;
    justify-content: center;
}

.plus {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

input.add {
    width: auto;
    height: auto;
    margin-left: 10%;

}

.fa-lightbulb {
    margin-left: 1%;
}

.añadir {
    display: flex;
    align-self: last baseline
}

.icono-separador {
    display: inline-block;
    width: 10px;
}

h1 {
    font-family: 'Aniron', sans-serif;
    font-size: 20px;
    margin-top: 3%;
    color: rgb(128, 86, 36);
}

td {
    background-color: rgba(209, 204, 190, 0.589);
    color: rgb(107, 67, 18);
}

td:hover {
    background-color: rgb(228, 190, 143);
}

.tableActions {
    font-family: 'Aniron', sans-serif;
    width: auto;
    height: auto;
}

thead tr {
    background-color: #aaa;
    color: white;
    font-weight: bold;
    width: auto;
}

tbody td {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
    height: auto;

    border-radius: 10px;
}

tbody tr {
    flex-direction: row;
}

.tareaadd {
    white-space: normal;

    width: 400px;
}

thead th {
    border: 1px solid #ccc;
    padding: 0.6rem;
    text-align: center;
    height: auto;
    width: auto;
    border-radius: 10px;
}

.tareasnuevas {
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 60%;
    height: auto;
}

.acciones {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
}

table {
    margin-top: 1%;
    margin-bottom: 4%;
    border-radius: 10px;
}

button {
    margin-top: 0.8rem;
    background-color: #a97f50;
    color: white;
    border: none;
    padding: 0.5rem 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    margin: 6px;
    width: auto;
    align-self: center;
    font-family: 'Aniron', sans-serif;
    font-size: 0.8rem;
}

button:hover {
    background-color: rgb(73, 43, 9);
}

input[type='text'] {
    padding: 0.5rem;
    border: 1px solid #918484;
    border-radius: 4px;
    margin-right: 1rem;
    width: 40%;

}

/* Responsive para dispositivos móviles */
@media (max-width: 480px) {
    .box {
        margin-left: 5%;
        margin-right: 3%;
    }

    h1 {
        font-size: 0.7rem;
    }

    .add {
        margin-left: 1%;
        width: auto;
    }

    tbody td {
        border: 1px solid #ccc;
        padding: 0.6rem;
        text-align: center;
        height: auto;

        border-radius: 10px;
    }

    td.title {
        width: auto;
    }

    .acciones {
        font-size: 0.8rem;
        width: auto;
    }

    .añadir {
        font-size: 0.8rem;
    }

    .tableActions {
        font-size: 0.5rem;
    }


    .tareasnuevas {
        font-size: 0.8rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    input[type='text'] {
        max-width: 100%;
    }

    .acciones {
        display: flex;
        flex-direction: column;
        align-content: space-around;
    }

    button {
        font-size: 0.5rem;
    }

    td.acciones {
        flex-direction: row;
        height: auto;
    }

    .table {
        margin-left: 5%;
    }

    .tareaadd {
        width: auto;
        font-size: 0.8rem;
    }
}

/* Responsive para tablets */
@media (min-width: 481px) and (max-width: 1023px) {
    .box {
        margin-left: 10%;
        margin-right: 10%;
    }

    .add {
        margin-left: 15%;
    }

    .lista {
        flex-direction: column;
        align-items: center;
    }

    button {
        width: auto;
    }

    .añadir {
        width: auto;
    }

    .tareasnuevas {
        font-size: 18px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
}
</style>
