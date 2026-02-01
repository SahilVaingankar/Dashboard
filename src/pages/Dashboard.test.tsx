import { describe, test, expect } from "vitest";
import { screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../tests/utils/renderWithProviders";
import Dashboard from "./Dashboard";

import { vi } from "vitest";

// ⚡ Mock Recharts before importing your component
vi.mock("recharts", async () => {
  const actual = await vi.importActual<any>("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: 400, height: 300 }}>{children}</div>
    ),
  };
});

describe("ProductTable – add product flow", () => {
  test("adds a product and updates the table", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Dashboard />);

    // 1️⃣ Click "Add Product"
    const addButton = screen.getByRole("button", {
      name: /Add Product/i,
    });

    await user.click(addButton);

    // 2️⃣ Modal opens
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // 3️⃣ Fill form inputs (labels matter!)
    await user.type(
      within(dialog).getByLabelText(/Product Details/i),
      "Laptop",
    );

    await user.type(within(dialog).getByLabelText(/price/i), "1200");

    await user.type(within(dialog).getByLabelText(/stock/i), "7");

    await user.type(within(dialog).getByLabelText(/category/i), "Electronics");

    // 4️⃣ Submit form
    const submitButton = within(dialog).getByRole("button", {
      name: /Add Product/i,
    });

    await user.click(submitButton);

    // 5️⃣ Modal closes
    // expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 6️⃣ Table updates
    const table = screen.getByRole("table");

    const laptopCell = await within(table).findByText(/Laptop/i);
    const productRow = laptopCell.closest("tr")!;
    expect(productRow).toBeInTheDocument();

    // 5️⃣ Verify row content
    const row = within(productRow);
    expect(row.getByText("$1200")).toBeInTheDocument();
    expect(row.getByText("7")).toBeInTheDocument();
    expect(row.getByText(/electronics/i)).toBeInTheDocument();
  });

  test("product table edit flow", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Dashboard />);

    const editButtons = screen.getAllByRole("button", {
      name: /edit product/i,
    });

    await user.click(editButtons[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const titleInput = within(dialog).getByLabelText(
      /product details/i,
    ) as HTMLInputElement;

    const priceInput = within(dialog).getByLabelText(
      /price/i,
    ) as HTMLInputElement;

    const stockInput = within(dialog).getByLabelText(
      /stock/i,
    ) as HTMLInputElement;

    const categorySelect = within(dialog).getByLabelText(
      /category/i,
    ) as HTMLSelectElement;

    // ✅ prefilled check
    expect(titleInput.value).not.toBe("");
    expect(priceInput.value).not.toBe("");
    expect(stockInput.value).not.toBe("");
    expect(categorySelect.value).not.toBe("");

    // ✅ update fields
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Laptop");

    await user.clear(priceInput);
    await user.type(priceInput, "75000");

    await user.clear(stockInput);
    await user.type(stockInput, "15");

    await user.type(categorySelect, "Electronics");

    const updateButton = within(dialog).getByRole("button", {
      name: /edit product/i,
    });

    await user.click(updateButton);

    // ✅ wait for modal to close
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    // ✅ assert table update
    const table = screen.getByRole("table");

    // const updatedTitleCell = await within(table).findByText(/updated laptop/i);
    // const productRow = updatedTitleCell.closest("tr")!;

    const updatedTitleCell = await within(table).findByText(/updated laptop/i);
    const productRow = updatedTitleCell.closest("tr")!;

    expect(
      await within(productRow).findByText(/updated laptop/i),
    ).toBeInTheDocument();

    expect(await within(productRow).findByText(/75000/i)).toBeInTheDocument();
    expect(await within(productRow).findByText(/15/i)).toBeInTheDocument();
    expect(within(productRow).getByText(/Electronics/i)).toBeInTheDocument();
  });

  test("product table edit flow", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Dashboard />);

    const table = screen.getByRole("table");

    const nameCell = await within(table).findByText(/apple iphone 14/i);
    const productRow = nameCell.closest("tr")!;

    const deleteButtons = within(productRow).getByRole("button", {
      name: /Delete product/i,
    });

    await user.click(deleteButtons);

    await waitFor(() => {
      expect(
        within(table).queryByText(/apple iphone 14/i),
      ).not.toBeInTheDocument();
    });
  });
});
