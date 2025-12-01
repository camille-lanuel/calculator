This is my solution to the [calculator app](https://www.theodinproject.com/lessons/foundations-calculator) from The Odin Project.

![](screenshot.png)

# Highlights

- Handles two operands at a time;

- Allows the user to trigger the computation when pressing a second operator, without having to press the `=`button;

- When a result is displayed, pressing a new digit resets the state of the calculator instead of appending the digit to the existing result;

- Rounds numbers to 5 digits to avoid floating point number errors such as $$0.1 + 0.2 \neq 0.3$;

- Handles non valid inputs: `.` is transformed to `0`, `x.` is transformed to `x` etc.
