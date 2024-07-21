import { it, expect, describe, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import useGetUserGroups, {
  UserGroupDataT,
} from "../../src/hooks/useGetUserGroups";
import axios, { AxiosResponse } from "axios";

const mockReturn: UserGroupDataT[] = [
  {
    _id: "324234",
    groupId: "afdasf",
    groupName: "group name",
    role: ["read"],
    userId: "12dfaewf",
    username: "bob username",
  },
];

//@ts-expect-error mocking only data part of axios response
const mockAxiosResponse: AxiosResponse<UserGroupDataT[], unknown> = {
  data: mockReturn,
};

describe("useGetUserGroups", () => {
  const axiosMockGet = vi.spyOn(axios, "get");

  it("should return array and rerun on fetchData method", async () => {
    //@ts-expect-error only need to return promise for axios test
    axiosMockGet.mockImplementation(() => {
      return Promise.resolve(mockAxiosResponse);
    });
    const { result } = renderHook(() => useGetUserGroups());

    await act(async () => {
      await result.current.fetchData();
      await result.current.fetchData();
    });

    await waitFor(() => {
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(result.current.data.length).toBe(mockReturn.length);
      expect(axiosMockGet).toBeCalledTimes(3);
    });

    await vi.waitFor(
      () => {
        console.log("result.current", result.current);
      },
      { timeout: 1000 }
    );
  });

  it("should return empty array on error and set error state", async () => {
    axiosMockGet.mockImplementation(() => {
      throw new Error("test error");
    });
    const { result } = renderHook(() => useGetUserGroups());

    await act(async () => {
      await result.current.fetchData();
    });

    await waitFor(() => {
      expect(Array.isArray(result.current.data)).toBe(true);
      expect(result.current.data.length).toBe(0);
      expect(result.current.error.length).toBeGreaterThan(0);
    });

    await vi.waitFor(
      () => {
        console.log("result.current", result.current);
      },
      { timeout: 1000 }
    );
  });
});
