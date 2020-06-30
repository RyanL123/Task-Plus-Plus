import React from "react";
import { Pane, Button, Textarea, Label, TextInputField } from "evergreen-ui";
import Task from "./components/Task";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: [
                {
                    title: "task1",
                    dueDate: "2020/01/20",
                    subtasks: [
                        {
                            title: "subtask 1",
                            completed: false,
                            key: 1,
                        },
                        {
                            title: "subtask 2",
                            completed: true,
                            key: 2,
                        },
                    ],
                    key: 1,
                },
                {
                    title: "task2",
                    dueDate: "2020/04/20",
                    subtasks: [
                        {
                            title: "subtask 1",
                            completed: true,
                            key: 1,
                        },
                        {
                            title: "subtask 2",
                            completed: true,
                            key: 2,
                        },
                    ],
                    key: 2,
                },
            ],
            newTask: {
                title: "",
                dueDate: "",
                subtasks: [],
            },
            key: 3,
        };
        this.updateNewTask = this.updateNewTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }
    // Updates the new incoming task state with values in forms
    updateNewTask(event) {
        const { name, value, type } = event.target;
        // Handles subtasks
        if (type === "textarea") {
            const subtasks = value.split(",").map((subtask, index) => {
                return {
                    title: subtask,
                    completed: false,
                    key: index,
                };
            });
            this.setState({
                newTask: {
                    ...this.state.newTask,
                    [name]: subtasks,
                },
            });
        }
        // All other fields
        else {
            this.setState({
                newTask: {
                    ...this.state.newTask,
                    [name]: value,
                },
            });
        }
    }
    // Write the incoming new task into the tasks array and clear it
    addNewTask() {
        let newState = this.state;
        newState.tasks.push(this.state.newTask);
        newState.newTask = {
            title: "",
            dueDate: "",
            subtasks: [],
        };
        // Update unique key
        newState.key = this.state.key + 1;
        this.setState(newState);
    }
    // Removes task with matching id from state
    removeTask(id) {
        let prevTasks = this.state.tasks;
        let ind = 0;
        for (let i = 0; i < prevTasks.length; i++) {
            if (prevTasks[i].key === id) {
                ind = i;
                break;
            }
        }
        prevTasks.splice(ind, 1);
        this.setState({
            tasks: prevTasks,
        });
    }
    render() {
        const tasks = this.state.tasks;
        const taskComponents = tasks.map((task) => {
            return (
                <Task
                    title={task.title}
                    dueDate={task.dueDate}
                    subtasks={task.subtasks}
                    key={task.key}
                    id={task.key}
                    removeTask={this.removeTask}
                />
            );
        });
        return (
            <div>
                <Pane
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    marginTop="3%"
                    marginLeft="15%"
                    marginRight="15%"
                >
                    <TextInputField
                        label="Title"
                        name="title"
                        placeholder="Task Title"
                        value={this.state.newTask.title}
                        onChange={this.updateNewTask}
                        required
                        validationMessage="This field is required"
                        isInvalid={this.state.newTask.title === ""}
                    />
                    <TextInputField
                        label="Date"
                        name="dueDate"
                        placeholder="Year/Month/Day"
                        value={this.state.newTask.dueDate}
                        onChange={this.updateNewTask}
                    />
                    <Label htmlFor="subtasks">Subtasks</Label>
                    <Textarea
                        id="subtasks"
                        placeholder="..."
                        height={48}
                        name="subtasks"
                        placeholder="Comma separated subtasks (e.g. subtask1,subtask2,subtask3)"
                        value={this.state.newTask.subtasks
                            .map((subtask) => subtask.title)
                            .join(",")}
                        onChange={this.updateNewTask}
                    />
                    <Pane>
                        <Button
                            appearance="primary"
                            marginTop="1em"
                            onClick={this.addNewTask}
                        >
                            Create Task
                        </Button>
                    </Pane>
                </Pane>
                <Pane
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    marginTop="3%"
                    marginLeft="15%"
                    marginRight="15%"
                >
                    {taskComponents}
                </Pane>
            </div>
        );
    }
}

export default App;
