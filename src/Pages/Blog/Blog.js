import BlogCard from "./BlogCard";
const questions = [
  {
    question:
      "What are the different ways to manage a state in React application?",
    ans: "There are four ways to manage state in react. They are local state, global state, server state and URL state. We can manage local state using useState hook. We can think local state as state for a toggling button to get the dark or light theme. Global state is data we manage across multiple components. For example auth related info that we want to share with all components. Server state is that state which stores the data comes from an external server. Data that exists on our URL's including the pathname and query is called URL state.",
  },
  {
    question: "How does prototypal inheritance work?",
    ans: " JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain. For example, we have a user object with its properties and methods and want to make admin and guest as slightly modified variants of it. We would like to re-use what we have in user, not copy/re-implement its method, just build a new object on top of it. Prototypal inheritance is a language feautre that helps in that.",
  },
  {
    question: "What is unit test? Why should we write unit tests?",
    ans: "Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component.  Some of the core benefits of Unit Testing are: Quality of code, Smooth Debugging, Reduction in cost, Agile Testing Process, easier to Refactoring or Updating the system library",
  },
  {
    question: "React vs Angular vs Vue",
    ans: "👉🏼React is actually a JavaScript library created to build user interfaces. It is supported by Facebook and Instagram and has become a core technology for the endless feed in these two applications. React uses Virtual Dom, one-way data binding, component based model and also use pure function. React is used where highly interaction needed. 👉🏼Angular is a framework was first released by Google. Angular uses two way data binding, MVC architecture to well structured code, and angular templates. 👉🏼Vue.js is a popular Angular and React alternative.  Vue allows easy implementations of MVC framework. Vue is also lightweight solution because it doesn't include many features out of the box. Vue uses declarative templates, virtual dom, two way data binding. It is supported by laravel out of the box.",
  },
];
export default function Blog() {
  return (
    <div className="space-y-8">
      {questions.map((el, i) => (
        <BlogCard key={i} blogCard={el} />
      ))}
    </div>
  );
}
