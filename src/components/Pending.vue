<template>
  <div class="container-fluid">
    <h1>Pending</h1>
    <div class="row no-gutters">
      <div class="col-xs-12 add-task-container">
        <input v-model="taskValue" class="add-task left"
          type="text" placeholder="Add a New Task" @keypress.enter="addTask()">
        <button class="btn btn-outline add-button right"
          @click="addTask()">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="row no-gutters card">
      <ul class="list-group">
        <li class="list-group-item" v-for="task in tasks" :key="task.key">
          <div class="row no-gutters">
            <div class="col-sm-12">
              <div>
                <label class="left">{{ task.name }}</label>
              </div>
              <button class="btn btn-outline delete-button right" @click="deleteTask(task.key)">
                <i class="fas fa-minus"></i>
              </button>
              <button class="btn btn-outline complete-button right" @click="completeTask(task)">
                <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </li>
        <li v-if="!tasks || !tasks.length > 0" class="list-group-item">
          <div class="row no-gutters">
            <div class="col-sm-12">
              <div>
                <label class="left">No Tasks Added</label>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      userRef: null,
      taskValue: null,
      tasks: [],
    };
  },
  beforeMount() {
    this.userRef = this.$firebaseRef.child(this.$store.state.uid);
    this.getTasks();
  },
  methods: {
    async getTasks() {
      const snapshot = await this.userRef.child('tasks').once('value');

      this.tasks = [];
      snapshot.forEach((childSnapshot) => {
        this.tasks.push({
          ...childSnapshot.val(),
          key: childSnapshot.key,
        });
      });
    },
    async addTask() {
      if (this.taskValue) {
        const newKey = this.userRef.child('tasks').push().key;
        await this.userRef.child('tasks').child(newKey).update({
          name: this.taskValue,
        });

        this.tasks.push({
          name: this.taskValue,
          key: newKey,
        });
        this.taskValue = null;
      }
    },
    completeTask(task) {
      const doneRef = this.userRef.child('done').child(task.key);
      doneRef.update({ name: task.name });

      this.deleteTask(task.key);
    },
    deleteTask(key) {
      this.userRef.child('tasks').child(key).remove();
      this.getTasks();
    },
  },
  computed: {
    ...mapState(['refreshTasks']),
  },
  watch: {
    refreshTasks() {
      if (this.refreshTasks) {
        this.getTasks();
        this.$store.dispatch('REFRESH_TASKS', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task-container {
  width: 100%;
}

.add-button {
  background-color: white;
  border: 1px solid #304960;
  color: #304960;

  &:hover {
    background-color: #304960;
    color: white;
  }
}

.complete-button {
  background-color: white;
  border: 1px solid #00bc7e;
  color: #00bc7e;
  margin-right: 5px;

  &:hover {
    background-color: #00bc7e;
    color: white;
  }
}

.delete-button {
  background-color: white;
  border: 1px solid red;
  color: red;

  &:hover {
    background-color: red;
    color: white;
  }
}

.add-task {
  padding-left: 10px;
  height: 100%;
  width: 80%;
}


div.card {
  margin-top: 20px;
}

.list-group {
  height: 500px;
  overflow-y: auto;
}

li.list-group-item {
  border: none;
}
</style>
