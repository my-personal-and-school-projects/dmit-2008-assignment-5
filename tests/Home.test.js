import "@testing-library/jest-dom";
import { render, screen, act, waitFor } from "@testing-library/react";
import Home from "../pages/index.js";
import { getRandomDog } from "../utils/api/dog.js";

const TEST_URL = "https://example.com/test-dog.jpg";
const NEW_TEST_URL = "https://example.com/new-test-dog.jpg";

/* mock the location of the getRandomDog otherwise it will give an error: 
{getRandomDog} "cannot reassign to an imported binding" */
jest.mock("../utils/api/dog.js");

//TODO: does it need to be async?
/* beforeAll(async () => {
  await new Promise((resolve) => {
    getRandomDog
      .mockResolvedValue({ status: "success", message: TEST_URL })
      .mockName("mockGetRandomDog");
    resolve();
  });
}); */

beforeAll(() => {
  getRandomDog
    .mockResolvedValue({ status: "success", message: TEST_URL })
    .mockResolvedValue({ status: "success", message: NEW_TEST_URL })
    .mockName("mockGetRandomDog");
});

beforeEach(() => {
  jest.clearAllMocks();
});

//Write a test that checks to see if the title is rendered correctly
describe("Home Component", () => {
  test("home page title renders correctly", async () => {
    await act(async () => {
      render(<Home />);
    });

    //Check to see if the title "Welcome to Dinder" is rendered correctly
    let titleElement = screen.getByText("Welcome to Dinder");
    expect(titleElement).toBeInTheDocument();
  });
});

//Write a test that checks to see if the buttons are rendered correctly
describe("Home Component", () => {
  test("home component buttons render correctly", async () => {
    await act(async () => {
      render(<Home />);
    });

    //Cehck if the buttons render correctly
    let nopeButton = screen.getByText("Nope");
    expect(nopeButton).toBeInTheDocument();

    let likeButton = screen.getByText("Like");
    expect(likeButton).toBeInTheDocument();
  });
});

//Write a test that checks to see if the image is loaded successfully
describe("Home Component", () => {
  test("dog image loads correctly", async () => {
    await act(async () => {
      render(<Home />);
    });

    //check if the image loads correctly
    //(I don't like dogs, so I hope it will not)
    let dogImg = screen.getByTestId("dog-image");
    expect(dogImg).toBeInTheDocument();
  });
});

//Write a test that will check if a new image is loaded after clicking “Like”
describe("Home Component", () => {
  test("dog image loads correctly after clicking Like button", async () => {
    await act(async () => {
      render(<Home />);
    });

    //Get the Like button
    let likeButton = screen.getByText("Like");

    //clcick the button and wait for the img to load
    await act(() => {
      likeButton.click();
    });

    //check if the new image loads
    await waitFor(() => {
      let nextDogImg = screen.getByTestId("dog-image");
      expect(nextDogImg).toBeInTheDocument();
      expect(nextDogImg.src).toBe(NEW_TEST_URL);
    });
  });
});

//Write a second test that will check if a new image is loaded after clicking Nope

describe("Home Component", () => {
  test("dog image loads correctly after clicking nope button", async () => {
    await act(async () => {
      render(<Home />);
    });

    //Get the Like button
    let nopeButton = screen.getByText("Nope");

    //clcick the button and wait for the img to load
    await act(() => {
      nopeButton.click();
    });

    //check if the new image loads TODO: does it need to be async?
    await waitFor(() => {
      let nextDogImg = screen.getByTestId("dog-image");
      expect(nextDogImg).toBeInTheDocument();
      expect(nextDogImg.src).toBe(NEW_TEST_URL);
    });
  });
});
