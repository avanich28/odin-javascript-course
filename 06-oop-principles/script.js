"use strict";

// - medium -

// Topic: S.O.L.I.D The first 5 principles of Object Oriented Design with JavaScript

// 1.) Single responsibility
// NOTE A class should have only 1 job.

// 2) Open-closed Principle
// NOTE Objects or entities should be open for extension, but closed for modification.

// function composition 2)
// Is the areaCalculator actually a shape or if the shape has a method named area ?
const shapeInterface = (state) => ({
  type: "shapeInterface",
  area: () => state.area(state),
});

// 4) Interface segregation principle
// NOTE A client should never be forced to implement an interface that it doesn’t use or clients shouldn’t be forced to depend on methods they do not use.
const solidShapeInterface = (state) => ({
  // Ex. calculate cube
  type: "solidShapeInterface",
  volume: () => state.volume(state),
});

const manageShapeInterface = (fn) => ({
  type: "manageShapeInterface",
  calculate: () => fn(),
});

// Create factory function
// Shapes
const circle = (radius) => {
  const proto = {
    radius,
    type: "Circle",
    // code
    area(args) {
      return Math.PI * Math.pow(args.radius, 2);
    },
  };

  const basics = shapeInterface(proto);
  const abstraction = manageShapeInterface(() => basics.area());
  const composite = Object.assign({}, basics, abstraction);

  return Object.assign(Object.create(composite), { radius });
};
console.log(circle(8));

const square = (length) => {
  const proto = {
    length,
    type: "Square",
    // code 2)
    area: (args) => Math.pow(args.length, 2),
  };

  const basics = shapeInterface(proto);
  const abstraction = manageShapeInterface(() => basics.area());
  const composite = Object.assign({}, basics, abstraction);

  return Object.assign(Object.create(composite), { length });
};

const s = square(5);
console.log("OBJ\n", s); // {length: 5}
console.log("PROTO\n", Object.getPrototypeOf(s)); // {type: 'shapeInterface', area: ƒ}
s.area();

// 4)
const cube = (length) => {
  const proto = {
    length,
    type: "Cubo",
    area: (args) => Math.pow(args.length, 2),
    volume: (args) => Math.pow(args.length, 3),
  };

  const basics = shapeInterface(proto);
  const complex = solidShapeInterface(proto);
  const abstraction = manageShapeInterface(
    () => basics.area() + complex.volume()
  );
  const composite = Object.assign({}, basics, abstraction);

  return Object.assign(Object.create(composite), { length });
};

// areaCalculator
const areaCalculator = (s) => {
  const proto = {
    sum() {
      // logic to sum 2)
      const area = [];
      for (let shape of this.shapes) {
        // check shapeInterface
        if (Object.getPrototypeOf(shape).type === "manageShapeInterface") {
          area.push(shape.area());
        } else {
          throw new Error("This is not a shapeInterface object");
        }
      }
      return area.reduce((v, c) => (c += v), 0);
    },
    output() {
      return `<h1>Sum of the areas of provided shapes: ${this.sum()}</h1>`;
    },
  };

  return Object.assign(Object.create(proto), { shapes: s });
};

const shapes = [circle(2), square(5), square(6)];
const areas = areaCalculator(shapes);
console.log(areas.output());

// The user wanted to output the data as json or others.
// const output = sumCalculatorOutputer(areas);
// console.log(output.JSON());

// 3) Liskov substitutional principle
// NOTE All this is stating is that every subclass/derived class should be substitutable for their base/parent class.
const volumeCalculator = (s) => {
  const proto = {
    type: "volumeCalculator",
  };

  const areaCalProto = Object.getPrototypeOf(areaCalculator());
  const inherit = Object.assign({}, areaCalProto, proto);

  return Object.assign(Object.create(inherit), { shapes: s });
};

// 5) Dependency inversion principle
// NOTE High-level modules should not depend on Low-level modules, but they should depend on abstractions.
// - web dev -
class Store {
  constructor(paymentProcessor) {
    console.log(paymentProcessor);
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelmet(quantity) {
    this.paymentProcessor.pay(15 * quantity);
  }
}

class StripePaymentProcessor {
  constructor(user) {
    this.user = user;
    this.stripe = new Stripe(user);
  }

  pay(amountInDollars) {
    this.stripe.makePayment(amountInDollars * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

class PaypalPaymentProcessor {
  constructor(user) {
    this.user = user;
    this.paypal = new Paypal();
  }

  pay(amountInDollars) {
    this.paypal.makePayment(this.user, amountInDollars * 100);
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store(new StripePaymentProcessor("John"));
store.purchaseBike(2);
store.purchaseHelmet(2);

///////////////////////////

// - Alex Castrounis -

// Topic: How to Write Highly Scalable and Maintainable JavaScript: Coupling

// 1) Coupling
// NOTE One module directly references another module.
// CRUDE - create, read, update, and delete
// Ex. We should prefer that the order is still placed and the application continues to operate, even if we are temporarily unable to provide a delivery time estimate to the customer.

// 2) Patterns to Reduce Coupling
// pub/sub pattern

//////////////////////////

// Composition Over Inheritance
const getTitle = (data) => ({
  title: () => console.log(`title : ${data.title}`),
});

const getAuthor = (data) => ({
  // Closure
  author: () => console.log(`author: ${data.author}`),
});

const getSummary = () => ({
  summary: () => console.log(`book summary need to update.`),
});

const Book = (title, author) => {
  const data = {
    title,
    author,
  };

  return Object.assign({}, getTitle(data), getAuthor(data), getSummary());
};

let book1 = Book("The Alchemist", "Paulo Coelho");
book1.title(); // title : The Alchemist
