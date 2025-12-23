let primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
  127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
  233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
  283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
  353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
  419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
  467, 479, 487, 491, 499, 503, 509, 521, 523, 541,
  547, 557, 563, 569, 571, 577, 587, 593, 599, 601,
  607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
  661, 673, 677, 683, 691, 701, 709, 719, 727, 733,
  739, 743, 751, 757, 761, 769, 773, 787, 797, 809,
  811, 821, 823, 827, 829, 839, 853, 857, 859, 863,
  877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
  947, 953, 967, 971, 977, 983, 991, 997
];

let factors = [[], [1]];
let inputBox, button;

function setup() {
  createCanvas(600, 800);
  textAlign(RIGHT);

  inputBox = createInput("2^2 * 5^2 * 7");
  inputBox.position(10, 10);
  inputBox.size(200);

  button = createButton("Factorize");
  button.position(220, 10);
  button.mousePressed(parseExpression);
}

// Evaluate math expression safely
function parseExpression() {
  let expr = inputBox.value();

  // Remove spaces
  expr = expr.replace(/\s+/g, "");

  // Replace "^" with "**"
  expr = expr.replace(/\^/g, "**");

  // Safety: only allow digits, arithmetic ops, parentheses, **
  if (!/^[0-9+\-*/()**]+$/.test(expr)) {
    console.error("Invalid characters in expression");
    return;
  }

  let num;
  try {
    num = Function("return " + expr)();
  } catch (e) {
    console.error("Expression error:", e);
    return;
  }

  if (!Number.isInteger(num) || num < 2) {
    console.error("Not a valid number to factor");
    return;
  }

  console.log("Evaluated Number:", num);
  factors = primeFactors(num);
}

function primeFactors(n) {
  let primeFactors = [];
  let factorSteps = [n];

  let testNum = n;
  for (let p of primes) {
    while (testNum % p === 0) {
      primeFactors.push(p);
      testNum = testNum / p;
      factorSteps.push(testNum);
    }
    if (testNum === 1) break;
  }

  return [primeFactors, factorSteps];
}

function draw() {
  background(255);

  if (factors[1].length <= 1) return;

  let dx = 50 + (mouseX)/10;
  let dy = 80 + (mouseY)/10;

  textSize(max(14, dist(mouseX, mouseY, 0, 0)/10));

  for (let i = 0; i < factors[1].length - 1; i++) {
    text(factors[1][i], dx*3 + i*dx, dy + i*dy);

    if (i < factors[1].length - 2) {
      text(factors[0][i], dx*3 + i*dx - dx, dy*2 + i*dy);

      line(dx*3 + i*dx - dx/5, dy + i*dy + dy/5,
           dx*3 + i*dx - dx + dx/5, dy*2 + i*dy - dy/5);

      line(dx*3 + i*dx - dx/5, dy + i*dy + dy/5,
           dx*3 + i*dx + dx - dx/2, dy*2 + i*dy - dy/5);
    }
  }
}
