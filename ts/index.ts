import * as _ from 'lodash';

async function hello() {
  return 'world'
}

type Style = 'bold' | 'italic' | 23;

let font: Style;

interface Person {
  first: string;
  last: string;
  [key: string]: any
}

const person: Person = {
  first: 'Jeff',
  last: 'Delaney'
}

const person2: Person = {
  first: 'Usain',
  last: 'Bolt',
  fast: true
}

function pow(x: number, y: number): void {
  Math.pow(x, y).toString();
}

pow(5, 10)

// Arrays

type MyList = [number?, string?, boolean?]


const arr: MyList = []

arr.push(1)
arr.push('23')
arr.push(false)

// Generics
class Observable<T> {
  constructor(public value: T) {

  }
}

let x: Observable<number>;

let y: Observable<Person>;

let z = new Observable(23)