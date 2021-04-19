import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Input from '../Components/Input';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('Prime number UI tests', function(){
    test("Renders without error", function(){
        render(<Input></Input>);
    })

    test("Valid numeric input does not give error", function(){
        render(<Input></Input>)
        const input = screen.findByPlaceholderText("Enter value");
        fireEvent.change(input, { target: { value: '23' } })
        const error = screen.queryByText("Enter a valid value.");
        expect(error).toBeNull();
    })

    test("Invalid input does give error", async function(){
        render(<Input></Input>)
        const input = screen.findByPlaceholderText("Enter value");
        fireEvent.change(input, { target: { value: 'abc' } })
        await waitFor(() => screen.getByText("Enter a valid value."));
        const error = screen.getByText("Enter a valid value.");
        expect(error).toBeInTheDocument();
    })
});