import React from "react";
import Subtask from "./Subtask";
import { Pane, Heading, Card, Button } from "evergreen-ui";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            dueDate: "",
            subtasks: [],
            completion: 0,
            id: "",
        };
        this.updateSubtask = this.updateSubtask.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }
    // Add props to state, update completion progress for pre-programmed tasks
    componentDidMount() {
        var completed = 0;
        var total = this.props.subtasks.length;
        for (let i = 0; i < total; i++) {
            if (this.props.subtasks[i].completed) completed++;
        }
        var totalProgress =
            total == 0 ? 0 : Math.round((completed * 100) / total);
        this.setState({
            title: this.props.title,
            dueDate: this.props.dueDate,
            subtasks: this.props.subtasks,
            completion: totalProgress,
            id: this.props.id,
        });
    }
    // Updates progress percentage based on completed subtasks from state
    updateProgress() {
        var completed = 0;
        var total = this.state.subtasks.length;
        for (let i = 0; i < total; i++) {
            if (this.state.subtasks[i].completed) completed++;
        }
        var totalProgress =
            total == 0 ? 0 : Math.round((completed * 100) / total);
        this.setState((prevState) => {
            return {
                ...prevState,
                completion: totalProgress,
            };
        });
    }
    // Toggle subtask completion
    updateSubtask(id) {
        const updateTasks = this.state.subtasks;
        for (let i = 0; i < updateTasks.length; i++) {
            if (updateTasks[i].key === id) {
                updateTasks[i].completed = !updateTasks[i].completed;
                break;
            }
        }
        this.setState({
            subtasks: updateTasks,
        });
        this.updateProgress();
    }
    render() {
        const subtasks = this.props.subtasks;
        const subtasksComponents = subtasks.map((subtask) => {
            return (
                <Subtask
                    title={subtask.title}
                    completed={subtask.completed}
                    key={subtask.key}
                    id={subtask.key}
                    updateSubtask={this.updateSubtask}
                />
            );
        });
        return (
            <Card
                elevation={2}
                padding={20}
                margin="1em"
                background="tint1"
                border
                display="flex"
            >
                <Pane width="50%">
                    <Heading size={800}>{this.state.title}</Heading>
                    <Heading size={500} marginTop="1em">
                        Due Date: {this.state.dueDate}
                    </Heading>
                    <Heading size={500} marginTop="0.5em">
                        Completion: {this.state.completion}%
                    </Heading>
                    <Pane>{subtasksComponents}</Pane>
                    <Button
                        appearance="primary"
                        intent="danger"
                        marginTop="1em"
                        onClick={() => this.props.removeTask(this.state.id)}
                    >
                        Delete Task
                    </Button>
                </Pane>
            </Card>
        );
    }
}

export default Task;
