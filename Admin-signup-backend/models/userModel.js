const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const secretKey = process.env.TOKEN_KEY;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            minlength: [1, "Name should be at least 1 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("not valid email");
                }
            },
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            min: 6,
            max: 15,
            trim: true, //?white spaces are removed
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter strong password User one uppercase and Special symbol");
                }
            },
        },
        cpassword: {
            type: String,
            min: 6,
            max: 15,
            trim: true, //?white spaces are removed
            //  required: [true, "Confirm Password is required"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords do not match",
            },
        },


        role: {
            //type: mongoose.Schema.Types.ObjectId,
            type: String,
            // ref: 'role',
            // required: [true, 'Role is required'],

        },

        access: [{
            type: mongoose.Schema.Types.ObjectId,
            type: Array,
            ref: 'accessRights',
            //required: [true, 'Access is required'],
        }],

        loginStatus: {
            type: Boolean,
            default: false,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

//!static signup method
userSchema.statics.signup = async function (data) {
    const { username, email, password, role } = data;

    //todo validation all fields required

    if (!username || !email || !password || !role) {
        throw Error("all fields required ");
    }
    //todo username uniq
    const exists = await this.findOne({ username });

    if (exists) {
        throw Error("username allready exists ");
    }

    //todo email uniq

    const existsemail = await this.findOne({ email });

    if (existsemail) {
        throw Error("email allready exists ");
    }

    //todo everthing ok please create new user
    const salt = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash1, cpassword: hash1, role });
    return user;
};


//!static login method
userSchema.statics.login = async function (data) {
    const { email, password } = data;

    if (!email || !password) {
        throw Error("all fields required ");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("invalid user Id ");
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw Error("invalid password ");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
