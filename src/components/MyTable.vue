<template>
  <div class="box">
    <div class="Lista">
      <div v-if="!updatingTask">
        <input class="add" type="text" v-model="newTaskTitle" />
        <button class="añadir" @click="_handleaddNewTask">Añadir tarea</button>
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
          <tr v-for="todo in filteredTaskList" :key="todo.id">
                </tr>

          <tr class="tareasnuevas" v-for="todo in uncompletedTaskList" :key="todo.id">
            <td>{{ todo.title }}</td>
            <td>&#x274C;</td>

            <td class="acciones">
              <button @click="_handleCompleteTask(todo)">Tarea realizada!</button>
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
              <th class="tableActions">Tareas realizadas</th>
              <th class="tableActions">Estado</th>
              <th class="tableActions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tareasnuevas" v-for="todo in completedTaskList" :key="todo.id">
              <td>{{ todo.title }}</td>
              <td>
                <span style="color: green; font-size: 1.2em">&#10004;</span>
              </td>

              <td class="acciones">
                <button @click="_handleEraseTask(todo)">Borrar</button>
                <button @click="_handleIncompleteTask(todo)">No realizada</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
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
    // filteredTaskList() {
    // return this.tasksList.filter(todo => todo.user_id === this.UserId);
    //  },
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
  margin-left: 10%;
  margin-right: 10%;
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
  margin-top: 3%;
  
}

table {
  border-collapse: collapse;
  margin-top: 1%;
  margin-bottom: 4%;
  width: 100%;
  height: auto;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 8px;
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

thead th,
tbody td {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  height: auto;
  width: auto;
}
.tareasnuevas {
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width:auto;
  height: auto;
}
thead th:first-child,
tbody td:first-child {
  border-left: none;
  width: auto;
}

thead th:last-child,
tbody td:last-child {
  border-right: none;
  width: auto;
}

.acciones {
  display: flex;
  flex-direction: row;
  align-items: space-around;
  width: auto;
 
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
  width: auto;
  align-self: center;
  font-family: 'Aniron', sans-serif;
  font-size: 12px;
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
  width: auto;
  align-self: center;
}

input[type='text'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 1rem;
  width: 40%;
  margin-top:5%;

}

/* Responsive para dispositivos móviles */
@media (max-width: 480px) {
  .box {
    margin-left: 5%;
    margin-right: 5%;
  }
  h1 {
    font-size: 12px;
  }

  .add {
    margin-left: 1%;
    width: 50%;
    
  }
  .acciones{
    font-size:10px;
  }
  .añadir{
    font-size:10px;
  }
.tableActions {
  font-size: 10px;
}
  .lista {
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    font-size:8px;
  }
  .tareasnuevas {
    font-size: 15px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .añadir {
    width: 30%;
  }

  input[type='text'] {
    max-width: 100%;
  }
  .acciones {
  display: flex;
  flex-direction: column;
  align-content: space-around;
}
.button {
  font-size:7px;
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
    width: 100%;
  }

  .añadir {
    width: 20%;
  }
  .tareasnuevas {
    font-size: 25px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}

</style>
