import React from "react";
import {
    Pane,
    Button,
    Textarea,
    Label,
    TextInputField,
    toaster,
    SegmentedControl,
} from "evergreen-ui";
import Task from "./components/Task";
import "./App.css";
import defaultTasks from "./default";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: defaultTasks,
            newTask: {
                title: "",
                dueDate: "",
                subtasks: [],
                completion: 0,
                id: "",
                key: "",
            },
            key: 3,
            sortOptions: [
                {
                    label: "Completion Ascending",
                    value: "completion-ascending",
                },
                {
                    label: "Completion Descending",
                    value: "completion-descending",
                },
            ],
            taskSortOrder: "completion-descending",
        };

        this.updateNewTask = this.updateNewTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
        this.updateStateWithChild = this.updateStateWithChild.bind(this);
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
        if (this.state.newTask.title === "") {
            toaster.danger("Your task must have a title!", { duration: 1 });
            return;
        }
        let newState = this.state;
        newState.tasks.push(this.state.newTask);
        this.state.newTask.id = this.state.key;
        this.state.newTask.key = this.state.key;
        newState.newTask = {
            title: "",
            dueDate: "",
            subtasks: [],
        };
        // Update unique key
        newState.key = this.state.key + 1;
        this.setState(newState);
        toaster.success("Task successfully created", { duration: 1 });
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
        toaster.danger("Task successfully deleted", { duration: 1 });
    }
    sortTasks(event) {
        this.setState({
            taskSortOrder: event,
        });
        if (this.state.taskSortOrder === "completion-descending") {
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.sort(function (a, b) {
                        return a.completion - b.completion;
                    }),
                };
            });
        } else if (this.state.taskSortOrder === "completion-ascending") {
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.sort(function (a, b) {
                        return b.completion - a.completion;
                    }),
                };
            });
        }
    }
    updateStateWithChild(incomingTask) {
        this.setState((prevState) => {
            return {
                tasks: prevState.tasks.map((task) => {
                    if (task.key === incomingTask.id) {
                        return {
                            ...incomingTask,
                            key: task.key,
                        };
                    } else return task;
                }),
            };
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
                    updateParent={this.updateStateWithChild}
                />
            );
        });
        return (
            <Pane
                justifyContent="space-between"
                display="flex"
                flexDirection="row"
                marginTop="5vh"
                marginLeft="5vw"
                marginRight="5vw"
                flexWrap="wrap"
                className="container"
            >
                <Pane
                    width="50%"
                    background="blueTint"
                    padding={20}
                    borderRadius={10}
                    elevation={2}
                    border
                    className="max-width"
                    justifyContent="center"
                    height="500px"
                    marginBottom="1em"
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
                        height={48}
                        name="subtasks"
                        placeholder="Comma separated subtasks (e.g. subtask 1, subtask 2, subtask 3)"
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
                    width="45%"
                    className="max-width"
                >
                    <SegmentedControl
                        options={this.state.sortOptions}
                        value={this.state.taskSortOrder}
                        onChange={(value) => this.sortTasks(value)}
                    />
                    {taskComponents}
                </Pane>
            </Pane>
        );
    }
}

export default App;
