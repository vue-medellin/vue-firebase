<template>
  <div class="container-fluid">
    <h1>Done</h1>
    <div class="row no-gutters card">
      <ul class="list-group">
        <li class="list-group-item" v-for="(task, i) in tasksDone" :key="i">
          <div class="row no-gutters">
            <div class="col-sm-12">
              <div>
                <label class="left">{{ task.name }}</label>
              </div>
              <button class="btn btn-outline undone-button right" @click="undoneTask(task)">
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </li>
        <li v-if="!tasksDone || !tasksDone.length > 0" class="list-group-item">
          <div class="row no-gutters">
            <div class="col-sm-12">
              <div>
                <label class="left">There are No Completed Tasks</label>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRef: null,
      tasksDone: [],
    };
  },
  beforeMount() {
    this.userRef = this.$firebaseRef.child(this.$store.state.uid);

    this.userRef.child('done').on('child_added', (snapshot) => {
      this.tasksDone.push({
        ...snapshot.val(),
        key: snapshot.key,
      });
    });
  },
  methods: {
    undoneTask(task) {
      const tasksRef = this.userRef.child('tasks').child(task.key);
      tasksRef.update({ name: task.name });

      this.deleteTask(task.key);
    },
    deleteTask(key) {
      this.userRef.child('done').child(key).remove();
      this.tasksDone = this.tasksDone.filter(item => item.key !== key);

      this.$store.dispatch('REFRESH_TASKS', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task-container {
  width: 100%;
}

.undone-button {
  border: 1px solid red;
  color: red;

  &:hover {
    background-color: red;
    color: white;
  }
}

.list-group {
  height: 559px;
  overflow-y: auto;
}

li.list-group-item {
  border: none;
}
</style>
