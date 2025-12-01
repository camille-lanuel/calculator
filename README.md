This is my solution to the [calculator app](https://www.theodinproject.com/lessons/foundations-calculator) from The Odin Project.

![](screenshot.png)

# Highligths

- Handles two operands at a time;

- Allows the user to trigger the computation when pressing a second operator, without having to press the `=`button;

- Rounds numbers to 5 digits to avoid floating point number errors such as $$0.1 + 0.2 \neq 0.3$;

- Handles non valind inputs: `.` is transformed to `0`, `x.` is transformed to `x` etc.
