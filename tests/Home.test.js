import "@testing-library/jest-dom";
import { render, screen, act, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import Home from "../pages/index.js";
import { getRandomDog } from "../utils/api/dog.js";
import { BASE_URL } from "../utils/api/base.js";

const TEST_URL = "https://example.com/test-dog.jpg";
const NEW_TEST_URL = "https://example.com/new-test-dog.jpg";

const RANDOM_DOG_URL = `${BASE_URL}/api/breeds/image/random`;
const NEW_RANDOM_DOG_URL = `${BASE_URL}/api/breeds/image/random`;

const handlers = [
  http.get(RANDOM_DOG_URL, () => {
    return HttpResponse.json({
      status: "success",
      message: TEST_URL,
      status: "success",
      message: NEW_TEST_URL,
    });
  }),
];

//setup the server so that it begins to listen beforeAll of the tests and closes afterAll of the tests are done.
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  server.resetHandlers();
});

afterAll(() => {
  server.close();
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
