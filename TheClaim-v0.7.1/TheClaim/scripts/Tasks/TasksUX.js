define(["require", "exports", "./Tasks"], function (require, exports, Tasks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TasksUX = void 0;
    class TasksUX {
        static render() {
            let content = "";
            const tasks = Tasks_1.Tasks.getTasks();
            if (tasks.length > 0) {
                content += `<ul class="tasks-list">`;
                for (let i = 0; i < tasks.length; i++) {
                    if (!tasks[i].isHidden) {
                        content += `<li class="tasks-list-item">`;
                        content += `${tasks[i].description}`;
                        if (tasks[i].requiredToday) {
                            content += `<b>(Must be done today)</b>`;
                        }
                        content += `</li>`;
                    }
                }
                content += `</ul>`;
            }
            else {
                content += `You are completely carefree at the moment.`;
            }
            return content;
        }
    }
    exports.TasksUX = TasksUX;
});
