import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    author: "Test author",
    title: "Test title",
    url: "Test url",
    likes: 0,
  };

  const mockHandler = vi.fn();

  const { container } = render(<Blog blog={blog} mockHandler={mockHandler} />);

  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("Test title by Test author");
  expect(div).not.toHaveTextContent("Test url");
  expect(div).not.toHaveTextContent("likes: 0");
});
