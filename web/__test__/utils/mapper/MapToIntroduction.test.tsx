import { describe, expect, it } from "vitest";
import { Introduction } from "../../../src/types/types";
import { Mapper } from "../../../src/utils/Mapper";
import { NoDataError } from "../../../src/classes/NoDataError";

describe("mapToIntroduction", () => {
  it("should map valid data correctly", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: {
              Description: "Introduction description",
              Events: "Upcoming events",
              Members: "Current members",
              Followers: "Followers count",
            },
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "Introduction description",
        events: "Upcoming events",
        members: "Current members",
        followers: "Followers count",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle missing fields gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: null,
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "",
        events: "",
        members: "",
        followers: "",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle null description field gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: {
              Description: null,
              Events: "Upcoming events",
              Members: "Current members",
              Followers: "Followers count",
            },
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "",
        events: "Upcoming events",
        members: "Current members",
        followers: "Followers count",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle null events field gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: {
              Description: "Introduction description",
              Events: null,
              Members: "Current members",
              Followers: "Followers count",
            },
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "Introduction description",
        events: "",
        members: "Current members",
        followers: "Followers count",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle null members field gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: {
              Description: "Introduction description",
              Events: "Upcoming events",
              Members: null,
              Followers: "Followers count",
            },
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "Introduction description",
        events: "Upcoming events",
        members: "",
        followers: "Followers count",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle null followers field gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: {
              Description: "Introduction description",
              Events: "Upcoming events",
              Members: "Current members",
              Followers: null,
            },
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "Introduction description",
        events: "Upcoming events",
        members: "Current members",
        followers: "",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });

  it("should handle completely missing attributes gracefully", () => {
    const data = {
      introductions: {
        data: [
          {
            attributes: null,
          },
        ],
      },
    };

    const expected: Introduction[] = [
      {
        description: "",
        events: "",
        members: "",
        followers: "",
      },
    ];

    expect(Mapper.mapToIntroduction(data)).toEqual(expected);
  });
  it("should throw NoDataError when introductions.data is empty", () => {
    const data = {
      introductions: {
        data: [],
      },
    };

    expect(() => Mapper.mapToIntroduction(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToIntroduction(data)).toThrow("No data");
  });

  it("should throw NoDataError when introductions is missing", () => {
    const data = {};

    expect(() => Mapper.mapToIntroduction(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToIntroduction(data)).toThrow("No data");
  });

  it("should throw NoDataError when introductions.data is missing", () => {
    const data = {
      execs: {},
    };

    expect(() => Mapper.mapToIntroduction(data)).toThrow(NoDataError);
    expect(() => Mapper.mapToIntroduction(data)).toThrow("No data");
  });
});
