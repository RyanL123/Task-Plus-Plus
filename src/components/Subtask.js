import React from "react";
import { Checkbox } from "evergreen-ui";

class Subtask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            completed: false,
            id: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    // Record props into state
    componentDidMount() {
        this.setState({
            title: this.props.title,
            completed: this.props.completed,
            id: this.props.id,
        });
    }
    // Toggle subtask completion
    handleChange() {
        this.setState((prevState) => {
            return {
                completed: !prevState.completed,
            };
        });
        this.props.updateSubtask(this.state.id);
    }
    render() {
        return (
            <div>
                <Checkbox
                    label={this.state.title}
                    checked={this.state.completed}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Subtask;
