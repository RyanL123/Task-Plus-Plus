import React from "react";
import Subtask from "./Subtask";
import { Pane, Heading } from "evergreen-ui";

class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            dueDate: "",
            subtasks: [],
            completion: 0.0,
        };
        this.updateSubtask = this.updateSubtask.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }
    componentDidMount() {
        var completed = 0;
        var total = this.props.subtasks.length;
        for (let i = 0; i < total; i++) {
            if (this.props.subtasks[i].completed) completed++;
        }
        var totalProgress = ((completed * 100) / total).toFixed(2);
        this.setState({
            title: this.props.title,
            dueDate: this.props.dueDate,
            subtasks: this.props.subtasks,
            completion: totalProgress,
        });
    }
    updateSubtask(id) {
        this.setState((prevState) => {
            const updateTasks = prevState.subtasks.map((subtask) => {
                console.log(subtask.key + " " + id);
                if (subtask.key === id) {
                    // console.log("success");
                    return {
                        ...subtask,
                        completed: !subtask.completed,
                    };
                }
                return subtask;
            });
            return {
                subtasks: updateTasks,
            };
        });
        this.updateProgress();
    }
    updateProgress() {
        var completed = 0;
        var total = this.state.subtasks.length;
        for (let i = 0; i < total; i++) {
            if (this.state.subtasks[i].completed) completed++;
        }
        var totalProgress = ((completed * 100) / total).toFixed(2);
        this.setState((prevState) => {
            return {
                ...prevState,
                completion: totalProgress,
            };
        });
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
            <div>
                <Heading size={700}>{this.state.title}</Heading>
                <Heading size={500} marginTop="1em">
                    Due Date: {this.state.dueDate}
                </Heading>
                <Heading>Completion: {this.state.completion}%</Heading>
                <Pane>{subtasksComponents}</Pane>
            </div>
        );
    }
}

export default Task;
