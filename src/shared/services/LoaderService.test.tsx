import { renderHook, act } from "@testing-library/react";
import { useLoader } from "./LoaderService";
import { vi } from "vitest";

describe("LoaderService", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("is not loading initially", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when-then
    expect(result.current.isLoading).toBeFalsy();
  });

  it("is loading when started", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => {
      result.current.startLoading();
    });
    // then
    expect(result.current.isLoading).toBeTruthy();
  });

  it("is not loading when stopped", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => {
      result.current.startLoading();
      result.current.stopLoading();
      vi.runAllTimers();
    });
    // then
    expect(result.current.isLoading).toBeFalsy();
  });

  it("allows to register error", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => {
      result.current.registerError(new Error());
      result.current.registerError(new Error());
      result.current.registerError(new Error());
    });
    // then
    expect(result.current.errorCounter).toBe(3);
  });

  it("exposes last error", () => {
    // given
    const { result } = renderHook(() => useLoader());
    const thatError = new Error();
    // when
    act(() => {
      result.current.registerError(thatError);
    });
    // then
    expect(result.current.lastError).toBe(thatError);
  });
});
