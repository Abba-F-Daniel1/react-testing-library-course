import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import "@testing-library/jest-dom";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');
  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', async () => {
  const mock = jest.fn();

  // try to render my component
  render(<UserForm onUserAdd={mock} />);

  // find the two inputs
  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  })

  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  })

  // simulate typing in an name
  await user.click(nameInput);
  await user.keyboard('abba')

  // simulate typing in an email
  await user.click(emailInput);
  await user.keyboard('abba@gmail.com');

  // find button
  const button = screen.getByRole('button')
  // simulate clicking button
  user.click(button)

  // Assertion to make sure 'onUserAd' gets called with email/name
  await waitFor(
    () => {
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith({ name: 'abba', email: 'abba@gmail.com' });
    }
  );
})

test('empties the two inputs when form is submitted', ()=> {
  render(<UserForm onUserAdd={()=>{}}/>);

  const nameInput = screen.getByRole('textbox', {name: /name/i});
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  const button = screen.getByRole('button');
  user.click(nameInput);
  user.keyboard('abba');
  user.click(emailInput);
  user.keyboard('abba@gmail.com');
  user.click(button)


  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
})
