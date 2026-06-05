import { test, expect } from "@playwright/test";
import laptopsData from "../data/laptops.json";

/* Test API calls triggered by UI interactions on the Demoblaze website. 
    This test navigates to the site, clicks on the "Laptops" category, and waits for the associated API call to complete.
    Note: The API endpoints and request/response structures are based on the Demoblaze website as of the time of writing.

    The goal is to capture 
    1) the payload required for the API endpoint usng the waitForRequest method 
        because the Playwright Trace report's Network tab does not always render the correct payload.
    2) the response from the API endpoint using the waitForResponse method
    3) the associated UI interactions that trigger these API calls, such as clicking on categories and products.
*/
test("Generate valid payload, endpoint and response - one time activity", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");

  const [apiRequest, apiResponse] = await Promise.all([
    page.waitForRequest(
      (r) => r.url().includes("/bycat") && r.method() === "POST",
    ),
    page.waitForResponse(
      (r) => r.url().includes("/bycat") && r.request().method() === "POST",
    ),
    page.click("text=Laptops"),
  ]);

  console.log("payload:", apiRequest.postData());
  console.log("status:", apiResponse.status());
  console.log("response:", await apiResponse.json());

  expect(apiResponse.status()).toBe(200);
});

// Define interface based on API response structure
interface Product {
  cat: string;
  desc: string;
  id: number;
  img: string;
  price: number;
  title: string;
}

interface ProductResponse {
  Items: Product[];
}

test("Validate API response", async ({ request }) => {
  const response = await request.post("https://api.demoblaze.com/bycat", {
    data: {
      cat: "notebook",
    },
  });

  expect(response.status()).toBe(200);
  const responseBody = (await response.json()) as ProductResponse;

  // Validate response structure
  expect(responseBody).toHaveProperty("Items");
  expect(Array.isArray(responseBody.Items)).toBe(true);
  expect(responseBody.Items.length).toBeGreaterThan(0);

  // Validate MacBook Pro price from API response matches expected value from JSON test data
  const macbook = responseBody.Items.find((item) =>
    item.title.toLowerCase().includes("macbook pro"),
  );
  expect(macbook).toBeDefined();
  expect(macbook?.price).toBe(
    laptopsData.find((laptop) => laptop.title.match("MacBook Pro"))?.price,
  );
});
