import React from 'react';

const Blog = () => {
  return (
    <div className='container mx-auto mb-12'>
      <h2 className="text-2xl font-semibold text-center mt-5 underline cursor-pointer">Blog Page</h2>
      <div className='max-w-5xl m-5 lg:mx-auto'>
        <div className='mb-5'>
          <h2 className='font-bold'>What are the different ways to manage a state in a React application?</h2>
          <div>
            <p>Answer: The Four Kinds of React State to Manage
              1.Local state 2.Global state 3.Server state 4.URL state.</p>
            <p>
              Local (UI) state – Local state is data we manage in one or another component.
            </p>
            <p>Global (UI) state – Global state is data we manage across multiple components.</p>
            <p>Server state – Data that comes from an external server that must be integrated with our UI state.</p>
            <p>URL state – Data that exists on our URLs, including the pathname and query parameters.</p>
          </div>
        </div>
        <div className='mb-5'>
          <h2 className='font-bold mb-2'>How does prototypical inheritance work?</h2>
          <div>
            <p className='mb-3'>When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.</p>
            <p>The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype. Note: The property of an object that points to its prototype is not called prototype</p>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">What is a unit test? Why should we write unit tests?</h2>
          <div>
            <p className='mb-3'>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
            <p className='mb-3'>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property.</p>
            <p>For Test-Driven Development (TDD), you write unit tests before writing any implementation. This makes your implementation details in your code shorter and easier to understand. In this instance, the best time to write unit tests is immediately. For others, most developers write unit tests after the code's been written.</p>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">React vs. Angular vs. Vue?</h2>
          <p className='mb-3'>Angular has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works.</p>
          <p className='mb-3'>React offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. However, learning to use React does not necessarily mean that you are using the best practices.</p>
          <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option. However, simplicity and flexibility of Vue is a double-edged sword — it allows poor code, making it difficult to debug and test.</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;