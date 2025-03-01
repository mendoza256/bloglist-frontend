import { render, screen } from "@testing-library/react";
import Blog from "./Blog_old";
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

test("after clicking the button, children are displayed", async () => {
  const blog = {
    author: "Test author",
    title: "Test title",
    url: "Test url",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).not.toHaveTextContent("Test url");
  expect(div).not.toHaveTextContent("likes: 0");

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  expect(div).toHaveTextContent("Test url");
  expect(div).toHaveTextContent("likes: 0");
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    author: "Test author",
    title: "Test title",
    url: "Test url",
    likes: 0,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} />);

  const user = userEvent.setup();

  const showButton = screen.getByText("show");
  await user.click(showButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
