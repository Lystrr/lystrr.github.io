define(["require", "exports", "../Core", "./TaskPool"], function (require, exports, Core_1, TaskPool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tasks = void 0;
    /**
     * Provides state model for tasks
     */
    class Tasks {
        static init() {
            Core_1.CoreUtils.getVariables().player.tasks = [];
        }
        static getTask(taskId) {
            return Tasks.taskDefinition[taskId];
        }
        static getTaskIds() {
            return Core_1.CoreUtils.getVariables().player.tasks;
        }
        static getTasks() {
            return Tasks.getTaskIds().map((taskId) => {
                const task = Tasks.getTask(taskId);
                if (task == null) {
                    throw `taskId:${taskId} not found`;
                }
                return task;
            });
        }
        static addTask(taskId) {
            const tasks = Tasks.getTaskIds();
            if (tasks.indexOf(taskId) < 0) {
                tasks.push(taskId);
            }
            else {
                throw `Unexpected! Task ${taskId} already exists`;
            }
        }
        static ensureTask(taskId) {
            const tasks = Tasks.getTaskIds();
            if (tasks.indexOf(taskId) < 0) {
                tasks.push(taskId);
            }
        }
        static removeTask(taskId) {
            const tasks = Tasks.getTaskIds();
            const index = tasks.indexOf(taskId);
            if (index >= 0) {
                tasks.splice(index, 1);
                Core_1.CoreUtils.getVariables().player.tasks = tasks;
            }
        }
        static hasTask(taskId) {
            const tasks = Tasks.getTaskIds();
            return tasks.indexOf(taskId) >= 0;
        }
        static hasTodayTask() {
            const tasks = Tasks.getTasks();
            return (tasks.findIndex((item) => {
                return item.requiredToday != null && item.requiredToday === true;
            }) >= 0);
        }
    }
    exports.Tasks = Tasks;
    Tasks.taskDefinition = TaskPool_1.generateTasks();
});
