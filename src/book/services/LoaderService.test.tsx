import { act, render, screen, renderHook } from "@testing-library/react";
import { useLoader } from "./LoaderService";

describe("Loder service", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("not loading at start", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    // then
    expect(result.current.isLoading).toBe(false);
  });
  it("is loading if started", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => result.current.startLoading());
    // then
    expect(result.current.isLoading).toBe(true);
  });
  it("is not loading if stopped", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => result.current.startLoading());
    act(() => result.current.stopLoading());
    act(() => jest.runAllTimers() as any);
    // then
    expect(result.current.isLoading).toBe(false);
  });
  it("counts errors", () => {
    // given
    const { result } = renderHook(() => useLoader());
    // when
    act(() => result.current.registerError(new Error()));
    act(() => result.current.registerError(new Error()));
    act(() => result.current.registerError(new Error()));
    // then
    expect(result.current.failuresCounter).toBe(3);
  });
  it("remembers last error", () => {
    // given
    const { result } = renderHook(() => useLoader());
    const uglyError = new Error("I am ugly error!");
    // when
    act(() => result.current.registerError(uglyError));
    // then
    expect(result.current.errorMessage).toBe("I am ugly error!");
  });
  it("renders spinner", () => {
    // given
    const { result } = renderHook(() => useLoader());
    render(result.current.loaderComponent);

    // when
    const spinner = screen.getByTestId("spinner");
    // then
    expect(spinner).toBeInTheDocument();
  });
});
