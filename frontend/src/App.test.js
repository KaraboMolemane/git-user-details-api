import { render, screen } from "@testing-library/react";
import App from "./App";
import Landing from "./components/Landing";
import renderer from "react-test-renderer";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

  test('Snapshot test', () => {
    const component = renderer.create(<Landing />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


  /*
LINKS 
https://youtu.be/KT4dFLrlS7A?si=0gfEGOgAKfQxq_sK
  */