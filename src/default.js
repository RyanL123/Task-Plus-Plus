const defaultTasks = [
    {
        title: "Task 1",
        dueDate: "2020/01/20",
        subtasks: [
            {
                title: "Subtask 1",
                completed: false,
                key: 1,
            },
            {
                title: "Subtask 2",
                completed: true,
                key: 2,
            },
        ],
        completion: 50,
        key: 1,
    },
    {
        title: "Task 2",
        dueDate: "2020/04/20",
        subtasks: [
            {
                title: "Subtask 1",
                completed: true,
                key: 1,
            },
            {
                title: "Subtask 2",
                completed: true,
                key: 2,
            },
        ],
        completion: 100,
        key: 2,
    },
];

export default defaultTasks;
