import React from "react";
import {
    Pane,
    Button,
    TextInput,
    Textarea,
    Label,
    TextInputField,
} from "evergreen-ui";
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
        };
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
                    <TextInputField label="Title" />
                    <TextInputField label="Date" />
                    <Label htmlFor="subtasks">Subtasks</Label>
                    <Textarea id="subtasks" placeholder="..." height={48} />
                    <Pane>
                        <Button appearance="primary" marginTop="1em">
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
