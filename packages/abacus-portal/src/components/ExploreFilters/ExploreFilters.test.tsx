import { render, fireEvent } from "@test-utils/index"
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import ExploreFilters from "."
import { statuses } from "./constants"

const mockGetMultiSessionData = jest.fn()

jest.mock("@state/sessionData/hooks", () => ({
  useGetMultiSessionData: () => mockGetMultiSessionData,
}))

describe("ExploreFilters", () => {
  it("Matches snapshot", () => {
    const component = render(<ExploreFilters />)
    expect(component.container).toMatchSnapshot()
  })

  it("Gets new multiSessionData with where clause when status checkbox clicked", () => {
    const { getByText } = render(<ExploreFilters />)

    fireEvent.click(getByText(statuses[0].label))
    expect(mockGetMultiSessionData).toHaveBeenCalledTimes(1)
    expect(mockGetMultiSessionData).toHaveBeenCalledWith(
      "{ sessionStatus_in: [0], }"
    )
  })
})
