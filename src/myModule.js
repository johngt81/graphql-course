const message = 'Some message from module';
const name = 'Bryan';
const location = 'Lima';
const getGreeting = (name) => {
    return `Welcome to the course ${name}`;
}
export { message, name, getGreeting, location as default }