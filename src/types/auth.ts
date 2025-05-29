export interface Auth {
    message: string;
    user:    User;
}

export interface User {
    id:       string;
    username: string;
    email:    string;
}


export interface CreateuserForm {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string
}


export interface LoginUserForm{
    usernameOrEmail: string;
    password: string;
}

export interface LoginUserResponse{
    message: string;
    user: {
            id: string;
            username: string;
            email: string;
        }
    }

