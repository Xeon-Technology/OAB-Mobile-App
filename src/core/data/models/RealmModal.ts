const LoggerSchema = {
    name: "Logger",
    properties: {
        _id: "int",
        title: "string",
        log_description: "string?",
    },
    primaryKey: "_id",
    
};


export { LoggerSchema }