import { render, screen } from "@testing-library/react";
import App from "./App";
import Landing from "./components/Landing";
import UserDetails from "./components/UserDetails";
import renderer from "react-test-renderer";

test('renders back to Homepage link', () => {
  render(<UserDetails />);
  const linkElement = screen.getByText(/Back to Homepage/i);
  expect(linkElement).toBeInTheDocument();
});

  test('Snapshot test', () => {
    const component = renderer.create(<Landing />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


  /*
LINKS 
https://youtu.be/KT4dFLrlS7A?si=0gfEGOgAKfQxq_sK
  */