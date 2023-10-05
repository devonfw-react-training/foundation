import { renderHook, act } from "@testing-library/react";
import { useLoader } from "./useLoader";
import { vi } from "vitest";

describe("useLoader", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("calls callback function and sets loading flag", async () => {
    // given
    const testFn = vi.fn().mockResolvedValue(null);
    const { result } = renderHook(() => useLoader(testFn));
    // when-then
    expect(result.current.isLoading).toBeTruthy();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(testFn).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).not.toBeDefined();
  });

  it("saves error object if callback function throws error", async () => {
    // given
    const errorObj = new Error("test error");
    const testFn = vi.fn().mockRejectedValue(errorObj);
    const { result } = renderHook(() => useLoader(testFn));
    // when-then
    expect(result.current.isLoading).toBeTruthy();
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(testFn).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBe(errorObj);
  });
});
