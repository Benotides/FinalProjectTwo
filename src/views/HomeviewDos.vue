<template>
<div>
    <h1 class="title">Welcome to My App!</h1>
    <Nav />
    <div class="home">
        <h1 class="subtitle">Welcome to the Home Page!</h1>
        <button class="logout-btn" @click="handleLogout">Log Out</button>
        <form @submit.prevent="addTask">
            <input type="text" v-model="newTask" placeholder="Add a new task" required>
            <button type="submit">Add</button>
        </form>
        <div>
        <p v-for="todo in tasksList" :key="todo.id">{{ todo.title }}</p>
            <button @click="_addNewTask({title:'New task', usearId:'0b167c8e-adff-45b1-ad62-25259d887fd5'})">Create task</button>
        </div>
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <span>{{ task.task }}</span>
                <div>
                    <button @click="editTask(index)">Edit</button>
                    <button @click="deleteTask(index)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import TaskStore from '../stores/tasks';
import {
    mapActions,
    mapState
} from 'pinia';

export default {
    components: {
        Nav,

    },
    data() {
        return {
            tasks: [],
            newTask: "",
            editedTaskIndex: null,
        };
    },
    methods: {
        handleLogout() {
            this.$supabase.auth.signOut()
                .then(() => {
                    this.$router.push('/auth/login');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        ...mapActions('tasks', ['addTask', 'editTask', 'deleteTask'])
    },
    computed: {
        ...mapState('tasks', ['tasks'])
    }

};
</script>

<style>
.title {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 2rem;
}

.subtitle {
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
}

.logout-btn {
    background-color: #007acc;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.logout-btn:hover {
    background-color: #005ca6;
}

.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
}

/* Estilos para la lista de tareas */
ul {
    list-style-type: none;
    margin-top: 2rem;
    padding: 0;
}

li {
    display: flex;
}
</style>
