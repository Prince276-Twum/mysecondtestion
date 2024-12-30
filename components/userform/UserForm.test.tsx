import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";
import "@testing-library/jest-dom";
import { userType } from "@/app/page";
test("it shows two input and a button", () => {
  render(<UserForm onUserAdd={() => {}} />);
  const input = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(input).toHaveLength(2);
});

test("It calls onUserAdd when the form is submitted", async () => {
  const argList: userType[] = [];
  const callBacnk = (args: userType) => {
    console.log(args);
    argList.push(args);
  };

  render(<UserForm onUserAdd={callBacnk} />);

  const [nameInput, emailInput] = screen.getAllByRole("tetbox");

  await user.click(nameInput);
  await user.keyboard("Prince");

  await user.click(emailInput);
  await user.keyboard("prince@gmail.com");

  const button = screen.getByRole("button");
  await user.click(button);

  expect(argList).toHaveLength(1);
  expect(argList[0]).toEqual({ name: "Prince", email: "prince@gmail.com" });
});
