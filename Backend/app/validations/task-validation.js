const taskValidationSchema = {
    title:{
        notEmpty:{
            errorMessage:'Title field is required'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'Description field is required'
        }
    },
    status:{
        notEmpty:{
            errorMessage:'Status field is required'
        }
    },
    priority:{
        notEmpty:{
            errorMessage:'Priority field is required'
        }
    },
}

module.exports = taskValidationSchema