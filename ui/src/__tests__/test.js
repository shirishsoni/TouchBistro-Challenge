import { React } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Input from '../Components/Input';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

describe("Prime numbers test", function () {
    test("Renders Properly", function () {
        render(<Input />);
    });

    test("Value less than 3 shows error", async function () {
        render(<Input />);
        const input = await screen.findByPlaceholderText("Enter value");
        userEvent.type(input, "2");
        const error = await screen.queryByText("Value must be greater than 2");
        expect(error).toBeInTheDocument();
        expect(error.hidden).toBeFalsy();
    })

    test("Valid value does not show error", async function () {
        render(<Input />);
        const input = await screen.findByPlaceholderText("Enter value");
        userEvent.type(input, "1000");
        const error = await screen.queryByText("Please enter digits");
        expect(error).toBeInTheDocument();
        expect(error.hidden).toBeTruthy();
    });

    test("Invalid value shows error", async function () {
        render(<Input />);
        const input = await screen.findByPlaceholderText("Enter value");
        userEvent.type(input, "ABC");
        const error = await screen.queryByText("Please enter digits");
        expect(error).toBeInTheDocument();
        expect(error.hidden).toBeFalsy();
    })
});