import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useState } from "react";

describe("<BlogForm />", () => {
  test("renders the form with correct inputs", () => {
    render(<BlogForm />);
  });

  test("calls the addBlog function with the correct arguments", async () => {
    const addBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm addBlog={addBlog} />);

    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    await user.type(titleInput, "Test title");
    await user.type(authorInput, "Test author");
    await user.type(urlInput, "Test url");

    await user.click(screen.getByText("save"));

    expect(addBlog).toHaveBeenCalledWith({
      title: "Test title",
      author: "Test author",
      url: "Test url",
    });
  });
});
